import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'
import { mockDataContacts } from '../../data/mockData';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useNavigate } from 'react-router-dom/dist';
import AddNewCustomerForm from './Froms/AddNewCustomerForm';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import { Button } from '@mui/material';
import moment from 'moment';
import { GetAllEnquiry } from '../../../Store/Actions/Dashboard/Customer/CustomerActions';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageEnquiry = () => {
    const navigate = useNavigate()

    const [Block, setBlock] = useState(false)
    const { data, isLoading } = useSelector(state => state.GetAllEnquiryReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetAllEnquiry())
    }, []);
    
    const GetDeleteByID = (id) => {
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
                const response = await axios.get(API_URL + '/delete/customer/' + id)
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
                let newCustomer = item.NewCustomer;
                let mergedItem = {...item, ...newCustomer};
                NewData.push({ ...mergedItem, _id: data.indexOf(item), date: moment(item.createdAt).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }


    const [blockStatus, setBlockStatus] = useState({});

    // Set initial block status when data changes
    useEffect(() => {
        if (data.data && data.data.length > 0) {
            const initialBlockStatus = {};
            data.data.forEach(item => {
                initialBlockStatus[item.user_id] = item.is_block;
            });
            setBlockStatus(initialBlockStatus);
        }
    }, [data]);


    const handleToggleBlock = (userId) => {
        const newBlockStatus = !blockStatus[userId]; // Toggle the block status
        // Make API call to update block status on the server
        axios.post(`${API_URL}/customer/block/${userId}`, { is_block: newBlockStatus })
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






    const column = [
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "date", headerName: "Date", minWidth: 120, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "mobileno", headerName: "Mobile No.", minWidth: 120, editable: true },
        { field: "email", headerName: "Email", minWidth: 350, editable: true },
        { field: "refrence", headerName: "Refrence", minWidth: 250, editable: true },
        {
            field: "referby", headerName: "Refer By", renderCell: (parmas) => (
                <div className='p-1 px-2 bg-blue text-white rounded-2 cursor-p'>Direct Enquiry</div>
            ), minWidth: 150, editable: true
        },
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
            minWidth: 220,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button variant='contained' color='primary'><BorderColorIcon /></Button>
                    <Button variant="contained" color="success">
                        <VisibilityIcon />
                    </Button>
                    <Button variant="contained" color="error"
                    onClick={(e)=>(
                        GetDeleteByID(params.row.id)
                    )}
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
                    {blockStatus[params.row.user_id] ?
                       <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.user_id)}><BlockIcon /></Button>
                        :
                        <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.user_id)}>Un-Block</Button>
                    }
               
                </div>
            ),
        },

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
    const ToggleAddCustomer = () => setAddCustomer(!addCustomer)
    return (
        <Fragment>
            <ModalComponent modal={addCustomer} toggle={ToggleAddCustomer} data={<AddNewCustomerForm />} modalTitle={"Add New Customer"} size={"xl"} scrollable={true} />
            
            <h4 className='p-3 px-4 mt-3 bg-transparent headingBelowBorder text-white' style={{ maxWidth: "fit-content" }}>Enquiry List</h4>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>

                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis Fw_500 d-flex align-items-center justify-content-center text-white`} onClick={ToggleAddCustomer} style={{ minWidth: "15rem", maxWidth: "15rem" }} >
                    Add New Enquiry
                </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data.data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageEnquiry