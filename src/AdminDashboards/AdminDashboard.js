import React, { Fragment, useState, useRef } from "react";
import "./AdminDashboard.css";
import { DataGrid, GridToolbar, GridToolbarDensitySelector, GridToolbarExportContainer, GridToolbarFilterButton, GridToolbarQuickFilter,GridToolbarColumnsButton } from "@mui/x-data-grid";
import StackBox from "./Elements/StackBox";
import { Form, Row, Col, Card, FormGroup, Label, Input,Table, Modal,
  ModalHeader, ModalBody } from 'reactstrap';
// import { columns } from "./GridTableCredentials/Colums";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import { UseStateManager } from "../Context/StateManageContext";
import AnimatedBackground from "./Elements/AnimatedBacground";
import AdminNavItems from "./Elements/AdminNavItems";
import AdminDataTable from "./Elements/AdminDataTable";
import ColoredBtn from "./Elements/ColoredBtn";
import { useUserRoleContext } from "../Context/RolesContext";
import { FiPlusSquare } from "react-icons/fi";
import ModalComponent from "./Elements/ModalComponent";
import AddOrderForm from "./Components/Dashboard/AddOrderForm";
import CancelOrderForm from "./Components/Dashboard/CancelOrderForm";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import GetAllOrders from "../Store/Actions/Dashboard/Orders/OrderAction"
import { useEffect } from "react";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import axios from "axios";
import UpdateOrderForm from "./Components/Dashboard/UpdateOrderForm";
import TransferOrderForm from "./Components/Dashboard/TransferOrderForm";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import SelectBox from "./Elements/SelectBox";
import { GetAllInventry, GetAllAllotedItems } from "../Store/Actions/Dashboard/InventryAction";
import { AssignSupervisorModal,AssignServiceProviderModal,AddComplainModal,AddAmount,SuperAdminRemarkModal,AdminRemarkModal,BackOfficeRemarkModal,AllotItemModal,AddInventryModal } from "../Components/Modal";
import { useAuth } from "../Context/userAuthContext";
import { ServiceProviderRemarkModal } from "../Components/Modal";
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Invoice from "../Components/Invoice";
import MemberInvoice from "../Components/MemberInvoice";
import { useReactToPrint } from 'react-to-print';
import Invoice2 from "../Components/Invoice2";


