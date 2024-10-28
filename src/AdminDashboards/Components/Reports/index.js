import React, { Fragment, useState } from 'react';
import AdminHeader from '../AdminHeader';
import AnimatedBackground from '../../Elements/AnimatedBacground';
import AdminNavItems from '../../Elements/AdminNavItems';
import { TabContent, TabPane } from 'reactstrap';
import OrderReports from './OrderReports';
import AttendanceReports from './AttendanceReport';
import AccountReports from './AccountReports';
import ServiceProviderAttendanceReports from './ServiceProviderAttendanceReport';

const Reports = () => {
  const [attendanceActive, setAttendanceActive] = useState("1");

  return (
    <Fragment>
      <AdminHeader />
      <div className='position-relative'>
        <AnimatedBackground />
        <div className='BackgroundTopContents'>
          <AdminNavItems />

          <div className="AttendenceTabs px-3">
            <span 
              className={` ${attendanceActive === "1" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("1")}
            >
            Employee  Attendance Report
            </span>

            <span 
              className={` ${attendanceActive === "2" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("2")}
            >
            Service Provider  Attendance Report
            </span>

            <span 
              className={` ${attendanceActive === "3" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("3")}
            >
              Order Report
            </span>
            <span 
              className={` ${attendanceActive === "4" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("4")}
            >
              Account Report
            </span>
          </div>

          <TabContent activeTab={attendanceActive}>
            <TabPane tabId="1">
              <AttendanceReports setActiveAttendance={setAttendanceActive}  />
            </TabPane>

            <TabPane tabId="2">
              <ServiceProviderAttendanceReports setActiveAttendance={setAttendanceActive}  />
            </TabPane>

            <TabPane tabId="3">
              <OrderReports setActiveAttendance={setAttendanceActive} />
            </TabPane>
            <TabPane tabId="4">
              <AccountReports setActiveAttendance={setAttendanceActive}  />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};

export default Reports;
