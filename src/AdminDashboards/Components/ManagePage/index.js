import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'
import ManageTestimonials from './ManageTestimonials'
import ManagePost from './ManagePost'
import ManageOffer from './ManageOffer'
import ManageAdvertisement from './ManageAdvertisement'
import { useUserRoleContext } from '../../../Context/RolesContext'

const AdminManageWebsite = () => {
    const [attendanceActive, setActiveAttendance] = useState("testimonial");

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();
    // to set the active page 
    const ActiveTabFunction = () => {
        if (userRole.ManageTestimonial) {
            setActiveAttendance('testimonial')
        } else if (userRole.ManagePost) {
            setActiveAttendance("post")
        } else if (userRole.ManageOffer) {
            setActiveAttendance('offer')
        } else if (userRole.ManageAdvertisement) {
            setActiveAttendance('advertisement')
        }
    }

    useEffect(() => {
        ActiveTabFunction()
    }, [userRole]);

   
    return (
        <Fragment>
            <AdminHeader />
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <AdminNavItems />
                    <div className="AttendenceTabs px-3">
                        {userRole && userRole.ManageTestimonial ? <span className={` ${attendanceActive === "testimonial" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("testimonial") }}>Manage Testimonial</span> : null}
                        {userRole && userRole.ManagePost ? <span className={` ${attendanceActive === "post" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("post") }}>Manage Post</span> : null}
                        {userRole && userRole.ManageOffer ? <span className={` ${attendanceActive === "offer" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("offer") }}>Manage Offer</span> : null}
                        {userRole && userRole.ManageAdvertisement ? <span className={` ${attendanceActive === "advertisement" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("advertisement") }}>Manage Advertisement</span> : null}
                    </div>
                    {/* <TabContent activeTab={attendanceActive} >
                        {userRole && userRole.ManageTestimonial ?
                            <TabPane tabId="testimonial">
                                <ManageTestimonials />
                            </TabPane>
                            : userRole.ManagePost ?
                                <TabPane tabId="post">
                                    <ManagePost />
                                 </TabPane>
                           : userRole.ManageOffer ?
                                    <TabPane tabId="offer">
                                        <ManageOffer />
                                    </TabPane>
                                    : userRole.ManageAdvertisement ?
                                        <TabPane tabId="advertisement">
                                            <ManageAdvertisement />
                                        </TabPane>
                                        : null} 
                    </TabContent> */}

       <TabContent activeTab={attendanceActive} >
            <TabPane tabId="testimonial">
              <ManageTestimonials setActiveAttendance={setActiveAttendance} />
            </TabPane>

             <TabPane tabId="post">
              <ManagePost setActiveAttendance={setActiveAttendance} />
            </TabPane>

            <TabPane tabId="offer">
              <ManageOffer setActiveAttendance={setActiveAttendance} />
            </TabPane>
           <TabPane tabId="advertisement">
              <ManageAdvertisement setActiveAttendance={setActiveAttendance} />
            </TabPane> 

          </TabContent>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminManageWebsite