import React, { Fragment, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BlockOutlined from "@mui/icons-material/BlockOutlined"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useNavigate } from 'react-router-dom/dist'
import AdminDataTable from '../../Elements/AdminDataTable'
import ModalComponent from '../../Elements/ModalComponent'
import AdminAddEmployeeForm from './Forms/AdminAddEmployeeForm'
import ViewEmployee from './Views/ViewEmployee'
import AdminEditEmploye from './Forms/AdminEditEmploye'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEmployeeAction } from '../../../Store/Actions/Dashboard/EmployeeActions/GetAllEmployee'
import moment from 'moment'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import { API_URL } from '../../../config'
import axios from 'axios'
import { ToggleOnOutlined } from '@mui/icons-material'


const ManageEmployee = () => {

    const navigate = useNavigate()

    const { data } = useSelector(state => state.GetAllEmployeeDataReducer)
    const dispatch = useDispatch();

    const [blockStatus, setBlockStatus] = useState({});
    const [viewModal, setViewModel] = useState(false)
    // Set initial block status when data changes
    useEffect(() => {
        if (data && data.length > 0) {
            const initialBlockStatus = {};
            data.forEach(item => {
                initialBlockStatus[item.id] = item.is_block;
            });
            setBlockStatus(initialBlockStatus);
        }
    }, [data]);

    const handleToggleBlock = (userId) => {

        const newBlockStatus = !blockStatus[userId]; 

        const actionText = newBlockStatus ? 'Un-Block' : 'Block';
        
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to ${actionText}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${actionText} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Toggle the block status
        // Make API call to update block status on the server
        axios.post(`${API_URL}/employee/block/${userId}`, { is_block: newBlockStatus })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire(
                        `${actionText} Successful`,
                        `User has been ${actionText}ed.`,
                        'success'
                    );
                    // Update local state if API call is successful
                    setBlockStatus(prevBlockStatus => ({
                        ...prevBlockStatus,
                        [userId]: newBlockStatus,
                    }));
                } else {
                    // Handle error if API call fails
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                    console.error('Failed to update block status');
                }
            })
            .catch(error => {
                console.error('Error updating block status:', error);
            });

               
            }
        })


       
    };


    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                NewData.push({ ...item,design_name:item.designation?.name, dept_name:item.department?.name , _id: data.indexOf(item), date: moment(item.createdAt).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    useEffect(() => {
        dispatch(GetAllEmployeeAction())
    }, [])


    const GetDeleteByID = (user_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.get(API_URL + '/employee/delete/' + user_id)
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    dispatch(GetAllEmployeeAction())
                } else {
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                }
            }
        })
    }

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
   


    const [editData,setEditData]=useState([])
    const toggleModal = () => {
        setShowModal(!showModal);
        setEditMode(false); 
        setEditData('')
    };

    const toggleEditMode = (data) => {
        setShowModal(true);
        setEditMode(true);
        setEditData(data)
    };

    const toggleView = (data) => {
        setEditData(data)
        setViewModel(!viewModal);
    };



    const column = [
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "emp_id", headerName: "Emp Id", minWidth: 120, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "design_name", headerName: "Designation", minWidth: 120, editable: true },
        { field: "dept_name", headerName: "Department", minWidth: 120, editable: true },
        { field: "mobile_no", headerName: "Mobile No.", minWidth: 120, editable: true },
        { field: "alterno", headerName: "Alternate No.", minWidth: 120, editable: true },
        { field: "aadhar_no", headerName: "Aadhaar No.", minWidth: 150, editable: true },
        { field: "pan_no", headerName: "Pan No", minWidth: 120, editable: true },
        { field: "address", headerName: "Address", minWidth: 250, editable: true },
        { field: "date", headerName: "Date Of Join", minWidth: 120, editable: true },
        {
            field: "status",
            minWidth: 150,
            headerName: "Status",
            renderCell: (params) => (
                <Button className="text-white bg-green">Approved</Button>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button  onClick={(e)=>{toggleEditMode(params.row)}} variant='contained' color='primary' style={{minWidth: "40px", maxWidth: "40px"}} ><BorderColorIcon /></Button>
                    <Button variant="contained" color="success" onClick={(e)=>{toggleView(params.row)}} style={{minWidth: "40px", maxWidth: "40px"}}>
                        <VisibilityIcon />
                    </Button>
                    <Button variant="contained" color="error"
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    onClick={(e) => {
                        GetDeleteByID(params.row.emp_id)
                    }}
                    >
                        <DeleteForeverIcon />
                    </Button>
                </div>
            ),
        },
        {
            field: "block",
            headerName: "Block",
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    {blockStatus[params.row.id] ?
                       <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.id)}
                       style={{minWidth: "40px", maxWidth: "40px"}}
                       ><BlockIcon /
                       
                       ></Button>
                        :
                        <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.id)}> Un-Block </Button>
                    }
                </div>
            ),
        },
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarQuickFilter />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    };

    // Add Employee form Handler 
    const [addEmployee, setAddEmployee] = useState(false)
    const ToggleAddEmployee = () => setAddEmployee(!addEmployee)
    return (
        <Fragment>
            {/* employee add form Modal  */}
            {/* <ModalComponent data={<AdminAddEmployeeForm ToggleAddEmployee={ToggleAddEmployee} />} modalTitle={ "Add Employee Form"} modal={addEmployee} toggle={ToggleAddEmployee} size={"xl"} scrollable={true} /> */}
            <ModalComponent
                data={<AdminAddEmployeeForm 
                data={editData} toggleModal={toggleModal} />}
                modalTitle={editMode ? "Edit Employee Form" : "Add Employee Form"}
                modal={showModal}
                toggle={toggleModal}
                size={"xl"} scrollable={true}
            />

            <ModalComponent
                data={<ViewEmployee 
                data={editData} toggleModal={toggleView} />}
                modalTitle={"Employee Profile"}
                modal={viewModal}
                toggle={toggleView}
                size={"xl"}
                scrollable={true}
            />

            <div className='flex'>

                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}>Employee List</h4>

                <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                    <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
                        Add Employee
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageEmployee;