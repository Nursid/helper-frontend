
import AddNewPost from './Forms/AddNewPost'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'

import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Button } from '@mui/material';
// import { GetAAction } from '../../../Store/Actions/Dashboard/ManageWebsite/TestimonialAction';
import { GetAllPostAction } from '../../../Store/Actions/Dashboard/ManageWebsite/PostAction';
import moment from 'moment';
import axios from 'axios';
import { API_URL, IMG_URL } from '../../../config';
import Swal from 'sweetalert2';


import { useDispatch, useSelector } from 'react-redux'




const ManagePost = () => {
    const [isApprove, setIsApprove] = useState({});
    const [blockStatus, setBlockStatus] = useState({});

    const {data}=useSelector(state=>state.GetAllPostReducer)


    const dispatch =useDispatch();


    useEffect(() => {
        if (data && data.length > 0) {
            const initialBlockStatus = {};
            const initialIsApproveStatus = {};
            data.forEach(item => {
                initialBlockStatus[item.id] = item.block;
                initialIsApproveStatus[item.id] = item.issapproved;
            });
            setBlockStatus(initialBlockStatus);
            setIsApprove(initialIsApproveStatus);
        }
    }, [data]);

    const GetDeleteByID = (id)=> {
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
                const response = await axios.delete(API_URL + '/manage-website/post/delete/' + id)
                if (response.status === 200) {
                    dispatch(GetAllPostAction())
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
                NewData.push({ ...item , _id: data.indexOf(item), from_date: moment(item.from_date).format("D-M-Y") ,end_date: moment(item.end_date).format("D-M-Y") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    useEffect(()=>{
        dispatch(GetAllPostAction())
    },[])

    const handleToggleBlock = (userId) => {
        const newBlockStatus = !blockStatus[userId]; // Toggle the block status
        // Make API call to update block status on the server
        axios.put(`${API_URL}/manage-website/post/block/${userId}`, { block: newBlockStatus })
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

        const actionText = newApproveStatus ? 'Un-Block' : 'Block';
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
        axios.put(`${API_URL}/manage-website/post/approve/${userId}`, { issapproved: newApproveStatus })
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
                        [userId]: newApproveStatus,
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
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "image", headerName: "Image",
            renderCell: (params) => (
                <>
                <img src={IMG_URL+params.row.image} className='rounded-circle' alt="Image" style={{width: 100, height: 50 }} />
                </>
            )},
        { field: "cust_id", headerName: "Cust.ID", minWidth: 120, editable: true },
        { field: "type", headerName: "Type", minWidth: 120, editable: true },
        { field: "property", headerName: "Discription", minWidth: 400, editable: true },
        { field: "from_date", headerName: "Post Date.", minWidth: 120, editable: true },
        { field: "end_date", headerName: "End Date.", minWidth: 120, editable: true },
        // { field: "mobileNumber", headerName: "Mobile No.", minWidth: 120, editable: true },
        // { field: "email", headerName: "Email", minWidth: 120, editable: true },
        // { field: "address", headerName: "Address", minWidth: 250, editable: true },
        // { field: "username", headerName: "User Name", minWidth: 250, editable: true },
        // { field: "password", headerName: "password", minWidth: 250, editable: true },
        // { field: "zipCode", headerName: "Password", minWidth: 120, editable: true },
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
                       <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.id)}
                       style={{minWidth: "40px", maxWidth: "40px"}}
                       ><BlockIcon /></Button>
                        :
                        <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.id)}>Un-Block</Button>
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
    const [AddPost, setAddPost] = useState(false)
    const ToggleAddNewPost = () => setAddPost(!AddPost)
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
            modalTitle={editMode ? "Edit  Post" : "Add New Post"}
            modal={showModal}
            toggle={toggleModal}
            data={<AddNewPost  GetAllPostAction={GetAllPostAction} 
            toggleModal={toggleModal}  data={editData}
            /> } 
            size={"lg"} scrollable={true} />
            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> All Offers Post </h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "18rem", maxWidth: "18rem" }} onClick={toggleModal} >
                Add New Post
                </div>
            </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}
export default ManagePost