const AdminDashboard = () => {
  const { rows, Show, setShow } = UseStateManager();
  const { userRole } = useUserRoleContext();
  const { currentUser, setCurrentUser } = useAuth();
  const [role, setRole] = useState(userRole.role || '');
  const dispatch = useDispatch();
  const token = currentUser.token
  
  const {  data: orders, isLoading: isOrderLoading} = useSelector(state => state.GetAllOrderReducer);
  const { data: inventories, isLoading: isInventoryLoading } = useSelector(state => state.GetAllInventryReducers);

  const { data: allotedItem, isLoading: isAllotedItemsLoading } = useSelector(state => state.GetAllAllotedItemReducers);


  useEffect(() => {
    if (role === "service" || role === "supervisor") {
      const status = undefined;
      dispatch(GetAllOrders(status, currentUser.id, role));
    } else {
      dispatch(GetAllOrders());
    }
  }, [role, currentUser.id, dispatch]);

  useEffect(() => {
    dispatch(GetAllInventry())
    dispatch(GetAllAllotedItems())
  }, []);

  const [totalSummary, setTotalSummary] = useState([])
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [orderDate, setOrderDate] = useState(null)

  const GetTotalSummary = async () =>{
    const res = await axios.get(`${API_URL}/order/filter-order?from=${from}&to=${to}`);
   if(res.status === 200){
    setTotalSummary(res.data.data)
   }
    }

  useEffect(() => {
    GetTotalSummary()
  }, [orders]);
 
  const status= [
  {0: "Pending"},
  {1: "Hold"},
  {2: "Due"},
  {3: "Completed"},
  {4: "Running"},
  {5: "Cancel"}
  ]

  function getStatusByKey(key) {
  for (let i = 0; i < status.length; i++) {
    if (status[i].hasOwnProperty(key)) {
      return status[i][key];
    }
    }
    return "Status not found";
  }

  const DataWithID = (data) => {
    const NewData = [];
    if (data !== undefined) {
      for (let item of data) {
        const NewCustomer = item.NewCustomer || {}; // Ensure NewCustomer is an object
        const customer = NewCustomer.customer || {}; // Ensure customer is an Object
        const mergedItem = { ...item, ...NewCustomer, ...customer };
        const paddedId = String(customer.user_id).padStart(6, '0');
        NewData.push({
          ...mergedItem,
          pending: getStatusByKey(item.pending),
          _id: data.indexOf(item),
          date: moment(item.createdAt).format("D / M / Y"),
          bookdate: moment(item.bookdate).format("DD-MM-YYYY"),
          userRole: userRole,
          member_id: (!customer.member_id) 
                    ? 'NM' + paddedId 
                    : customer.member_id
        });
      }
    } else {
      NewData.push({ id: 0 });
    }
    return NewData;
  }; 

  const [cancel, setCancel]=useState(false);
  const [update, setUpdate]=useState(false);
  const [transfer, setTransfer]=useState(false)

  const toggleAddOrders = () => {
    setShow(!Show);
    if (Show) {
      setMobileNo('');
    }
  };

  const toggleCancelOrder= () => setCancel(!cancel);
  const toggleUpdateOrder = () => setUpdate(!update)
  const toggleTransferOrder= () => setTransfer(!transfer)
  const [inventryData, SetInventryData ] = useState([]);
  const [orderData, setOrderData] = useState([])

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

  const InventryToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <GridToolbarDensitySelector />
        <div
          onClick={ () => {
            setAddInventryModalOpen(!AddInventryModalOpen);
            SetInventryData('');
           }}
          style={{ color: "#ffffff" }}
          className="cursor-p "
        >
          <FiPlusSquare /> ADD ITEMS
        </div>
        <div
          onClick={()=>setAllotedItems(!allotedItems)}
          style={{ color: "#ffffff" }}
          className="cursor-p "
        >
          <FiPlusSquare /> ALLOTED ITEMS
        </div>
      </GridToolbarContainer>
    );
  };

  const [cellColor, setCellColor] = useState(null);

  const getRowClassName = (params) => {
    const status = params.row.status;
    if (status === "Complete") {
      return "complete-cell";
    } else if (status === "Running") {
      return "running-cell";
    } else if (status === "Cancel") {
      return "cancel-cell";
    } else if (status === "Hold") {
      return "hold-cell";
    } else if (status === "Due") {
      return "due-cell";
    } else if (status === "Pending") {
      return "pending-cell";
    }
    return "";
  };

  const OrderDeleteByID = (orderNo) => {
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
          const response =  await axios.get(`${API_URL}/order/delete/${orderNo}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
          if (response.status === 200) {
              Swal.fire(
                  'Deleted!',
                  'Your Order has been deleted.',
                  'success'
              )
              dispatch(GetAllOrders())
          } else {
              Swal.fire({
                  title: 'failed to delete try again',
                  icon: "error",
              })
          }
      }
  })
  };

  const [OrderNo, SetOrderNo]=useState('')
  const [assignSupervisorData, setAssignSupervisorData]=useState([])
  const [registerId, SetRegisterId]=useState('')

  const OrderCancel = (orderNo,registerId) =>{
    SetOrderNo(orderNo)
    SetRegisterId(registerId)
    toggleCancelOrder()
  }

  const OrderUpdate = (orderData)=> {
    // SetOrderNo(orderNo)
    // SetRegisterId(registerId)
    setOrderData(orderData)
    toggleUpdateOrder()
  }

  const OrderHold = (orderNo) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Hold this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hold it!'
  }).then(async (result) => {
      if (result.isConfirmed) {
          const response = await axios.put(API_URL + '/order/assign/' + orderNo,{pending: 1},
            {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          }
          )
          if (response.status === 200) {
              Swal.fire(
                  'Hold!',
                  'Your Order has been Hold.',
                  'success'
              )
              if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser.id, role));
              } else {
                dispatch(GetAllOrders());
              }
          } else {
              Swal.fire({
                  title: 'failed to hold try again',
                  icon: "error",
              })
          }
      }
  })
  };

  const OrderTransfers = (order_no)=>{
    toggleTransferOrder();
    SetOrderNo(order_no)
  }

  const GetFilterOrder = (status) =>{
    setInventry(false);
    setSummary(false);
    setComplain(false);
    if(role){
      dispatch(GetAllOrders(status,currentUser.id, role))
    }else{
      dispatch(GetAllOrders(status))
    }
    
  }

  const OrderComplete= (orderNo, piadamt, totalamt) =>{


    if(piadamt==null && totalamt==null){
      Swal.fire({
        title: 'failed to Completed, Please Add Amount',
        icon: "error",
    })
    return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Complete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Completed it!'
  }).then(async (result) => {
      if (result.isConfirmed) {
          const response = await axios.get(`${API_URL}/order/complete/${orderNo}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
          if (response.status === 200) {
              Swal.fire(
                  'Completed!',
                  'Your Order has been Completed.',
                  'success'
              )
              if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser.id, role));
              } else {
                dispatch(GetAllOrders());
              }
          } else {
              Swal.fire({
                  title: 'failed to Completed try again',
                  icon: "error",
              })
          }
      }
  })

  }

  const handleDeleteInventry = (itemID)=>{
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
          const response = await axios.delete(API_URL + '/inventry/delete/' + itemID)
          if (response.status === 200) {
              Swal.fire(
                  'Deleted!',
                  response.data.message,
                  'success'
              )
              dispatch(GetAllInventry())
          } else {
              Swal.fire({
                  title: 'failed to delete try again',
                  icon: "error",
              })
          }
      }
  })


  }

  const Inventrycolumns = [
    { field: "_id", headerName: "Sr No.", minWidth: 200,  editable: false},
    { field: "item", headerName: "Name", minWidth: 220,  editable: false },
    { field: "qty", headerName: "Quantity", minWidth: 220,  editable: false },
    {
      field: "action",
      headerName: "Action",
      minWidth: 400,
      renderCell: (params) => (
          <div className="d-flex gap-2">
              <Button variant='contained' color='primary' onClick={() =>{ setallotItemModalOpen(!allotItemModalOpen);
              SetInventryData(params.row)
              }
              }>Allot</Button>
              <Button variant="contained" color="success"
               onClick={() => {
                setAddInventryModalOpen(!AddInventryModalOpen);
                SetInventryData(params.row);
            }}
                >

                Update Stock
              </Button>
              <Button onClick={() => handleDeleteInventry(params.row.id)} variant="contained" color="error">
                  <DeleteForeverIcon />
              </Button>
          </div>
      ),
  },
  ]
  const AllotedItemsCollums = [
    { field: "_id", headerName: "Sr No.  ", minWidth: 200,  editable: false },
    { field: "allotdate", headerName: "Date", minWidth: 220,  editable: false },
    { field: "spname", headerName: "Item", minWidth: 220,  editable: false },
    { field: "item", headerName: "Alloted To", minWidth: 220,  editable: false },
    { field: "aqty", headerName: "Quantity", minWidth: 220,  editable: false },
    { field: "remark", headerName: "Remark", minWidth: 220,  editable: false }
  ]
  const [modalTitle, setModalTitle] = useState('Add Order');
  const [summary, setSummary] = useState(false);
  const [inventry, setInventry] =useState(false);
  const [complain, setComplain]=useState(false);
  const [memberType, setMemberType]=useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [complainModalOpen, setComplainModalOpen]=useState(false);
  const [supervisorModalOpen, setsupervisorModalOpen] = useState(false);
  const [serviceProviderModalOpen, setserviceProviderModalOpen] = useState(false);
  const [AmountModalOpen, setAmountModalOpen] = useState(false);
  const [superAdminRemarkModalOpen, setSuperAdminRemarkModalOpen] = useState(false);
  const [adminRemarkModalOpen, setAdminRemarkModalOpen] = useState(false);
  const [superProviderRemarkModalOpen, setSuperProviderRemarkModalOpen] = useState(false);
  const [backOfficeRemarkModalOpen, setbackOfficeRemarkModalfunction] = useState(false);
  const [allotedItems,setAllotedItems]=useState(false);
  const [allotItemModalOpen, setallotItemModalOpen]=useState(false)
  const [AddInventryModalOpen, setAddInventryModalOpen] = useState(false)
  const [customerTypeOpen, setCustomerTypeOpenFunction] =useState(false)
  const [errors, setErrors] = useState([])
  const customerTypeOpenFunction = () =>setCustomerTypeOpenFunction(!customerTypeOpen)
  const [adminAprove, setAdminAprove] = useState(false)

  const GetSubmmary = ()=>{
    setSummary(true)
    setInventry(false);
    setComplain(false);
  }
  
  const GetInventry = ()=> {
    setInventry(true)
    setSummary(false)
    setComplain(false);
  }

  const AddNewComplain = ()=>{
    setComplain(true);
    setSummary(false)
    setInventry(false);
  } 

  const HandleComplainBook = ()=>{
    setComplainModalOpen(true)
  }

  const AssignSupervisor = (order_no, date, time_range, service_name) => { 
    setAssignSupervisorData({ order_no, date, time_range, service_name});
    setsupervisorModalOpen(!supervisorModalOpen);
}


  const AssignServiceProvider = (order_no, bookdate) => { 
    SetOrderNo(order_no)
    setserviceProviderModalOpen(!serviceProviderModalOpen)
    setOrderDate(bookdate)
  }

  const AssignAmount = (order_no) => { 
    SetOrderNo(order_no)
    setAmountModalOpen(!AmountModalOpen)
  }

  const SuperAdminRemark = (order_no, admin_approve) => { 
    SetOrderNo(order_no)
    setAdminAprove(admin_approve)
    setSuperAdminRemarkModalOpen(!superAdminRemarkModalOpen)
  }

  const ServiceProviderRemark = (order_no) => { 
    SetOrderNo(order_no)
    setSuperProviderRemarkModalOpen(!superProviderRemarkModalOpen)
  }

  const AdminRemark = (order_no) => { 
    SetOrderNo(order_no)
    setAdminRemarkModalOpen(!adminRemarkModalOpen)
  }

  const backOfficeRemark = (order_no) => { 
    SetOrderNo(order_no)
    setbackOfficeRemarkModalfunction(!backOfficeRemarkModalOpen)
  }

  const check_in = async (order_no) => {
    
      const formData = {
        pending: 4,
        checkintime: moment(new Date()).format('DD/MM/YYYY, h:mm A')
      }
      const apiUrl =  `${API_URL}/order/assign/${order_no}`;;
      // Make a POST request using Axios
      axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
          Swal.fire('Successfully!', "Order Is on Running", 'success')
          if (role === "service" || role === "supervisor") {
            const status = undefined;
            dispatch(GetAllOrders(status, currentUser.id, role));
          } else {
            dispatch(GetAllOrders());
          }
        } else {
          Swal.fire({title:  response.data.message, icon: "error"})
        } 			
      }).catch(error => {
        console.error('Error:', error);
      });
  };
  const check_out = async (order_no, piadamt, totalamt) =>{
  
    if(piadamt==null && totalamt==null){
      Swal.fire({
        title: 'failed to Completed, Please Add Amount',
        icon: "error",
    })
    return;
    }
    
      const formData = {
        pending: 3,
        checkouttime: moment(new Date()).format('DD/MM/YYYY, h:mm A')
      }
      const apiUrl =  `${API_URL}/order/assign/${order_no}`;;
      // Make a POST request using Axios
      axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
          Swal.fire('Successfully!', "Your Order has been Completed!", 'success')
          if (role === "service" || role === "supervisor") {
            const status = undefined;
            dispatch(GetAllOrders(status, currentUser.id, role));
          } else {
            dispatch(GetAllOrders());
          }
        } else {
          Swal.fire({title:  response.data.message, icon: "error"})
        } 			
      }).catch(error => {
        console.error('Error:', error);
      });
  };
  
  const columns = [
    {
      field: "Status",
      headerName: "Status",
      renderCell: (params) => {
          const { pending, order_no, piadamt, totalamt, checkintime, checkouttime } = params.row;
  
          let checkInLabel = '';
          let checkInColor = '';
          let checkInHandler = null;
  
          let checkOutLabel = '';
          let checkOutColor = '';
          let checkOutHandler = null;
  
          // Determine Check In button state
          if (!checkintime) {
              checkInLabel = 'Check In';
              checkInColor = 'yellow';
              checkInHandler = () => check_in(order_no);
          } else {
              checkInLabel = `Update Check In ${checkintime}`;
              checkInColor = 'green';
              checkInHandler = null; // Disable clicking for updated check-in
          }
  
          // Determine Check Out button state
          if (checkintime && !checkouttime) {
              checkOutLabel = 'Check Out';
              checkOutColor = 'red';
              checkOutHandler = () => check_out(order_no, piadamt, totalamt);
          } else if (checkouttime) {
              checkOutLabel = `Update Check Out ${checkouttime}`;
              checkOutColor = 'green';
              checkOutHandler = null; // Disable clicking for updated check-out
          }
  
          return (
              <div className="d-flex flex-row align-items-center">
                  <p
                      className="justify-content-center align-items-center mr-2"
                      style={{
                          width: "140px",
                          backgroundColor: checkInColor,
                          borderRadius: "5px",
                          cursor: checkInHandler ? "pointer" : "default",
                          whiteSpace: "normal",
                          textAlign: "center", 
                          fontSize: "10px",
                          padding: !checkintime ? "12px" : "5px",
                          color: !checkintime ? "black" : "white", // Corrected this line
                      }}
                      onClick={checkInHandler}
                  >
                      {checkInLabel}
                  </p>
                  {checkOutLabel && (
                      <p
                          className="d-flex justify-content-center align-items-center"
                          style={{
                              width: "140px",
                              backgroundColor: checkOutColor,
                              borderRadius: "5px",
                              cursor: checkOutHandler ? "pointer" : "default",
                              whiteSpace: "normal", // Allow wrapping
                              textAlign: "center", // Center text
                              fontSize: "10px",
                              padding: !checkouttime ? "12px" : "5px",
                              color: "white"
                          }}
                          onClick={checkOutHandler}
                      >
                          {checkOutLabel}
                      </p>
                  )}
              </div>
          );
      },
      minWidth: 300,
      editable: false,
    },
    {
        field: "action",
        headerName: "Action",
        renderCell: (params) => (
            <select
                className="p-2 border-0"
                style={{ borderRadius: "5px", outline: "none", cursor: "pointer" }}
            >
                <option value="Cancel">Cancel</option>
                <option value="Transfer">Transfer</option>
                <option value="Hold">Hold</option>
                <option value="Complete">Complete</option>
                <option value="Edit">Edit</option>
                
            </select>
        ),
        minWidth: 150,
        editable: false,
    },
    { field: "name", headerName: "Customer Name",minWidth: 150,  editable: false },
    { field: "alterno", headerName: "Alternate No",minWidth: 150,  editable: false },
    { field: "member_id", headerName: "Member ID", minWidth: 120,  editable: false,  },
    { field: "order_no", headerName: "Order Number", minWidth: 120,  editable: false },
    { field: "mobileno", headerName: "Mobile",minWidth: 150,  editable: false },
    { field: "service_address", headerName: "Service Address",minWidth: 150,  editable: false },
    { field: "user_type", headerName: "Type", minWidth: 80,  editable: false },
    { field: "service_name", headerName: "Service Type",minWidth: 150,  editable: false },
    { field: "booktime", headerName: "Booking Time", minWidth: 120,  editable: false },
    { field: "bookdate", headerName: "Booking Date", minWidth: 120,  editable: false },
    { field: "problem_des", headerName: "Service Description ", minWidth: 150,  editable: false, renderCell: (params) => (
        <Tooltip title={params.value}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {params.value}</div>
        </Tooltip>
    ) },   
    { field: "allot_time_range", headerName: "Alloted Time Slot ", minWidth: 150,  editable: false },

    { field: "suprvisor_id", headerName: "Supervisor",
    renderCell: (params) => ( 
        <>
        {
        params?.row?.pending !== "Completed" && params?.row?.pending !== "Cancel" ? (
          !params.row.suprvisor_id ? (
            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => AssignSupervisor(params.row.order_no, params.row.bookdate, params.row.allot_time_range, params.row.service_name)} 
              disabled={params?.row?.userRole?.role === "service"}
            >
              Supervisor
            </Button>
          ) : (
            params.row.suprvisor_id
          )
        ) :  params.row.suprvisor_id
      } </> ), minWidth: 200,  editable: false },

    { field: "servicep_id", headerName: "Service Provider",
    renderCell: (params) => ( 
        <>
        {
      params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        !params.row.servicep_id && params?.row?.userRole?.role !== "service"  ? (
       
          <Button variant='contained' color='primary' onClick={() => AssignServiceProvider(params.row.order_no, params.row.bookdate)} >
            Service Provider
          </Button>

        ) : (
          params.row.servicep_id
        )
      ) : params.row.servicep_id } </> ),
    minWidth: 200,  editable: false },

    // { field: "vehicle_inventory", headerName: "Vehicle Used",
    // renderCell: (params) => ( 
    //     <>
    //     {(!params.row.vehicle_inventory) ? (<><Button variant='contained' color='primary'> Choose Vehicle</Button></> ) : <>{params.row.vehicle_inventory} </> } </> ),
    //  minWidth: 200,  editable: false },
    { field: "netpayamt", headerName: "Billing Amount",
//     renderCell: (params) => ( 
//         <>
//         {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
//         (!params.row.netpayamt) ? (<><Button variant='contained' color='primary'  
// onClick={()=>AssignAmount(params.row.order_no)}
//         >Amount</Button></> ) : <>{params.row.netpayamt} </> ) : <>{params.row.netpayamt}</>
        
//         } </> ),
    minWidth: 150 },
    { field: "paymethod", headerName: "Payment Method", minWidth: 150},
    { field: "piadamt", headerName: "Paid Amount", minWidth: 150 },
    { field: "totalamt", headerName: "Balance Amount", minWidth: 150},
    { field: "cust_remark", headerName: "Customer Remark", minWidth: 150 },
    { field: "admin_remark", headerName: "Admin Remark", minWidth: 150 },
    { field: "bakof_remark", headerName: "Back Office Remark",
    renderCell: (params) => ( 
        <>
        { params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        (params.row?.userRole?.role==="office" && !params.row.bakof_remark) ? (
            <Tooltip title="Add a remark">
                <Button variant='contained' color='primary' onClick={()=>backOfficeRemark(params.row.order_no)}>Remark</Button>
            </Tooltip>
        ) : (
            <Tooltip title={params.row.bakof_remark}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {params.row.bakof_remark}
                </div>
            </Tooltip>
        )) : (
            <Tooltip title={params.row.bakof_remark}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {params.row.bakof_remark}
                </div>
            </Tooltip>
        )}
        </>
    ),
    minWidth: 180,  editable: false},

    { field: "suerv_remark", headerName: "Supervisor Remark",
    renderCell: (params) => ( 
        <>
        {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        
        (params?.row?.userRole?.role==="supervisor" && !params.row.suerv_remark) ? (
            <Tooltip title="Add a remark">
                <Button variant='contained' color='primary' onClick={()=>AdminRemark(params.row.order_no)}>Remark</Button>
            </Tooltip>
        ) : (
            <Tooltip title={params.row.suerv_remark}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {params.row.suerv_remark}
                </div>
            </Tooltip>
        )) : (
            <Tooltip title={params.row.suerv_remark}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {params.row.suerv_remark}
                </div>
            </Tooltip>
        )}
        </>
    ),
    minWidth: 150,  editable: false },

    { field: "servp_remark",
        headerName: "Service Provider Remark",

        renderCell: (params) => ( 
            <>
            {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
            (params.row?.userRole?.role==="service" && !params.row.servp_remark) ? (
                <Tooltip title="Add a remark">
                    <Button variant='contained' color='primary' onClick={()=>ServiceProviderRemark(params.row.order_no)}>Remark</Button>
                </Tooltip>
            ) : (
                <Tooltip title={params.row.servp_remark}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {params.row.servp_remark}
                    </div>
                </Tooltip>
            )) : (
                <Tooltip title={params.row.servp_remark}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {params.row.servp_remark}
                    </div>
                </Tooltip>
            )}
            </> 
        ),
        minWidth: 180,
         editable: false,
    },
    { field: "pending", headerName: "Order Status", minWidth: 150,  editable: false },
    { field: "cancle_reson", headerName: "Cancel Reason", minWidth: 150,  editable: false },
    { 
      field: "sueadmin_remark", 
      headerName: "Super Admin Remark",
      minWidth: 180, 
       editable: false,
      renderCell: (params) => ( 
        <Tooltip title={params.row.sueadmin_remark}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {params.row.sueadmin_remark}
          </div>
        </Tooltip>
      )
    },   
    { 
      field: "admin_approve", 
      headerName: "Final Status", 
      minWidth: 150, 
      editable: false,
      type: 'boolean',
      renderCell: (params) => {
        if (params.row?.userRole?.role === "super") {
          return (
            <Switch
              checked={params.row.admin_approve}
              onChange={(event) => {
                SuperAdminRemark(params.row.order_no, !params.row.admin_approve)             
              }}
              color="primary"
              size="small"
            />
          )
        } else{
          return params.row.admin_approve ? "Verified" : "Unverified"
        }
      },
      },
      { field: "memo", headerName: "Memo", minWidth: 150,  editable: false,
        renderCell: (params) => {
          return (
            <>
              <Button variant='contained' color='primary' onClick={() => handleMemo(params.row)}>
                Memo
              </Button>
            </>
            )
       },
      },
      { field: "invoice", headerName: "Invoice", minWidth: 150,  editable: false,
        renderCell: (params) => {
        if(params.row.admin_approve){
          return (
              <Button variant='contained' color='primary' onClick={() => handleInvoice(params.row)}>
                Invoice
              </Button>
            )
        }
       },
      }
  ];

  const handleComplain = () =>{
    let errors = {};
        if (!mobileNo) {
            errors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobileNo)) {
            errors.mobileNo = "Mobile number should be 10 digits";
        } else if (mobileNo.startsWith("1") || mobileNo.startsWith("2") || mobileNo.startsWith("3") || mobileNo.startsWith("4") || mobileNo.startsWith("5")) {
            errors.mobileNo = "This mobile number does not exist in India";
        }

        if (errors && Object.keys(errors).length === 0) {
        console.log("Form submitted successfully!");

        customerTypeOpenFunction()
        toggleAddOrders()
       
        } else {
        // Form is invalid, display validation errors
        console.log("Validation Errors:", errors);
        setErrors(errors);
        return false;
        }
  }


  const InvoiceRef = useRef(null);

  const [invoiceData, setInvoice] = useState([]);

  const handlePrint2 = useReactToPrint({
    content: () => InvoiceRef.current,
    onAfterPrint: () => setInvoice([])
  });
  
  const handleInvoice = (data) => {
    setInvoice(data);
  };

  useEffect(()=>{
    if (invoiceData && Object.keys(invoiceData).length > 0) {
      handlePrint2();
    }
  }, [invoiceData,handlePrint2 ])

  const nonMemberRef = useRef(null);
  const memberRef = useRef(null);
  const [memoData, setMemoData] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => (memoData.NewCustomer.customer.member_id == null) ? nonMemberRef.current : memberRef.current,
    onAfterPrint: () => setMemoData([])
  });
  
  const handleMemo = (data) => {
    setMemoData(data);
  };

  useEffect(()=>{
    if (memoData && Object.keys(memoData).length > 0) {
      handlePrint();
    }
  }, [memoData,handlePrint ])



  const UpdateDueOrder = async () => {
    try {
        const response = await axios.post(`${API_URL}/order/add-due-order`);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error updating due order:', error);
    }
  };

  useEffect(() => {
      UpdateDueOrder();
  }, []);
  
  
  return (
    <Fragment>

      <div style={{ display: 'none' }}>
        <Invoice ref={memberRef} data={memoData} /> 
        <Invoice2 ref={InvoiceRef} data={invoiceData} /> 
        <MemberInvoice ref={nonMemberRef} data={memoData} /> 
      </div>

    {supervisorModalOpen &&   <AssignSupervisorModal
        supervisorModalOpen={supervisorModalOpen}
        supervisorModalOpenFunction={() => setsupervisorModalOpen(!supervisorModalOpen)}
        assignSupervisorData={assignSupervisorData}
        GetAllOrders={GetAllOrders}
      /> }

      <AddInventryModal
        AddInventryModalOpen={AddInventryModalOpen}
        AddInventryModalOpenFunction={() => setAddInventryModalOpen(!AddInventryModalOpen)}
        data={inventryData}
        GetAllInventry={GetAllInventry}
      />

      <AllotItemModal
        allotItemModalOpen={allotItemModalOpen}
        allotItemModalfunction={() => setallotItemModalOpen(!allotItemModalOpen)}
        inventryData={inventryData}
      />

      <SuperAdminRemarkModal
        superAdminRemarkModalOpen={superAdminRemarkModalOpen}
        superAdminRemarkModalfunction={() => setSuperAdminRemarkModalOpen(!superAdminRemarkModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        adminAprove={adminAprove}
      />

      <BackOfficeRemarkModal
        backOfficeRemarkModalOpen={backOfficeRemarkModalOpen}
        backOfficeRemarkModalfunction={() => setbackOfficeRemarkModalfunction(!backOfficeRemarkModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
      />

      <AdminRemarkModal
        adminRemarkModalOpen={adminRemarkModalOpen}
        adminRemarkModalfunction={() => setAdminRemarkModalOpen(!adminRemarkModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
      />
      
      <AssignServiceProviderModal
        serviceProviderModalOpen={serviceProviderModalOpen}
        serviceProviderModalOpenFunction={() => setserviceProviderModalOpen(!serviceProviderModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
        date={orderDate}
      />

      <ServiceProviderRemarkModal
        superProviderRemarkModalOpen={superProviderRemarkModalOpen}
        superProviderRemarkModalOpenFunction={() =>  setSuperProviderRemarkModalOpen(!superProviderRemarkModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
      />

    {AmountModalOpen &&   <AddAmount
        AmountModalOpen={AmountModalOpen}
        AmountModalOpenFunction={() => setAmountModalOpen(!AmountModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
        GetTotalSummary={GetTotalSummary}
      />
    }
    
      <ModalComponent
        modalTitle={modalTitle}
        modal={Show}
        toggle={toggleAddOrders}
        data={<AddOrderForm prop={toggleAddOrders } GetAllOrders={GetAllOrders} role={role}
        currentUser={currentUser.id}  mobileNo={mobileNo}  setModalTitle={setModalTitle}/>}
        size={"xl"} scrollable={true}
      />

      <ModalComponent
        modalTitle={"Cancel Order"}
        modal={cancel}
        toggle={toggleCancelOrder}
        data={<CancelOrderForm  orderNo={OrderNo}  prop={toggleCancelOrder } GetAllOrders={GetAllOrders}  role={role}
        currentUser={currentUser.id}/>}
      />

      <ModalComponent
          modalTitle={"transfer Order"}
          modal={transfer}
          toggle={toggleTransferOrder}
          data={<TransferOrderForm  orderNo={OrderNo} prop={toggleTransferOrder } GetAllOrders={GetAllOrders}  role={role}/>}
        />

        <ModalComponent
        modalTitle={"Update Order"}
        modal={update}
        toggle={toggleUpdateOrder}
        data={<UpdateOrderForm  orderData={orderData} prop={toggleUpdateOrder } GetAllOrders={GetAllOrders} role={role}
        currentUser={currentUser.id}/>}
        size={"xl"} scrollable={true}
        />

      {customerTypeOpen &&   <Modal className="modal-dialog-centered"
          isOpen={customerTypeOpen}
          toggle={customerTypeOpenFunction}>
          <ModalHeader toggle={customerTypeOpenFunction}>
            Customer Type
          </ModalHeader>
              <ModalBody>
                <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label for="mobile">Mobile No <span style={{color: "red"}}>*</span></Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="number"
                          value={mobileNo}
                          placeholder="Mobile No"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {  
                                setMobileNo(value);  
                            }
                        }}
                        />
                        {errors?.mobileNo && (
                      <span className='validationError'>
                          {errors?.mobileNo}
                      </span>
                      )}
                </FormGroup>
                </Col>                        
              <Button variant='contained' color='primary' onClick={handleComplain}>Proceed Now</Button>
              </Row>
                </ModalBody>
              </Modal>
        }


      <div className="position-relative">
        <AnimatedBackground />
        <div className="BackgroundTopContents" style={{ overflowX: "hidden" }}>

          {userRole && userRole?.Dashboard ? <AdminNavItems /> : null}

          <h4 className="p-4 fs-5 Fw_600 text-white ">
            {userRole && userRole?.Dashboard ? "Analytics" : "Dashboard"}
          </h4>

          <div className="d-flex align-items-center justify-content-between w-100 px-4 pb-4">

            <ColoredBtn
              onClick={() => {
                setInventry(false);
                setSummary(false);
                setComplain(false);
                if(role){
                  const status =undefined
                  dispatch(GetAllOrders(status,currentUser.id , role))
                }else{
                  dispatch(GetAllOrders())
                }
              }}
              btnName={"All Orders"}
              bg={"cornflowerblue"}
              color={"black"}
            />

            <ColoredBtn
              onClick={() => {
                GetFilterOrder(3);
              }}
              btnName={"Complete Order"}
              bg={"#27ae60"}
              color={"black"}
            />

            <ColoredBtn
              onClick={() => {
                GetFilterOrder(4);
              }}
              btnName={"Running Order"}
              bg={"#f1c40f"}
              color={"black"}
            />

            <ColoredBtn
              onClick={() => {
                GetFilterOrder(5);
              }}
              btnName={"Cancel Order"}
              bg={"#95a5a6"}
              color={"black"}
            />

            <ColoredBtn
              onClick={() => {
                GetFilterOrder(1);
              }}
              btnName={"Hold Order"}
              bg={"#e74c3c"}
              color={"black"}
            />

            <ColoredBtn
              onClick={() => {
                GetFilterOrder(2);
              }}
              btnName={"Due Order"}
              bg={"#a29bfe"}
              color={"black"}
            />

          <ColoredBtn
            onClick={() => {
              GetFilterOrder(0);
            }}
            btnName={"Pending Order"}
            bg={"#e67e22"}
            color={"black"}
          />
            
          {/* <ColoredBtn
            onClick={() =>{
              AddNewComplain()
            }}
            btnName={"New Complain"}
            bg={"#f08080"}
            color={"black"}
          /> */}

            {(role !== "service" && role !== "supervisor") ?
            <> 
            <ColoredBtn
              onClick={() => {
                GetSubmmary();
              }}
              btnName={"Summary"}
              bg={"#ffa500"}
              color={"black"}
            />

              {/* <ColoredBtn
                onClick={() => {
                GetInventry()
              }}
                btnName={"Inventory"}
                bg={"#ffa500"}
                color={"black"}
              /> */}
            </> : null }
          </div>

          <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> All Order List</h4>

           
              <div className="AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end">
                <div
                  className="py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center"
                  style={{ minWidth: "18rem", maxWidth: "18rem" }}
                  onClick={() => customerTypeOpenFunction(!customerTypeOpen)}
                >
                  Add New Order
                </div>
              </div>
           
        </div>
          <div className="p-4 ">
          {!complain && !inventry && summary && 
          <Card className="p-4">
          <div className="">
          <h3>Order Summary</h3>
          <div className="flex flex-col justify-between w-full mb-3 ">
            <div className="flex justify-between gap-6 items-center">
                <label htmlFor="startDate">From:</label>
                <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e)=>setFrom(e.target.value)}/>
                <label htmlFor="endDate" className="mr-2">To:</label>
                <Input id="endDate" type="date" onChange={(e)=>setTo(e.target.value)}/>
                <Button className="btn btn-primary ml-3" size="small" onClick={GetTotalSummary}  variant="contained">Search</Button>
            </div>
        </div>     
          <Table striped>
              <thead>
                  <tr>
                      <th>Total Services</th>
                      <th>Monthly Service</th>
                      <th>Completed Service</th>
                      <th>Cancelled Service</th>
                      <th>Hold Service</th>
                      <th>Pending</th>
                      <th>Running</th>
                      <th>Due</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>{totalSummary?.totalOrders}</td>
                      <td>{totalSummary?.totalMonthlyService}</td>
                      <td>{totalSummary?.totalCompleted}</td>
                      <td>{totalSummary?.totalCancel}</td>
                      <td>{totalSummary?.totalHold}</td>
                      <td>{totalSummary?.totalPending}</td>
                      <td>{totalSummary?.totalRunning}</td>
                      <td>{totalSummary?.totalDue}</td>
                      
                  </tr>
              </tbody>
          </Table>
          <h4>Cash Summary</h4>
          <Table striped>
              <thead>
                  <tr>
                      <th>Monthly Service Payments</th>
                      <th> Total Expenses</th>
                      <th> Total in Cash</th>
                      <th> Total in Bank </th>
                      <th> Net Balance </th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>{totalSummary?.TotalserviceFees}</td>
                      <td>{totalSummary?.TotalExpenses}</td>
                      <td>{totalSummary?.TotalCash}</td>
                      <td>{totalSummary?.TotalBank}</td>
                      <td>{totalSummary?.Netbalance}</td>
                      <th><a
                                href={`data:text/csv;charset=utf-8,Total Services,Monthly Service,Completed Service,Cancelled Service,Hold Service,Pending
                                    ${totalSummary?.totalOrders},${totalSummary?.totalMonthlyService},${totalSummary?.totalCompleted},${totalSummary?.totalCancel},${totalSummary?.totalHold},${totalSummary?.totalPending}
                                    Monthly Service Payments,Total Expenses,Total Cash,Total online,Net Balance 
                                    ${totalSummary?.TotalserviceFees},${totalSummary?.TotalExpenses},${totalSummary?.TotalCash},${totalSummary?.TotalBank},${parseFloat(totalSummary?.TotalCash) + parseFloat(totalSummary?.TotalBank)}`}
                                download="TodaysServicesReport.csv"
                            >
                              Export Report</a></th>
                  </tr>

              </tbody>
          </Table>
          </div>
          </Card>             
            }
           {!complain && !summary && !inventry && <AdminDataTable
              rows={DataWithID(orders.data)}
              // columns={columns}
              CustomToolbar={CustomToolbar}
              columns={columns.map(column => {
                if (column.field === 'action') {
                    return {
                        ...column,
                        renderCell: (params) => (
                          <select
                                className="p-2 border-0"
                                style={{ borderRadius: "5px", outline: "none", cursor: "pointer", width: "120px" }}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue === 'Delete') {
                                        OrderDeleteByID(params.row.order_no);
                                    }
                                    else if(selectedValue==='Cancel'){
                                      OrderCancel(params.row.order_no,params.row.cust_id);
                                    }
                                    else if(selectedValue === 'Edit'){
                                      OrderUpdate(params.row)
                                    }
                                    else if(selectedValue === 'Hold'){
                                      OrderHold(params.row.order_no)
                                    }
                                    else if(selectedValue === 'Complete'){
                                      OrderComplete(params.row.order_no, params.row.piadamt, params.row.totalamt);
                                    }
                                    else if(selectedValue === 'Transfer'){
                                      OrderTransfers(params.row.order_no)
                                    }
                                    e.target.value = 'Action';
                                }}
                              >
                              <option disabled selected>Action</option>
                             
                              {params.row.pending === "Completed" || params.row.pending === "Cancel" ? (
                          <>
                          {(params.row.pending === "Cancel") ?  null  : <option value="Edit">Edit</option> }                         
                          {(userRole?.role === "super" || userRole?.role === "office" ) ? <option value="Delete">Delete</option> : null}

                          </>
                            ) : (
                                  <>
                                  <option value="Complete">Complete</option>
                                  <option value="Edit">Edit</option>
                                  <option value="Cancel">Cancel</option>
                                  {/* <option value="Delete">Delete</option> */}
                                  {(userRole?.role === "office" || userRole?.role === "super" || userRole?.role === "admin") ?  (
                                    <>
                                      <option value="Delete">Delete</option>
                                      <option value="Transfer">Transfer</option>
                                      <option value="Hold">Hold</option>
                                    </>
                                  ) : null 
                                }
                                </>
                            )}
                                </select>
                                      )
                                  };
                              }
                              return column;
                          })}    
                         />
                        }
            {inventry && !allotedItems && <AdminDataTable rows={inventories} CustomToolbar={InventryToolbar} columns={Inventrycolumns} />}  

            {!complain && !summary && inventry && allotedItems && <AdminDataTable rows={allotedItem} CustomToolbar={InventryToolbar} columns={AllotedItemsCollums} />}   
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
