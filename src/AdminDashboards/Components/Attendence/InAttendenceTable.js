import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { columns } from '../../Elements/GridTableCredentials/Colums';
import AdminDataTable from '../../Elements/AdminDataTable';
import { useUserRoleContext } from '../../../Context/RolesContext';
// import DashHeader from '../../DashboardComponents/Global/DashHeader';
// import { Card } from 'reactstrap'

const InAttendenceTable = () => {

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();

    useEffect(() => {
        UserRoleCalled()
    }, [])
    const Office = ['Employee', 'Service Provider', 'Out Source']
    const [selctedAttendence, setSelectedAttendence] = useState("Employee")
    const RoleWiseBtn = (office) => {
        let newArray;
        if (!userRole.AttendenceEmployee) {
            newArray = office.filter(x => x !== 'Employee')
        } else if (!userRole.AttendenceServiceProvider) {
            newArray = office.filter(x => x !== 'Service Provider')
        }
        return newArray
    }
    return (
        <Fragment>
            {/* <DashHeader /> */}
            <div className='p-3'>
                <h3 className='headingBelowBorder py-3 text-white' style={{ maxWidth: "fit-content" }}  >Attendence <sup><small>(In)</small></sup></h3>
                <div className='AttendenceNavBtn w-100 py-2 gap-3'>
                    {RoleWiseBtn(Office) && RoleWiseBtn(Office).map((item, index) => (
                        <div className={`py-2 px-4 border shadow rounded-2 cursor-p text-white hoverThis Fw_500 d-flex align-items-center justify-content-center  ${selctedAttendence === item ? "hoverThis_active" : ""}`} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={() => { setSelectedAttendence(item) }}>
                            {item}
                        </div>
                    ))}
                </div>
                <AdminDataTable rows={mockDataContacts} columns={columns} CustomToolbar={GridToolbar} />
            </div>
        </Fragment>
    )
}

export default InAttendenceTable