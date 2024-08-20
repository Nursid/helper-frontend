import React, { Fragment, useState } from 'react';
import AdminHeader from '../AdminHeader';
import AnimatedBackground from '../../Elements/AnimatedBacground';
import AdminNavItems from '../../Elements/AdminNavItems';
import { TabContent, TabPane } from 'reactstrap';
import OrderReports from './OrderReports';

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
              Today Report
            </span>
            <span 
              className={` ${attendanceActive === "7" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("7")}
            >
              Weekly Report
            </span>
            <span 
              className={` ${attendanceActive === "3" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("3")}
            >
              Monthly Report
            </span>
            <span 
              className={` ${attendanceActive === "6" ? "ReportsTabs_Active" : ""}`} 
              onClick={() => setAttendanceActive("6")}
            >
              Custom Report
            </span>
          </div>

          <TabContent activeTab={attendanceActive}>
            <TabPane tabId="1">
              <OrderReports setActiveAttendance={setAttendanceActive} reportType={attendanceActive} />
            </TabPane>
            <TabPane tabId="3">
              <OrderReports setActiveAttendance={setAttendanceActive} reportType={attendanceActive}/>
            </TabPane>
            <TabPane tabId="7">
              <OrderReports setActiveAttendance={setAttendanceActive} reportType={attendanceActive} />
            </TabPane>
            <TabPane tabId="6">
              <OrderReports setActiveAttendance={setAttendanceActive} reportType={attendanceActive} />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};

export default Reports;
