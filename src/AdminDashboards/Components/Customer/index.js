import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'
import ManageCustomer from './ManageCustomer'
import CustomerHistory from './CustomerHistory'
import MonthlyMembers from './MonthlyMembers'
import ManageEnquiry from './ManageEnquiry'
import { useUserRoleContext } from '../../../Context/RolesContext'

const AdminCustomerManage = () => {
    const [attendanceActive, setActiveAttendance] = useState("customer")

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();
    // to set the active page 
    const ActiveTabFunction = () => {
        if (userRole.ManageCustomer) {
            setActiveAttendance('customer')
        }
        else if (userRole.ManageHistory) {
            setActiveAttendance("history")
        } 
        // else if (userRole.MonthlyMembers) {
        //     setActiveAttendance("members")
        // } 
        else if (userRole.ManageEnquiry) {
            setActiveAttendance('enquiry')
        }
    }

    useEffect(() => {
        ActiveTabFunction()
    }, [userRole])


    return (
        <Fragment>
            <AdminHeader />
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <AdminNavItems />
                    <div className="AttendenceTabs px-3">
                        {userRole && userRole.ManageCustomer ? <span className={` ${attendanceActive === "customer" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("customer") }}>Manage Customers</span> : null}
                        {userRole && userRole.ManageHistory ? <span className={` ${attendanceActive === "history" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("history") }}>Manage History</span> : null}
                        {/* {userRole && userRole.MonthlyMembers ? <span className={` ${attendanceActive === "members" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("members") }}>Manage Members</span> : null} */}
                        {userRole && userRole.ManageEnquiry ? < span className={` ${attendanceActive === "enquiry" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("enquiry") }}>Manage Enquiry</span> : null}
                    </div>
                    <TabContent activeTab={attendanceActive} >
                        {userRole && userRole.ManageCustomer ?
                            <TabPane tabId="customer">
                                <ManageCustomer />
                            </TabPane>
                            : null}
                        {userRole && userRole.ManageHistory ?
                            <TabPane tabId="history">
                                <CustomerHistory />
                            </TabPane>
                            : null}

                        {/* {userRole && userRole.MonthlyMembers ?
                            <TabPane tabId="members">
                                <MonthlyMembers />
                            </TabPane>
                            : null} */}

                        {userRole && userRole.ManageEnquiry ?
                            <TabPane tabId="enquiry">
                                <ManageEnquiry />
                            </TabPane>
                            : null}
                    </TabContent>
                </div>
            </div>
        </Fragment >
    )
}

export default AdminCustomerManage