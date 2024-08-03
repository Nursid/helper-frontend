import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import AdminDataTable from '../../Elements/AdminDataTable';
import { useUserRoleContext } from '../../../Context/RolesContext';
// import DashHeader from '../../DashboardComponents/Global/DashHeader';
// import { Card } from 'reactstrap'
import Swal from 'sweetalert2';
import { API_URL } from '../../../config';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { ServiceProviderAttendancaAction } from '../../../Store/Actions/Dashboard/AttendanceAction/ServiceProviderAttendance';

const ServiceProviderAttendance = () => {
    const { UserRoleCalled } = useUserRoleContext();
    const { data, isSuccess } = useSelector(state => state.ServiceProviderAttendanceReducers);
    const dispatch = useDispatch();
    const [attendanceData, setAttendanceData] = useState([{id: 0}]);

    useEffect(() => {
        UserRoleCalled();
        dispatch(ServiceProviderAttendancaAction());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setAttendanceData(data);
        }
    }, [data, isSuccess]);


    const onAttendance = async (status, servp_id) => {
       
        const formData = {
            action: status === true ? 'check_out' : 'check_in',
            servp_id: servp_id,
            createdby: 'Super Admin'
        };
        const response = await axios.post(`${API_URL}/attendance/service-provider/add`, formData);
        if (response.status === 200) {
            dispatch(ServiceProviderAttendancaAction());
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data.message
            })
        }
    };

    const columns = [
        {
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
                    onClick={() => onAttendance(params.row.status, params.row.servp_id)}
                >
                    {(!params.row.status) ? 'Check In' : 'Check Out'}
                </p>
            ),
            minWidth: 150,
            editable: true,
        },
        { field: "name", headerName: "Supervisor Name", flex: 1, minWidth: 120, editable: true },
        { field: "in_date", headerName: "In Date", flex: 1, minWidth: 120, editable: true },
        { field: "check_in", headerName: "Check In", minWidth: 80, flex: 1, editable: true },
        { field: "out_date", headerName: "Out Date", minWidth: 80, flex: 1, editable: true },
        { field: "check_out", headerName: "Check Out", flex: 1, minWidth: 120, editable: true },
        { field: "createdby", headerName: "Created By", flex: 1, minWidth: 120, editable: true },
    ];

    return (
        <Fragment>
            {/* <DashHeader /> */}
            <div className='p-3'>
                <h3 className='headingBelowBorder py-3 text-white' style={{ maxWidth: "fit-content" }} >ServiceProvider Attendence Listing</h3>
                <AdminDataTable rows={attendanceData} columns={columns} CustomToolbar={GridToolbar} />
            </div>
        </Fragment>
    )
}

export default ServiceProviderAttendance