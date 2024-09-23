import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'
import ManageEmployee from './ManageEmployee'
import ManageServiceProvider from './ManageServiceProvider'
import { useUserRoleContext } from '../../../Context/RolesContext'
// import ManageMonthService from './ManageMonthService'

const AdminManageHr = () => {
  const [attendanceActive, setActiveAttendance] = useState("employee")
  const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();
  // to set the active page 
  const ActiveTabFunction = () => {
    if (userRole.ManageEmployee) {
      setActiveAttendance('employee')
    } else if (userRole.ManageServiceProvider) {
      setActiveAttendance("service-provider")
    }
    // else if (userRole.ManageMonthService) {
    //   setActiveAttendance("monthly-services")
    // }
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
            {userRole && userRole.ManageEmployee ? <span className={` ${attendanceActive === "employee" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("employee") }}>Manage Employee</span> : null}

            {/* {userRole && userRole.ManageMonthService ? <span className={` ${attendanceActive === "monthly-services" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("monthly-services") }}>Manage Monthly Service </span> : null} */}

            {userRole && userRole.ManageServiceProvider ? <span className={` ${attendanceActive === "service-provider" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("service-provider") }}>Manage Service Provider</span> : null}
          </div>


          <TabContent activeTab={attendanceActive} >
            <TabPane tabId="employee">
              <ManageEmployee setActiveAttendance={setActiveAttendance} />
            </TabPane>
            <TabPane tabId="service-provider">
              <ManageServiceProvider setActiveAttendance={setActiveAttendance} />
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
export default AdminManageHr