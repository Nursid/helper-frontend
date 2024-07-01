import React, { Fragment, useState } from "react";
import "./AdminDashboard.css";
import { DataGrid, GridToolbar, GridToolbarDensitySelector, GridToolbarExportContainer, GridToolbarFilterButton, GridToolbarQuickFilter,GridToolbarColumnsButton } from "@mui/x-data-grid";
import StackBox from "./Elements/StackBox";
import { Form, Row, Col, Card, FormGroup, Label, Input,Table } from 'reactstrap';
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
import { GetAllInventry,GetAllAllotedItems } from "../Store/Actions/Dashboard/InventryAction";
import { AssignSupervisorModal,AssignServiceProviderModal,AddComplainModal,AddAmount,SuperAdminRemarkModal,AdminRemarkModal,BackOfficeRemarkModal,AllotItemModal,AddInventryModal } from "../Components/Modal";
import { useAuth } from "../Context/userAuthContext";
import { ServiceProviderRemarkModal } from "../Components/Modal";
const AdminDashboard = () => {
  const { rows, Show, setShow } = UseStateManager();
  const { userRole } = useUserRoleContext();
  const { currentUser, setCurrentUser } = useAuth();
  const [role, setRole] = useState(userRole.role || '');
  const dispatch = useDispatch();
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
  }, []);

  useEffect(() => {
    dispatch(GetAllAllotedItems())
  }, []);

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
    const NewData = []
    if (data !== undefined) {
        for (let item of data) {
            let orderProcess = item.orderProcess;
            let mergedItem = {...item, ...orderProcess};
            NewData.push({ ...mergedItem,pending: getStatusByKey(item.pending), _id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y"), bookdate:moment(item.bookdate).format("DD-MM-YYYY"),
            booktime: moment(item.booktime, ["hh:mm:ss A", "hh:mm"]).format("HH:mm"),
            userRole:userRole
          })
        }
    } else {
        NewData.push({ id: 0 })
    }
    return NewData
  }

  const [cancel, setCancel]=useState(false);
  const [update, setUpdate]=useState(false);
  const [transfer, setTransfer]=useState(false)
  const toggleAddOrders = () => setShow(!Show);
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
        <div

          onClick={toggleAddOrders}


          style={{ color: "#ffffff" }}
          className="cursor-p "
        >
          <FiPlusSquare /> ADD ORDER
        </div>
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
          const response = await axios.get(API_URL + '/order/delete/' + orderNo)
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
  const [registerId, SetRegisterId]=useState('')

  const OrderCancel = (orderNo,registerId) =>{
    SetOrderNo(orderNo)
    SetRegisterId(registerId)
    toggleCancelOrder()
  }

  const OrderUpdate = (orderData)=>{
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
          const response = await axios.put(API_URL + '/order/assign/' + orderNo,{pending: 1})
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
      // console.log("currentUser.designation.name--------",currentUser.name)
      dispatch(GetAllOrders(status,currentUser.id, role))
    }else{
      dispatch(GetAllOrders(status))
    }
    
  }

  const OrderComplete= (orderNo) =>{
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
          const response = await axios.get(API_URL + '/order/complete/' + orderNo)
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
    { field: "_id", headerName: "Sr No.", minWidth: 200, editable: true},
    { field: "item", headerName: "Name", minWidth: 220, editable: true },
    { field: "qty", headerName: "Quantity", minWidth: 220, editable: true },
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
    { field: "_id", headerName: "Sr No.  ", minWidth: 200, editable: true },
    { field: "allotdate", headerName: "Date", minWidth: 220, editable: true },
    { field: "spname", headerName: "Item", minWidth: 220, editable: true },
    { field: "item", headerName: "Alloted To", minWidth: 220, editable: true },
    { field: "aqty", headerName: "Quantity", minWidth: 220, editable: true },
    { field: "remark", headerName: "Remark", minWidth: 220, editable: true }
  ]

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

  const GetSubmmary = ()=>{
    setSummary(true)
    setInventry(false);
    setComplain(false);
  }
  
  const GetInventry = ()=>{
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

  const AssignSupervisor = (order_no) => { 
    SetOrderNo(order_no)
    setsupervisorModalOpen(!supervisorModalOpen)
  }

  const AssignServiceProvider = (order_no) => { 
    SetOrderNo(order_no)
    setserviceProviderModalOpen(!serviceProviderModalOpen)
  }

  const AssignAmount = (order_no) => { 
    SetOrderNo(order_no)
    setAmountModalOpen(!AmountModalOpen)
  }

  const SuperAdminRemark = (order_no) => { 
    SetOrderNo(order_no)
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
  
  const columns = [
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
        editable: true,
    },
    { field: "cust_id", headerName: "Customer ID", minWidth: 120, editable: true,  },
    { field: "order_no", headerName: "Order Number", minWidth: 120, editable: true },
    { field: "name", headerName: "Customer Name",minWidth: 150, editable: true },
    { field: "mobile", headerName: "Mobile",minWidth: 150, editable: true },
    { field: "user_type", headerName: "Type", minWidth: 80, editable: true },
    { field: "service_name", headerName: "Service Type",minWidth: 120, editable: true },
    { field: "booktime", headerName: "Booking Time", minWidth: 120, editable: true },
    { field: "bookdate", headerName: "Booking Date", minWidth: 120, editable: true },
    { field: "problem_des", headerName: "Problem Description ", minWidth: 150, editable: true },
    { field: "suprvisor_id", headerName: "Supervisor",
    renderCell: (params) => ( 
        <>
        {
        params?.row?.pending !== "Completed" && params?.row?.pending !== "Cancel" ? (
          !params.row.suprvisor_id ? (
            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => AssignSupervisor(params.row.order_no)} 
              disabled={params?.row?.userRole?.role === "service"}
            >
              Supervisor
            </Button>
          ) : (
            params.row.suprvisor_id
          )
        ) : null
      } </> ), minWidth: 150, editable: true },

    { field: "servicep_id", headerName: "Service Provider",
    renderCell: (params) => ( 
        <>
        {
      params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        !params.row.servicep_id ? (
       
          <Button variant='contained' color='primary' onClick={() => AssignServiceProvider(params.row.order_no)} >
            Service Provider
          </Button>

        ) : (
          params.row.servicep_id
        )
      ) : null } </> ),
    minWidth: 200, editable: true },

    // { field: "vehicle_inventory", headerName: "Vehicle Used",
    // renderCell: (params) => ( 
    //     <>
    //     {(!params.row.vehicle_inventory) ? (<><Button variant='contained' color='primary'> Choose Vehicle</Button></> ) : <>{params.row.vehicle_inventory} </> } </> ),
    //  minWidth: 200, editable: true },
    { field: "netpayamt", headerName: "Billing Amount",
    renderCell: (params) => ( 
        <>
        {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        (!params.row.netpayamt) ? (<><Button variant='contained' color='primary'  
onClick={()=>AssignAmount(params.row.order_no)}
        >Amount</Button></> ) : <>{params.row.netpayamt} </> ) : null
        
        } </> ),
    minWidth: 150 },
    { field: "paymethod", headerName: "Payment Method", minWidth: 150},
    { field: "piadamt", headerName: "Paid Amount", minWidth: 150 },
    { field: "totalamt", headerName: "Balance Amount", minWidth: 150},
    { field: "cust_remark", headerName: "Customer Feedback", minWidth: 150 },
    { field: "bakof_remark", headerName: "Back Office Remark",
    renderCell: (params) => ( 
        <>
        { params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        (params.row?.userRole?.role==="office" && !params.row.bakof_remark) ? (<><Button variant='contained' color='primary' onClick={()=>backOfficeRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.bakof_remark} </>) : null } </> ),

    minWidth: 180, editable: true},
    { field: "admin_remark", headerName: "Admin Remark",
    renderCell: (params) => ( 
        <>
        {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        
        (params?.row?.userRole?.role==="admin" && !params.row.admin_remark) ? (<><Button variant='contained' color='primary' onClick={()=>AdminRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.admin_remark} </> ) : null } </> ),
    minWidth: 150, editable: true },
    { field: "providerratings", headerName: "Provider Ratings",
    // renderCell: (params) => ( 
    //     <>
    //     {console.log("params.row.userRole-----",params.row)}
    //      </> ),

    minWidth: 150, editable: true },
    { field: "sueadmin_remark", headerName: "Super Admin Remark",
    renderCell: (params) => ( 
        <>
        {
        params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        (params.row?.userRole?.role==="super" && !params.row.sueadmin_remark) ? (<><Button variant='contained' color='primary' onClick={()=>SuperAdminRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.sueadmin_remark} </> ) : null} </> ),

    minWidth: 180, editable: true,},
    { field: "servp_remark",
        headerName: "Service Provider Remark",

        renderCell: (params) => ( 
            <>
            {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
            ( params.row?.userRole?.role==="service" && !params.row.servp_remark) ? (<><Button variant='contained' color='primary' onClick={()=>ServiceProviderRemark(params.row.order_no)} >Remark</Button></> ) : <>{params.row.servp_remark} </>) : null }
            </> ),
            

        minWidth: 180,
        editable: true,
    },
    { field: "pending", headerName: "Order Status", minWidth: 150, editable: true },
    { field: "cancle_reson", headerName: "Cancel Reason", minWidth: 150, editable: true },
  ];
  
  return (
    <Fragment>
      <AssignSupervisorModal
        supervisorModalOpen={supervisorModalOpen}
        supervisorModalOpenFunction={() => setsupervisorModalOpen(!supervisorModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
      />
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
      />
      
      <AssignServiceProviderModal
        serviceProviderModalOpen={serviceProviderModalOpen}
        serviceProviderModalOpenFunction={() => setserviceProviderModalOpen(!serviceProviderModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
      />

      <ServiceProviderRemarkModal
        superProviderRemarkModalOpen={superProviderRemarkModalOpen}
        superProviderRemarkModalOpenFunction={() =>  setSuperProviderRemarkModalOpen(!superProviderRemarkModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
      />

      <AddAmount
        AmountModalOpen={AmountModalOpen}
        AmountModalOpenFunction={() => setAmountModalOpen(!AmountModalOpen)}
        OrderNo={OrderNo}
        GetAllOrders={GetAllOrders}
        role={role}
        currentUser={currentUser.id}
      />

      <AddComplainModal
          complainModalOpen={complainModalOpen}
          complainModalOpenfunction={() => setComplainModalOpen(!complainModalOpen)}
          mobileNo={mobileNo}
          GetAllOrders={GetAllOrders}
          role={role}
          currentUser={currentUser.id}
      />

      <ModalComponent
        modalTitle={"Add Order"}
        modal={Show}
        toggle={toggleAddOrders}
        data={<AddOrderForm prop={toggleAddOrders } GetAllOrders={GetAllOrders} role={role}
        currentUser={currentUser.id}  />}
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
          data={<TransferOrderForm  orderNo={OrderNo} prop={toggleTransferOrder } GetAllOrders={GetAllOrders} />}
        />

        <ModalComponent
        modalTitle={"Update Order"}
        modal={update}
        toggle={toggleUpdateOrder}
        data={<UpdateOrderForm  orderData={orderData} prop={toggleUpdateOrder } GetAllOrders={GetAllOrders} role={role}
        currentUser={currentUser.id}/>}
        size={"xl"} scrollable={true}
        />

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
            
          <ColoredBtn
            onClick={() =>{
              AddNewComplain()
            }}
            btnName={"New Complain"}
            bg={"#f08080"}
            color={"black"}
          />

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

              <ColoredBtn
                onClick={() => {
                GetInventry()
              }}
                btnName={"Inventory"}
                bg={"#ffa500"}
                color={"black"}
              />
            </> : null }
          </div>

          {/* {userRole && userRole.Dashboard ? (
            <Row>
              <Col md={12}>
                <div className="DashboardAnalytics">
                  <StackBox
                    title="Total Income"
                    amount={20000}
                    rupee={true}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,var(--yellow) , var(--yellow))",
                      gridArea: "one",
                    }}
                  />
                  <StackBox
                    title={"Total Expenses"}
                    amount={20000000}
                    rupee={true}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,yellow , goldenrod)",
                      gridArea: "two",
                    }}
                  />
                  <StackBox
                    title={"Total Services"}
                    amount={2482}
                    rupee={false}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,lightgreen , skyblue",
                      gridArea: "three",
                    }}
                  />
                  <StackBox
                    title={"Total Employee"}
                    amount={202}
                    rupee={false}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,cornflowerblue , aqua",
                      gridArea: "four",
                    }}
                  />

                </div>
              </Col>
            </Row>
          ) : null} */}
          
          {/* Data Table  */}
          <div className="p-4 ">
          {!complain && !inventry && summary && <Card className="p-4">
          <div className="p-4 pb-4">
                    <h4>Todays Summary</h4>
          <Table striped>
              <thead>
                  <tr>
                      <th>Total Services</th>
                      <th>Monthly Service</th>
                      <th>Additional Service</th>
                      <th>Completed Service</th>
                      <th>Cancelled Service</th>
                      <th>Free Service</th>
                      <th>Transfered Service</th>
                      <th>Continued Service</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>75</td>
                      <td>1</td>
                      <td>74</td>
                      <td>55</td>
                      <td>5</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                  </tr>
              </tbody>
          </Table>
          </div>

          <div className="p-4 pb-4">
          <h4>Cash Summary</h4>
          <Table striped>
              <thead>
                  <tr>
                      <th>Monthly Service Payments</th>
                      <th> Add. Service Payments</th>
                      <th> Todays Expenses</th>
                      <th> Todays cash</th>
                      <th> Todays online</th>
                      <th> Total in Cash</th>
                      <th> Total in Bank </th>
                      <th> Net Balance </th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>0</td>
                      <td>1500</td>
                      <td></td>
                      <td>1500</td>
                      <td>0</td>
                      <td>881416</td>
                      <td>258365</td>
                      <td>1139781</td>
                      <th><a href="data:text/csv;charset=utf-8,Total Services,Monthly Service,Additional Service,Completed Service,Cancelled Service,Free Service,Transfered Service,Continued Service
                        75,1,74,55,5,0,0,0
                        Monthly Service Payments,Add Service Payments,Todays Expenses,Todays cash,Todays online,Total in Cash,Total in Bank,Net Balance 
                        0,1500,,1500,0,881416,258365,1139781" download="TodaysServicesReport.csv">Export <br/> Services<br/> Report</a></th>
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
                                      OrderComplete(params.row.order_no,params.row.cust_id)
                                    }
                                    else if(selectedValue === 'Transfer'){
                                      OrderTransfers(params.row.order_no)
                                    }
                                }}
                              >
                              <option desabled selected>Action</option>
                             
                              {params.row.pending === "Completed" || params.row.pending === "Cancel" ? (
                          <>
                          <option value="Edit">Edit</option>
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
          {!inventry && !summary && complain && 
                  <div className='d-grid place-items-center'>
                    <Card className="p-4 border-0">
                      <div className="mx-auto">
                        <Row>
                            <Col md={12}>
                            <FormGroup>
                              <Label for="complaint">New Complaint</Label>
                              <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => {
                                  setMemberType(e.target.value);
                                  setMobileNo('');
                                }}
                              >
                                <option disabled>Select Member Type</option>
                                <option value={false}>Not Member</option>
                                <option value={true}>Member</option>
                              </Input>
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            {memberType && JSON.parse(memberType) && (
                              <Col md={12}>
                              <FormGroup>
                                <Label for="mobile">Mobile No</Label>
                                <Input
                                  id="mobile"
                                  name="mobile"
                                  type="text"
                                  value={mobileNo}
                                  placeholder="Mobile No"
                                  onChange={(e) => setMobileNo(e.target.value)}
                                />
                                </FormGroup>
                                </Col>
                            )}
                            </Row>
                            <Row>
                            <Button variant='contained' color='primary' onClick={HandleComplainBook}>Book Now</Button>
                            </Row>
                      </div>
                    </Card>
                  </div>
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
