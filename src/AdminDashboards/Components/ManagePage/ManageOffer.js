
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useState,useEffect } from 'react'

import AddOfferForm from './Forms/AddOfferForm';

import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Button } from '@mui/material';


import { GetAllOfferAction } from '../../../Store/Actions/Dashboard/ManageWebsite/OfferAction';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'

const ManageOffer = () => {

    const [isApprove, setIsApprove] = useState({});
    const [blockStatus, setBlockStatus] = useState({});

    const {data}=useSelector(state=>state.GetAllOfferReducer)

    const dispatch =useDispatch();


    useEffect(() => {
        if (data && data.length > 0) {
            const initialBlockStatus = {};
            const initialIsApproveStatus = {};
            data.forEach(item => {
                initialBlockStatus[item.id] = item.block;
                initialIsApproveStatus[item.id] = item.is_approved;
            });
            setBlockStatus(initialBlockStatus);
            setIsApprove(initialIsApproveStatus);
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
                const response = await axios.delete(API_URL + '/manage-website/offer/delete/' + id)
                if (response.status === 200) {
                    dispatch(GetAllOfferAction())
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
                NewData.push({ ...item , _id: data.indexOf(item), date: moment(item.createdAt).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    useEffect(()=>{
        dispatch(GetAllOfferAction())
    },[])

    const handleToggleBlock = (userId) => {
        const newBlockStatus = !blockStatus[userId]; // Toggle the block status
        // Make API call to update block status on the server
        axios.put(`${API_URL}/manage-website/offer/block/${userId}`, { block: newBlockStatus })
            .then(response => {
                if (response.status === 200) {
                    // Update local state if API call is successful
                    setBlockStatus(prevBlockStatus => ({
                        ...prevBlockStatus,
                        [userId]: newBlockStatus,
                    }));
                } else {
                    // Handle error if API call fails
                    console.error('Failed to update block status');
                }
            })
            .catch(error => {
                console.error('Error updating block status:', error);
            });
    };

    const handleToggleApprove = (userId) => {
        const newApproveStatus = !isApprove[userId]; // Toggle the block status
        // Make API call to update block status on the server
        axios.put(`${API_URL}/manage-website/offer/approve/${userId}`, { is_approved: newApproveStatus })
            .then(response => {
                if (response.status === 200) {
                    // Update local state if API call is successful
                    setIsApprove(prevApproveStatus => ({
                        ...prevApproveStatus,
                        [userId]: newApproveStatus,
                    }));
                } else {
                    // Handle error if API call fails
                    console.error('Failed to update block status');
                }
            })
            .catch(error => {
                console.error('Error updating block status:', error);
            });
    };


    const column = [
        { field: "_id", headerName: "Sr No", minWidth: 10, editable: true },
        { field: "date", headerName: "Date", minWidth: 120, editable: true },
        { field: "description", headerName: "Description", minWidth: 400, editable: true },
        { field: "image", headerName: "Image", minWidth: 120, editable: true },
        {
            field: "issapproved",
            minWidth: 150,
            headerName: "Admin Approved",
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    { isApprove[params.row.id] ?
                       <Button className="text-white bg-green" onClick={()=>{handleToggleApprove(params.row.id)}}>Approved</Button>
                        :
                        <Button className="text-white bg-warning" onClick={()=>{handleToggleApprove(params.row.id)}}>Not-Approved</Button>
                    }
                </div>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 220,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button variant='contained' color='primary' onClick={(e)=>{toggleEditMode(params.row)}}><BorderColorIcon /></Button>
                    <Button variant="contained" color="success">
                        <VisibilityIcon />
                    </Button>
                    <Button variant="contained" color="error"
                    onClick={(e) => {
                        GetDeleteByID(params.row.id)
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

            modalTitle={editMode ? "Edit Offer" : "Add Offer"}
            modal={showModal}
            toggle={toggleModal}

            data={<AddOfferForm  GetAllOfferAction={GetAllOfferAction} 
            toggleModal={toggleModal}  data={editData}
            />} 
            
            />
            {/* <DashHeader /> */}
            <h4 className='p-3 px-4 mt-3 bg-transparent headingBelowBorder text-white' style={{ maxWidth: "fit-content" }}>All Offers Details </h4>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal}>
                    Add New Offer
                </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageOffer