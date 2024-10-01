import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom/dist';
import AddNewCustomerForm from './Froms/AddNewCustomerForm';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCustomers } from '../../../Store/Actions/Dashboard/Customer/CustomerActions';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BlockIcon from '@mui/icons-material/Block'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Button } from '@mui/material';
import UpdateCustomerForm from './Froms/UpdateCustomerForm';
import CustomerView from './View/CustomerView';
import PrintCustomer from './View/PrintCustomer';
import { useReactToPrint } from 'react-to-print';


const ManageCustomer = () => {
    const navigate = useNavigate()

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
                const response = await axios.get(API_URL + '/customer/delete/' + user_id)
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    dispatch(GetAllCustomers())
                } else {
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                }
            }
        })
    }

    
    const dispatch = useDispatch()
    const { data, isLoading } = useSelector(state => state.GetAllCustomerReducer)
    const [isBlocked, setIsBlocked] = useState({})
    const [update, setUpdate]=useState([]);
    const [viewModal, setViewModel] = useState(false)
    const [print, setPrint] = useState(false)

    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                let newCustomer = item.NewCustomer;
                let mergedItem = {...item, ...newCustomer};
                const paddedId = String(item.id).padStart(6, '0');
                NewData.push({
                    ...mergedItem,
                    id: data.indexOf(item),
                    date: moment(item.createdAt).format("DD-MM-YYYY"),
                    member_id: (!item.member_id) 
                    ? 'NM' + paddedId 
                    : item.member_id
                });

            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }
    
    const [blockStatus, setBlockStatus] = useState({});
    const [isMember, setIsmember] = useState(false)

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
        axios.post(`${API_URL}/customer/block/${userId}`, { is_block: newBlockStatus })
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

    useEffect(() => {
        dispatch(GetAllCustomers())
    }, [])

    const GetUpdateCustomer=(data)=>{
        setUpdate(data)
        ToggleUpdateCustomer();
    }

    const toggleView = (data) =>{
        setUpdate(data);
        setViewModel(!viewModal)
    }

    const [printCustomerData, setPrintCustomerData] = useState([]);

    const PrintCustomerButton = (data) =>{
        setPrintCustomerData(data);
    }

    const customerRef = useRef(null);
  
    const handlePrint = useReactToPrint({
      content: () => customerRef.current,
      onAfterPrint: () => setPrintCustomerData([])
    });

    const NonMemberSample = () => {
        setIsmember(!isMember)
    }

    useEffect(()=> {
        if(isMember) {
            handlePrint();
        }
    }, [isMember])
    
  
    useEffect(()=>{
      if (printCustomerData && Object.keys(printCustomerData).length > 0) {
        handlePrint();
      }
    }, [printCustomerData])

    

    const column = [
        { field: "id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "member_id", headerName: "Member Id", minWidth: 120, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "mobileno", headerName: "Mobile No.", minWidth: 120, editable: true },
        { field: "email", headerName: "Email", minWidth: 250, editable: true },
        { field: 'age', headerName: "Age" },
        { field: "date", headerName: "To Date.", minWidth: 120, editable: true },
        { field: "aadhar_no", headerName: "Aadhaar No.", minWidth: 120, editable: true },
        { field: "address", headerName: "Address", minWidth: 250, editable: true },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            renderCell: (params) => (

                <div className="d-flex gap-2">
                <Button variant='contained' color='primary' onClick={(e)=>{GetUpdateCustomer(params.row)}}
                    style={{minWidth: "40px", maxWidth: "40px"}}
                    ><BorderColorIcon /></Button>

                <Button variant="contained" color="success" 
                onClick={(e)=>{toggleView(params.row)}}
                style={{minWidth: "40px", maxWidth: "40px"}}
                >
                    <VisibilityIcon />
                </Button>

                <Button variant="contained" color="primary" 
                onClick={(e)=>{PrintCustomerButton(params.row)}}
                style={{minWidth: "40px", maxWidth: "40px"}}
                >
                    <LocalPrintshopIcon />
                </Button>

                <Button  onClick={(e) => {
                        GetDeleteByID(params.row.user_id)
                    }} variant="contained" color="error"
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
            minWidth: 150,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    {blockStatus[params.row.user_id] ?
                       <Button variant="contained" color="error" onClick={() => handleToggleBlock(params.row.user_id)} 
                       style={{minWidth: "40px", maxWidth: "40px"}}
                       ><BlockIcon /></Button>
                        :
                        <Button className="text-white bg-warning border-warning" onClick={() => handleToggleBlock(params.row.user_id)}>Un-Block</Button>
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

    // Add service provider controller 
    const [addCustomer, setAddCustomer] = useState(false)
    const [updateCustomer, setUpdateCustomer]=useState(false)
    const ToggleAddCustomer = () => setAddCustomer(!addCustomer)
    const ToggleUpdateCustomer = () => setUpdateCustomer(!updateCustomer)

    return (
    <>
        <div style={{ display: 'none' }}>
        <PrintCustomer ref={customerRef} data={printCustomerData} member={isMember} /> 
      </div>

        <Fragment>
            <ModalComponent modal={addCustomer} toggle={ToggleAddCustomer} data={<AddNewCustomerForm  prop={ToggleAddCustomer } />} modalTitle={"Add New Customer"} size={"xl"} scrollable={true} />

            <ModalComponent
                data={<CustomerView 
                data={update} toggleModal={toggleView} />}
                modalTitle={"Customer Profile"}
                modal={viewModal}
                toggle={toggleView}
                size={"xl"} scrollable={true}
            />

   
            <ModalComponent modal={updateCustomer} toggle={ToggleUpdateCustomer} data={<UpdateCustomerForm  prop={ToggleUpdateCustomer } updateData={update} />} modalTitle={"Update Customer"} size={"xl"} scrollable={true} />

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}> Customer List </h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={ToggleAddCustomer} >
                Add New Customer
                </div>

                {/* <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center w-full `}  onClick={handlePrint} >
                Member Sample 
                </div>
                
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={NonMemberSample} >
                 Non Member Sample
                </div> */}

            </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data.data)} columns={column} CustomToolbar={CustomToolbar} loading={isLoading} />
            </div>
        </Fragment>
        </>
    )
}


export default ManageCustomer