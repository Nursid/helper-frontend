import React, { Fragment, useState } from 'react'
import ManageService from './ManageService'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'

const AdminManageMaster = () => {
    const [attendanceActive, setActiveAttendance] = useState("master")
    return (
        <Fragment>
            <AdminHeader />
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <AdminNavItems />
                    {/* <div className="AttendenceTabs px-3">
                        <span className={` ${attendanceActive === "in" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("in") }}>In Attendence</span>
                        <span className={` ${attendanceActive === "out" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("out") }}>Out Attendence</span>
                        <span className={` ${attendanceActive === "report" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("report") }}>Attendance Report</span>
                        <span className={` ${attendanceActive === "modify" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("modify") }}>Attendance Modify</span>
                    </div> */}
                    <TabContent activeTab={attendanceActive} >
                        <TabPane tabId="master">
                            <ManageService />
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminManageMaster