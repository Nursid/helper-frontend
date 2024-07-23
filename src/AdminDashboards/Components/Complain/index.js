import React, { Fragment, useState } from 'react'
import ManageComplain from './ManageComplain'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'

const AdminComplain = () => {
    const [attendanceActive, setActiveAttendance] = useState("master")
    return (
        <Fragment>
            <AdminHeader />
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <AdminNavItems />
                    <TabContent activeTab={attendanceActive} >
                        <TabPane tabId="master">
                            <ManageComplain />
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminComplain