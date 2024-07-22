import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'
import { mockDataContacts } from '../../data/mockData';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useNavigate } from 'react-router-dom/dist';
import AddEnquiryForm from './Froms/AddEnquiryForm';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import { Button } from '@mui/material';
import moment from 'moment';
import { GetAllEnquiry } from '../../../Store/Actions/Dashboard/Customer/CustomerActions';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import axios from 'axios';
import CustomerView from './View/CustomerView';
const ManageEnquiry = () => {
    const navigate = useNavigate()

    // const [Block, setBlock] = useState(false)
    const { data, isLoading } = useSelector(state => state.GetAllEnquiryReducer)
    const dispatch = useDispatch()
    const [update, setUpdate]=useState([]);
    // const [viewModal, setViewModel] = useState(false)


    useEffect(() => {
        dispatch(GetAllEnquiry())
    }, []);
    
    const GetDeleteByID = (mobileNo) => {
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
                const response = await axios.delete(API_URL + '/enquiry/delete/' + mobileNo)
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    dispatch(GetAllEnquiry())
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
                NewData.push({ ...item, _id: data.indexOf(item), date: moment(item.createdAt).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }


    // const [blockStatus, setBlockStatus] = useState({});

    // Set initial block status when data changes
    // useEffect(() => {
    //     if (data.data && data.data.length > 0) {
    //         const initialBlockStatus = {};
    //         data.data.forEach(item => {
    //             initialBlockStatus[item.user_id] = item.is_block;
    //         });
    //         setBlockStatus(initialBlockStatus);
    //     }
    // }, [data]);


    // const handleToggleBlock = (userId) => {
    //     const newBlockStatus = !blockStatus[userId]; // Toggle the block status
    //     // Make API call to update block status on the serve

    //     const actionText = newBlockStatus ? 'Un-Block' : 'Block';
        
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: `You won't be able to ${actionText}!`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: `Yes, ${actionText} it!`
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             // Toggle the block status
    //     // Make API call to update block status on the server
    //     axios.post(`${API_URL}/customer/block/${userId}`, { is_block: newBlockStatus })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 Swal.fire(
    //                     `${actionText} Successful`,
    //                     `User has been ${actionText}ed.`,
    //                     'success'
    //                 );
    //                 // Update local state if API call is successful
    //                setBlockStatus(prevBlockStatus => ({
    //                     ...prevBlockStatus,
    //                     [userId]: newBlockStatus,
    //                 }));
    //             } else {
    //                 // Handle error if API call fails
    //                 Swal.fire({
    //                     title: 'failed to delete try again',
    //                     icon: "error",
    //                 })
    //                 console.error('Failed to update block status');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error updating block status:', error);
    //         });

               
    //         }
    //     })
    // };


    
    // const toggleView = (data) =>{
    //     setUpdate(data);
    //     setViewModel(!viewModal)
    // }







    const column = [
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "date", headerName: "Date",flex: 1, minWidth: 120, editable: true },
        { field: "service", headerName: "Date",flex: 1, minWidth: 120, editable: true },
        { field: "name", headerName: "Name",flex: 1, minWidth: 120, editable: true },
        { field: "mobileNo", headerName: "Mobile No.",flex: 1, minWidth: 120, editable: true },
        { field: "email", headerName: "Email",flex: 1, minWidth: 350, editable: true },
        { field: "refName", headerName: "Refrence",flex: 1, minWidth: 250, editable: true },
        // {
        //     field: "referby", headerName: "Refer By", renderCell: (parmas) => (
        //         <div className='p-1 px-2 bg-blue text-white rounded-2 cursor-p'>Direct Enquiry</div>
        //     ), minWidth: 150, editable: true
        // },
        // {
        //     field: "status", headerName: "Status", renderCell: (parmas) => (
        //         <div className='p-1 px-2 bg-red text-white rounded-2 cursor-p'>On-Hold</div>
        //     ), minWidth: 140, editable: true
        // },
        // { field: "aadhaarNumber", headerName: "Aadhaar No.", minWidth: 120, editable: true },
        // { field: "email", headerName: "Email", minWidth: 120, editable: true },
        // { field: "address", headerName: "Address", minWidth: 250, editable: true },

        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">

                    <Button variant='contained' color='primary'
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    onClick={(e)=>(
                        editEnquiry(params.row)
                    )}
                    ><BorderColorIcon /></Button>

                    {/* <Button variant="contained" color="success"
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    onClick={(e)=>{toggleView(params.row)}}

                    >
                        <VisibilityIcon />
                    </Button> */}
                    <Button variant="contained" color="error"
                    onClick={(e)=>(
                        GetDeleteByID(params.row.id)
                    )}
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    >
                        <DeleteForeverIcon />
                    </Button>
                </div>
            ),
        },
        // {
        //     field: "block",
        //     headerName: "Block",
        //     minWidth: 150,
        //     renderCell: (params) => (
        //         <div className="d-flex gap-2">
        //             {blockStatus[params.row.user_id] ?
        //                <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.user_id)}
        //                style={{minWidth: "40px", maxWidth: "40px"}}
        //                ><BlockIcon /></Button>
        //                 :
        //                 <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.user_id)}
        //                 style={{minWidth: "80px", maxWidth: "80px"}}
        //                 >Un-Block</Button>
        //             }
               
        //         </div>
        //     ),
        // },

        // {
        //     field: "enquiryAction", headerName: "Enquiry Action", renderCell: (params) => (
        //         <select
        //             className="p-2 border bg-light"
        //             style={{ borderRadius: "5px", outline: "none", cursor: "pointer" }}
        //         >
        //             <option value="Cancel">Action</option>
        //             <option value="Converted">Converted</option>
        //             <option value="Canel">Cancel</option>
        //             <option value="Continue">Continue</option>
        //         </select>
        //     ), minWidth: 180, editable: true
        // },
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
    // Add service provider controller 
    const [addCustomer, setAddCustomer] = useState(false)

    const ToggleAddCustomer = () => {
        setAddCustomer(!addCustomer)
        if (addCustomer) {
            setUpdate(null); // Reset editData when closing masterAddService
        }
    };
    
    const editEnquiry = (data) =>{
        setUpdate(data)
        ToggleAddCustomer()
    }

    return (
        <Fragment>
            <ModalComponent modal={addCustomer} toggle={ToggleAddCustomer} data={<AddEnquiryForm toggle={ToggleAddCustomer}  data={update}/>} modalTitle={update ? "Edit Enquiry" : "Add New Enquiry"} size={"lg"} scrollable={true} />

            {/* <ModalComponent
                data={<CustomerView 
                data={update} toggleModal={toggleView} />}
                modalTitle={"Customer Profile"}
                modal={viewModal}
                toggle={toggleView}
                size={"xl"} scrollable={true}
            /> */}

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}> Enquiry List </h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={ToggleAddCustomer} >
                Add New Enquiry
                </div>
            </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data.data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageEnquiry