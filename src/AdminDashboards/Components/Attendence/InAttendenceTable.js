import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminDataTable from '../../Elements/AdminDataTable';
import { useUserRoleContext } from '../../../Context/RolesContext';
import { mockDataContacts } from "../../data/mockData";
// import DashHeader from '../../DashboardComponents/Global/DashHeader';
// import { Card } from 'reactstrap'

const InAttendenceTable = () => {

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();

    useEffect(() => {
        UserRoleCalled()
    }, [])

     const columns = [
        { field: "id", headerName: "Sr.No", minWidth: 10, editable: true, hidden: true },        {
            field: "status",
            headerName: "Status",
            renderCell: (params) => (
                <p
                    className="text-danger p-2 bg-light d-flex justify-content-center align-items-center"
                    style={{
                        borderRadius: "5px",
                        cursor: "pointer",
                        margin: 0,
                    }}
                >
                    Check In
                </p>
            ),
            minWidth: 150,
            editable: true,
        },
        { field: "name", headerName: "Supervisor Name", flex: 1, minWidth: 120, editable: true },
        { field: "date", headerName: "Date",flex: 1, minWidth: 120, editable: true },
        { field: "start_time", headerName: "Check In", minWidth: 80,flex: 1, editable: true },
        { field: "end_time", headerName: "Check Out",flex: 1, minWidth: 120, editable: true },
        { field: "createdby", headerName: "Created By",flex: 1, minWidth: 120, editable: true },
    ]

    return (
        <Fragment>
            {/* <DashHeader /> */}
            <div className='p-3'>
                <h3 className='headingBelowBorder py-3 text-white' style={{ maxWidth: "fit-content" }}  >Supervisor Attendence Listing </h3>
                {/* <div className='AttendenceNavBtn w-100 py-2 gap-3'>
                    {RoleWiseBtn(Office) && RoleWiseBtn(Office).map((item, index) => (
                        <div className={`py-2 px-4 border shadow rounded-2 cursor-p text-white hoverThis Fw_500 d-flex align-items-center justify-content-center  ${selctedAttendence === item ? "hoverThis_active" : ""}`} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={() => { setSelectedAttendence(item) }}>
                            {item}
                        </div>
                    ))}
                </div> */}
                <AdminDataTable rows={mockDataContacts} columns={columns} CustomToolbar={GridToolbar} />
            </div>
        </Fragment>
    )
}

export default InAttendenceTable