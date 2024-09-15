import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'
import ManageHeadExpenses from './ManageHeadExpenses'
import AddExpense from './AddExpense'
import AddCollections from './AddCollections'
import TodaysReport from './TodaysReport'
import AllTransactionReport from './Cashbook'
import { useUserRoleContext } from '../../../Context/RolesContext'

const AdminExpenses = () => {

    const [attendanceActive, setActiveAttendance] = useState("report")


    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();
    // to set the active page 
    const ActiveTabFunction = () => {
        if (userRole.AddHeadExpence) {
            setActiveAttendance('head')
        } else if (userRole.AddExpense) {
            setActiveAttendance("expense")
        } else if (userRole.AddCollections) {
            setActiveAttendance("collection")
        } else if (userRole.TodaysReport) {
            setActiveAttendance('report')
        } else if (userRole.AllTransactionReport) {
            setActiveAttendance('all')
        }
    }

    // useEffect(() => {
    //     ActiveTabFunction()
    // }, [userRole])

    return (
        <Fragment>
            <AdminHeader />
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <AdminNavItems />
                    <div className="AttendenceTabs px-3">

                    {userRole && userRole.TodaysReport ? <span className={` ${attendanceActive === "report" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("report") }}>Today's Report</span> : null}

                        {userRole && userRole.AddHeadExpence ? <span className={` ${attendanceActive === "head" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("head") }}>Add/Manage Expense Head</span> : null}


                        {userRole && userRole.AddExpense ? <span className={` ${attendanceActive === "expense" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("expense") }}>Add Expense</span> : null}

                        {userRole && userRole.AddCollections ? <span className={` ${attendanceActive === "collection" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("collection") }}>Add Collection</span> : null}
                       
                       
                        
                        {userRole && userRole.AllTransactionReport ? <span className={` ${attendanceActive === "all" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("all") }}>Cashbook</span> : null}
                    </div>
                    <TabContent activeTab={attendanceActive} >

                        
                        {userRole && userRole.AddHeadExpence || userRole.Expenses ?
                            <TabPane tabId="head">
                                <ManageHeadExpenses setActiveAttendance={setActiveAttendance} />
                            </TabPane>
                            : null}

                        {userRole && userRole.AddExpense ?
                            < TabPane tabId="expense">
                                <AddExpense setActiveAttendance={setActiveAttendance} />
                            </TabPane> : null}
                        {userRole && userRole.AddCollections ?
                            <TabPane tabId="collection">
                                <AddCollections setActiveAttendance={setActiveAttendance} />
                            </TabPane>
                            : null}

                        {userRole && userRole.TodaysReport ?
                            <TabPane tabId="report">
                                <TodaysReport setActiveAttendance={setActiveAttendance} />
                            </TabPane>
                            : null}

                        {userRole && userRole.AllTransactionReport ?
                            <TabPane tabId="all">
                                <AllTransactionReport setActiveAttendance={setActiveAttendance} />
                            </TabPane>
                            : null}
                    </TabContent>
                </div>
            </div>
        </Fragment >
    )
}

export default AdminExpenses;