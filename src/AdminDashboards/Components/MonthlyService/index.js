import React, { Fragment, useEffect, useState, useRef } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom/dist'
import AdminDataTable from '../../Elements/AdminDataTable'
import ModalComponent from '../../Elements/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllMonthlyServiceAction } from '../../../Store/Actions/Dashboard/EmployeeActions/GetAllMonthlyServices'
import moment from 'moment'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import { API_URL } from '../../../config'
import axios from 'axios'
import AddMonthlyServices from './AddMonthlyServices'
import AdminHeader from '../AdminHeader'
// import AnimatedBackground from '../../Elements/AnimatedBackground'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useReactToPrint } from 'react-to-print';
import ViewMonthlyService from './view/ViewMonthly-Service'
import InvoiceMonthlyService from './view/InvoiceMonthlyService'
import CollapseDatatable from '../../Elements/CollapseDatatable'

const MonthService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.GetAllMonthlyServiceDataReducer)

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
            const groupedData = {};
        
            if (data !== undefined) {
                // Grouping items by orderNo
                for (let item of data) {
                    const orderNo = item.orderNo;
        
                    if (!groupedData[orderNo]) {
                        groupedData[orderNo] = [];
                    }
        
                    groupedData[orderNo].push({
                        ...item,
                        _id: data.indexOf(item),
                        date: moment(item.feesPaidDateTime).format("DD-MM-YYYY"),
                        pending: getStatusByKey(item.pending),
                    });
                }
        
                // Transforming grouped data into the desired format
                for (const orderNo in groupedData) {
                    const items = groupedData[orderNo];
                    const parent = items[0]; // Pick the first item as the parent
                    const history = items.slice(1); // The rest are history
        
                    NewData.push({
                        ...parent,
                        history: history.map((item, index) => ({
                            ...item,
                            id: parent.id + index + 1, // Generating unique id for history items
                        })),
                    });
                }
            } else {
                NewData.push({ id: 0 });
            }
        
            return NewData;
        };
        
        

    useEffect(() => {
        dispatch(GetAllMonthlyServiceAction())
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
                const response = await axios.delete(API_URL + '/monthly-service/delete/' + user_id)
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Monthly Service has been deleted.',
                        'success'
                    )
                     dispatch(GetAllMonthlyServiceAction())
                } else {
                    Swal.fire({
                        title: 'failed to delete try again',
                        icon: "error",
                    })
                }
            }
        })
    }
    const [Block, setBlock] = useState(false)
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


    const check_in = async (orderNo, feesPaidDateTime) => {
        
        const formData = {
        pending: 4,
        checkintime: moment(new Date()).format('DD/MM/YYYY, h:mm A'),
        feesPaidDateTime: feesPaidDateTime
        }
        const apiUrl =  `${API_URL}/monthly-service/assign/${orderNo}`;;
        // Make a POST request using Axios
        axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
            Swal.fire('Successfully!', "Order Is on Running", 'success')
            dispatch(GetAllMonthlyServiceAction())
        } else {
            Swal.fire({title:  response.data.message, icon: "error"})
        } 			
        }).catch(error => {
        console.error('Error:', error);
        });
    };

    const check_out = async (orderNo, feesPaidDateTime) =>{    
        const formData = {
        pending: 3,
        checkouttime: moment(new Date()).format('DD/MM/YYYY, h:mm A'),
        feesPaidDateTime: feesPaidDateTime
        }
        const apiUrl =  `${API_URL}/monthly-service/assign/${orderNo}`;;
        // Make a POST request using Axios
        axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
            Swal.fire('Successfully!', "Your Order has been Completed!", 'success')
            dispatch(GetAllMonthlyServiceAction())
        } else {
            Swal.fire({title:  response.data.message, icon: "error"})
        } 			
        }).catch(error => {
        console.error('Error:', error);
        });
    };


    const column = [
        {
            field: "Status",
            headerName: "Status",
            renderCell: (params) => {
                const { orderNo, checkintime, checkouttime, feesPaidDateTime } = params.row;
        
                const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                const feesPaidDate = new Date(feesPaidDateTime).toISOString().split('T')[0]; // Get fees paid date
        
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
                    checkInHandler = today === feesPaidDate ? () => check_in(orderNo, feesPaidDateTime) : null;
                } else {
                    checkInLabel = `Update Check In ${checkintime}`;
                    checkInColor = 'green';
                    checkInHandler = null; // Disable clicking for updated check-in
                }
        
                // Determine Check Out button state
                if (checkintime && !checkouttime) {
                    checkOutLabel = 'Check Out';
                    checkOutColor = 'red';
                    checkOutHandler = today === feesPaidDate ? () => check_out(orderNo, feesPaidDateTime) : null;
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
                                color: !checkintime ? "black" : "white",
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
                                    whiteSpace: "normal",
                                    textAlign: "center",
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
        { field: "cust_name", headerName: "Customer Name", minWidth: 120 },
        { field: "mobile_no", headerName: "Mobile", minWidth: 120 },
        { field: "date", headerName: "Date", minWidth: 120 },
        { field: "orderNo", headerName: "OrderNo ", minWidth: 120 },
        { field: "serviceType", headerName: "Service ", minWidth: 120 },
        { field: "serviceServeType", headerName: "Monthly Service Type", minWidth: 120 },
        { field: "selectedTimeSlot", headerName: "Time Slot", minWidth: 120  },
        { field: "service_provider", headerName: "Service Provider", minWidth: 120 },
        { field: "supervisor", headerName: "Supervisor", minWidth: 120 },
        { field: "paymethod", headerName: "Payment Method", minWidth: 150},
        { field: "netpayamt", headerName: "Billing Amount",minWidth: 150 },
        { field: "piadamt", headerName: "Paid Amount", minWidth: 150 },
        { field: "totalamt", headerName: "Balance Amount", minWidth: 150},       
        {
            field: "action",
            headerName: "Action",
            minWidth: 320,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button onClick={(e)=>{toggleEditMode(params.row)}} variant='contained' color='primary' style={{minWidth: "40px", maxWidth: "40px"}}><BorderColorIcon /></Button>
                    <Button variant="contained" color="success" 
                onClick={(e)=>{handleMemo(params.row)}}
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

                    <Button variant="contained" color="success"
                    onClick={(e) => {
                        handleInvoice(params.row)
                    }}
                    >
                       Invoice
                    </Button>
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


    const memberRef = useRef(null);
    const [memoData, setMemoData] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => memberRef.current,
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

    // Add Employee form Handler 
    // const [addEmployee, setAddEmployee] = useState(false)
    // const ToggleAddMonthlyService = () => {
    //     setAddEmployee(!addEmployee)
       
    // }

    return (
        <Fragment>
            <div style={{ display: 'none' }}>
        <ViewMonthlyService ref={memberRef} data={memoData} /> 
        <InvoiceMonthlyService ref={InvoiceRef} data={invoiceData} /> 
        </div>

      <AdminHeader />

      <div className='position-relative'>
        <AnimatedBackground />
        <div className='BackgroundTopContents'>
        <AdminNavItems />
            <ModalComponent
                data={<AddMonthlyServices toggleModal={toggleModal} data={editData} />}
                modalTitle={editMode ? "Edit Monthly Service" : "Add Monthly Service"}
                modal={showModal}
                toggle={toggleModal}
                size={"xl"}
            />

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}>Monthly Service</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
                Add Monthly Service 
                </div>
            </div>
            </div>
            <div className='p-4'>
                {/* <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar}  /> */}

                <CollapseDatatable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
               
            </div>
        
            </div>
      </div>
    </Fragment>
    )
}

export default MonthService

