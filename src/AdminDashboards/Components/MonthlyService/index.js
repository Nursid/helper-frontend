import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import { TabContent, TabPane } from 'reactstrap'
import MonthService from './MonthService'
import CarSchedule from './CarSchedule'
import AdminNavItems from '../../Elements/AdminNavItems'
// import ManageMonthService from './ManageMonthService'

const MonthlyServices = () => {
  const [attendanceActive, setActiveAttendance] = useState(1)
  

  return (
    <Fragment>
      <AdminHeader />
      <div className='position-relative'>
        <AnimatedBackground />
        <div className='BackgroundTopContents'>

          <AdminNavItems />
          <div className="AttendenceTabs px-3">
            <span className={` ${attendanceActive === "employee" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance(1) }}>Monthly Service</span>

            {/* {userRole && userRole.ManageMonthService ? <span className={` ${attendanceActive === "monthly-services" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("monthly-services") }}>Manage Monthly Service </span> : null} */}

             <span className={` ${attendanceActive === "service-provider" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance(2) }}>Daily Schedule</span> 
          </div>


          <TabContent activeTab={attendanceActive} >
            <TabPane tabId={1}>
              <MonthService setActiveAttendance={setActiveAttendance} />
            </TabPane>
            <TabPane tabId={2}>
              <CarSchedule setActiveAttendance={setActiveAttendance} />
            </TabPane>

            {/* <TabPane tabId="monthly-services">
              <ManageMonthService setActiveAttendance={setActiveAttendance} />
            </TabPane> */}


          </TabContent>
        </div>
      </div>
    </Fragment>
  )
}
export default MonthlyServices;