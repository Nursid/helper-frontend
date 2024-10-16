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
import { useAuth } from '../../../Context/userAuthContext';
import { ServiceProviderAttendancaAction } from '../../../Store/Actions/Dashboard/AttendanceAction/ServiceProviderAttendance';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ServiceProviderLeaveRemarkModal } from '../../../Components/Modal';


const ServiceProviderAttendance = () => {
    const { UserRoleCalled } = useUserRoleContext();
    const { data, isSuccess } = useSelector(state => state.ServiceProviderAttendanceReducers);
    const dispatch = useDispatch();
    const [attendanceData, setAttendanceData] = useState([{id: 0}]);
    const { currentUser, setCurrentUser } = useAuth();
    const [modalOpen, setModalOpen] = useState(false)
    const [empId, setEmpId] = useState('')

    useEffect(() => {
        UserRoleCalled();
        dispatch(ServiceProviderAttendancaAction());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setAttendanceData(data);
        }
    }, [data, isSuccess]);

    const toggleModal = () => setModalOpen(!modalOpen)
    const addLeave = (empId) => {
      setEmpId(empId)
      toggleModal()
    }

     const role = currentUser && currentUser.role ? currentUser.role : currentUser && currentUser.designation.name ? currentUser.designation.name : ""

    const onAttendance = async (status, servp_id) => {
       
        const formData = {
            action: status === 'Working' ? 'check_out' : 'check_in',
            servp_id: servp_id,
            createdby: role
        };

        const response = await axios.post(`${API_URL}/attendance/service-provider/add`, formData);
        if(formData.action==='check_in'){
        const response = await axios.post(`${API_URL}/api/availability/attendance/${servp_id}`);
        }
        
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
            field: "",
            headerName: "",
            renderCell: (params) => {

                const { status } = params.row;
    
                // Check for the different statuses
                const Working = status === "Working";
                const Present = status === "Present";
        
                // Determine the action label and handler based on the status
                let label = '';
                let clickHandler = null;
            
                if (!status) {
                  label = 'Check In';
                  clickHandler = () => onAttendance(params.row.status, params.row.servp_id)
                } else if (Working) {
                  label = 'Check Out';
                  clickHandler = () => onAttendance(params.row.status, params.row.servp_id)
                } else {
                  label = 'Done';
                  clickHandler = null; // Disable clicking for completed orders
                }
                return (
                    <p
                      className="text-danger p-2 bg-light d-flex justify-content-center align-items-center"
                      style={{
                        borderRadius: "5px",
                        cursor: clickHandler ? "pointer" : "default", // Set cursor to pointer only if there is a click handler
                        margin: 0,
                      }}
                      onClick={clickHandler} // Only set onClick if there's a clickHandler
                    >
                      {label}
                    </p>
                  );
                },
                minWidth: 150,
                editable: true,
              },       
        { field: "status", headerName: "Attendance Mark", flex: 1, minWidth: 120, editable: true },
        { field: "name", headerName: "Supervisor Name", flex: 1, minWidth: 120, editable: true },
        { field: "in_date", headerName: "In Date", flex: 1, minWidth: 120, editable: true },
        { field: "check_in", headerName: "Check In", minWidth: 80, flex: 1, editable: true },
        { field: "out_date", headerName: "Out Date", minWidth: 80, flex: 1, editable: true },
        { field: "check_out", headerName: "Check Out", flex: 1, minWidth: 120, editable: true },
        { field: "createdby", headerName: "Created By", flex: 1, minWidth: 120, editable: true },
        { field: "message", headerName: "Remark", flex: 1, minWidth: 120, editable: false },
        { field: "action", headerName: "Action", flex: 1, minWidth: 120, editable: false,

          renderCell: (params) => {
                return (
                  <div className="d-flex gap-2">
                  <Button variant='contained' color='primary' 
                  onClick={() => addLeave(params.row.servp_id)}
                      style={{minWidth: "40px", maxWidth: "40px"}}
                      ><LogoutIcon /></Button>
                   </div>   
                )
            }
         },
    ];



    return (
        <Fragment>
           <ServiceProviderLeaveRemarkModal 
            modalOpen={modalOpen}
            toggleModal={toggleModal} 
            role={role}
            empId={empId}
            ServiceProviderAttendancaAction={ServiceProviderAttendancaAction}
            />

            {/* <DashHeader /> */}
            <div className='p-3'>
                <h3 className='headingBelowBorder py-3 text-white' style={{ maxWidth: "fit-content" }} >ServiceProvider Attendence Listing</h3>
                <AdminDataTable rows={attendanceData} columns={columns} CustomToolbar={GridToolbar} />
            </div>
        </Fragment>
    )
}

export default ServiceProviderAttendance