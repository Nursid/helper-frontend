import { Button } from '@mui/material';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useNavigate } from 'react-router-dom/dist';
import AdminDataTable from '../../Elements/AdminDataTable';
import ModalComponent from '../../Elements/ModalComponent';
import AdminAddServiceProvider from './Forms/AdminAddServiceProvider';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllServiceProvider } from '../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import moment from 'moment';
import { API_URL } from '../../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import ViewServiceProvider from './Views/ViewServiceProvider';

const ManageServiceProvider = () => {

    const navigate = useNavigate()

    const [Block, setBlock] = useState(false)
    const dispatch = useDispatch();
    const { data } = useSelector(pre => pre.GetAllServiceProviderReducer);



    const [blockStatus, setBlockStatus] = useState({});

    // Set initial block status when data changes
    useEffect(() => {
        if (data && data.length > 0) {
            const initialBlockStatus = {};
            data.forEach(item => {
                initialBlockStatus[item.id] = item.block_id;
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
        axios.post(`${API_URL}/service-provider/block/${userId}`, { block_id: newBlockStatus })
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
                NewData.push({ ...item, _id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }
    const ImageResult = useSelector(pre => pre.ImageUploadReducer);

    

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData,setEditData]=useState([]);
    const [viewModel, setViewModel] = useState(false)
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

    const toggleView = (data) =>{
        setEditData(data);
        setViewModel(!viewModel)
    }



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
                const response = await axios.get(API_URL + '/service-provider/delete/' + user_id)
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Service Provider has been deleted.',
                        'success'
                    )
                    dispatch(GetAllServiceProvider())
                } else {
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                }
            }
        })
    }


    const column = [
        { field: "_id", headerName: "Sr No", minWidth: 50, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "ref_name", headerName: "Ref Name", minWidth: 120, editable: true }, 
        // { field: "provider_type", headerName: "Provider Type", minWidth: 120, editable: true },
       
        { field: "aadhar_no", headerName: "Aadhaar No", minWidth: 120, editable: true },
        { field: "mobile_no", headerName: "Mobile No", minWidth: 120, editable: true },
        { field: "email", headerName: "Email", minWidth: 120, editable: true },
        { field: "permanent_address", headerName: "Address", minWidth: 250, editable: true },
        { field: "about", headerName: "About", minWidth: 220, editable: true },
        {
            field: "status",
            minWidth: 150,
            headerName: "Admin Status",
            renderCell: (params) => (
                <Button className="text-white bg-green" style={{minWidth: "80px", maxWidth: "80px"}}>Approved</Button>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button variant='contained' onClick={(e)=>{toggleEditMode(params.row)}} color='primary'
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    ><BorderColorIcon /></Button>
                    <Button variant="contained" color="success" onClick={(e)=>{toggleView(params.row)}}
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    >
                        <VisibilityIcon />
                    </Button>
                    <Button variant="contained" color="error"
                    onClick={(e)=>{
                        GetDeleteByID(params.row.id)
                    }}
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    >
                        <DeleteForeverIcon />
                    </Button>
                </div>
            ),
        },
        {
            field: "block",
            headerName: "Block",
            minWidth: 160,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    {blockStatus[params.row.id] ?
                       <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.id)} style={{minWidth: "40px", maxWidth: "40px"}}><BlockIcon /></Button>
                        :
                        <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.id)} style={{minWidth: "80px", maxWidth: "80px"}}>Un-Block</Button>
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
    }

    const ServiceProviderType = [
        { value: 'staff', label: 'Staff' },
        { value: 'outsource', label: 'Out Source' },
    ];

    useEffect(() => {
        dispatch(GetAllServiceProvider())
    }, [])
    // Add service provider controller 
    const [AddService, setAddServicer] = useState(false)
    const ToggleAddServiceMan = () => setAddServicer(!AddService)
    return (
        <Fragment>

            <ModalComponent data={<AdminAddServiceProvider toggleModal={toggleModal} data2={editData}  />} 
            modalTitle={editMode ? "Edit Service Provider" : "Add Service Provider"}
            modal={showModal}
            toggle={toggleModal}
            size={"xl"} scrollable={true}
            />

            <ModalComponent
                data={<ViewServiceProvider
                data2={editData} toggleModal={toggleView} />}
                modalTitle={"Service Provider Profile"}
                modal={viewModel}
                toggle={toggleView}
                size={"xl"} scrollable={true}
            />

            <div className='flex'>
                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}>Service Provider List</h4>

                <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                    <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
                    Add Service Provider
                    </div>
                </div>
            </div>

            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageServiceProvider