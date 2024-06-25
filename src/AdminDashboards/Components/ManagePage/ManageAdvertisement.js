import { Box } from '@mui/material';

import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';

import React, { Fragment, useState,useEffect } from 'react'

import { mockDataContacts } from '../../data/mockData';

import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Button } from '@mui/material';
import AddAdvertisementForm from "./Forms/AddAdvertisementForm"
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAdvertisementAction } from '../../../Store/Actions/Dashboard/ManageWebsite/AdvertisementAction';

const ManageAdvertisement = () => {
    const [blockStatus, setBlockStatus] = useState({});
    const {data}=useSelector(state=>state.GetAllAdvertisementReducer)
    const dispatch =useDispatch();
    useEffect(() => {
        if (data && data.length > 0) {
            const initialBlockStatus = {};
            data.forEach(item => {
                initialBlockStatus[item.id] = item.block;
            });
            setBlockStatus(initialBlockStatus);
        }
    }, [data]);
    const GetDeleteByID = (id)=>{
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
                const response = await axios.delete(API_URL + '/manage-website/advertisements/delete/' + id)
                if (response.status === 200) {
                    dispatch(GetAllAdvertisementAction())
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } else {
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                }
            }
        })
    }
    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                NewData.push({ ...item , _id: data.indexOf(item), start_date: moment(item.start_date).format("DD-MM-YYYY"),end_date: moment(item.end_date).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }
    useEffect(()=>{
        dispatch(GetAllAdvertisementAction())
    },[])

    const handleToggleBlock = (userId) => {
        const newBlockStatus = !blockStatus[userId]; // Toggle the block status
        // Make API call to update block status on the server
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
        axios.put(`${API_URL}/manage-website/advertisements/block/${userId}`, { block: newBlockStatus })
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
    const column = [
        { field: "_id", headerName: "Sr No", minWidth: 120, editable: true },
        { field: "start_date", headerName: "To Date", minWidth: 120, editable: true },
        { field: "end_date", headerName: "End Date", minWidth: 120, editable: true },
        { field: "company_name", headerName: "Company Name", minWidth: 220, editable: true },
        { field: "gst_no", headerName: "GST No.", minWidth: 220, editable: true },
        { field: "payment", headerName: "Payment", minWidth: 220, editable: true },
        { field: "mobile", headerName: "Mobile", minWidth: 120, editable: true },
        {   
            field: "action",
            headerName: "Action",
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button variant='contained' color='primary' onClick={(e)=>{toggleEditMode(params.row)}}
                        style={{minWidth: "40px", maxWidth: "40px"}}
                        ><BorderColorIcon /></Button>
                    <Button variant="contained" color="success"
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    >
                        <VisibilityIcon />
                    </Button>
                    <Button variant="contained" color="error"
                    onClick={(e) => {
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
            minWidth: 100,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    {blockStatus[params.row.id] ?
                     <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.id)}>Un-Block</Button>
                        :
                        <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.id)}><BlockIcon /></Button>
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

    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    return (
        <Fragment>
            <ModalComponent 
             modalTitle={editMode ? "Edit Advertisement" : "Add Advertisement"}
             modal={showModal}
             toggle={toggleModal} data={<AddAdvertisementForm
                GetAllAdvertisementAction={GetAllAdvertisementAction} 
                toggleModal={toggleModal}  data={editData}
             />}  size={"lg"} />
            {/* <DashHeader /> */}
        

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> Advertisement List </h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "18rem", maxWidth: "18rem" }} onClick={toggleModal} >
                Add New Advertisement
                </div>
            </div>
            </div>

            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}
export default ManageAdvertisement