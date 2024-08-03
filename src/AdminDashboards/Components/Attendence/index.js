import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import { TabContent, TabPane } from 'reactstrap'
import SupervisorAttendance from './SupervisorAttendance'
import OutAttendenceTable from './ServiceProviderAttendance'
import AttendenceReport from './AttendenceReport'
import AttendenceModify from './AttendenceModify'
import AdminNavItems from '../../Elements/AdminNavItems'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import { useUserRoleContext } from '../../../Context/RolesContext'
import { WaitLoader } from '../../Elements/WaitLoader'

const AdminAttendance = () => {
    const [attendanceActive, setActiveAttendance] = useState("in")

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();

    useEffect(() => {
        UserRoleCalled()
    }, [])


    // to set the active page 
    const ActiveTabFunction = () => {
        if (userRole.AttendenceEmployee || userRole.AttendenceServiceProvider) {
            setActiveAttendance('in')
        } else if (userRole.AttendenceReport) {
            setActiveAttendance("report")
        } else if (userRole.AttendenceModify) {
            setActiveAttendance("modify")
        } else {
            setActiveAttendance('in')
        }
    }

    useEffect(() => {
        ActiveTabFunction();
    }, [userRole])

    return (
        !userRole ? <WaitLoader loading={true} /> :
            <Fragment>
                <AdminHeader />
                <div className='position-relative'>
                    <AnimatedBackground />
                    <div className='BackgroundTopContents'>
                        <AdminNavItems />
                        <div className="AttendenceTabs px-3">
                            {/* set role wise display  */}

                            {userRole && userRole.AttendenceEmployee ? <span className={` ${attendanceActive === "in" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("in") }}>Supervisor Attendance</span> : null}
                            {userRole && userRole.AttendenceServiceProvider ? <span className={` ${attendanceActive === "out" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("out") }}>Service Provider Attendance</span> : null}

                            {/* {userRole && userRole.AttendenceReport ? <span className={` ${attendanceActive === "report" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("report") }}>Attendance Report</span> : null}
                            {userRole && userRole.AttendenceModify ? <span className={` ${attendanceActive === "modify" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("modify") }}>Attendance Modify</span> : null} */}
                        </div>
                        <TabContent activeTab={attendanceActive} >
                            {userRole && userRole.AttendenceEmployee || userRole.AttendenceServiceProvider ? <>
                                <TabPane tabId="in">
                                    <SupervisorAttendance />
                                </TabPane>
                                <TabPane tabId="out">
                                    <OutAttendenceTable />
                                </TabPane>
                            </> : null}
                            {/* {userRole && userRole.AttendenceReport ?
                                <TabPane tabId="report">
                                    <AttendenceReport />
                                </TabPane>
                                : null}
                            {userRole && userRole.AttendenceModify ?
                                <TabPane tabId="modify">
                                    <AttendenceModify />
                                </TabPane>
                                : null} */}
                        </TabContent>
                    </div>
                </div>
            </Fragment>
    )
}

export default AdminAttendance