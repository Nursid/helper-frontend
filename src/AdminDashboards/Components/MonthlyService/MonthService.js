import React, { Fragment, useEffect, useState, useRef } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom/dist'
import ModalComponent from '../../Elements/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllMonthlyServiceAction } from '../../../Store/Actions/Dashboard/EmployeeActions/GetAllMonthlyServices'
import moment from 'moment'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import { API_URL } from '../../../config'
import axios from 'axios'
import AddMonthlyServices from './AddMonthlyServices'
// import AnimatedBackground from '../../Elements/AnimatedBackground'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useReactToPrint } from 'react-to-print';
import ViewMonthlyService from './view/ViewMonthly-Service'
import InvoiceMonthlyService from './view/InvoiceMonthlyService'
import CollapseDatatable from '../../Elements/CollapseDatatable'
import { Form, Row, Col, Card, FormGroup, Label, Input,Table, Modal,
    ModalHeader, ModalBody } from 'reactstrap';
import MasterUpdate from './MasterUpdate'
import { useAuth } from '../../../Context/userAuthContext'

const MonthService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.GetAllMonthlyServiceDataReducer)
    const { currentUser, setCurrentUser } = useAuth();
    const token = currentUser.token
    const [from, setFrom] = useState(null)
    const [customer, setTo] = useState(null)
    const [customerTypeOpen, setCustomerTypeOpenFunction] =useState(false)
    const [mobileNo, setMobileNo] = useState('');
    const [errors, setErrors] = useState([])
    const customerTypeOpenFunction = () =>setCustomerTypeOpenFunction(!customerTypeOpen)
        
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
    const [showMasterModal, setShowMasterModal] = useState(false);
    const [editMasterMode, setEditMasterMode] = useState(false);
    const [editMasterData,setEditMasterData]=useState([])
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

    const MastertoggleEditMode = (data) => { 
        setShowMasterModal(!showMasterModal); 
        if(!data){
            setEditMasterData('')
        }else{
            setEditMasterData(data)
        }
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
        const apiUrl =  `${API_URL}/monthly-service/checkin/${orderNo}`;;
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

    const check_out = async (orderNo, feesPaidDateTime, data) => {    
        const formData = {
            pending: 3,
            checkouttime: moment(new Date()).format('DD/MM/YYYY, h:mm A'),
            feesPaidDateTime: feesPaidDateTime
        };
        const apiUrl = `${API_URL}/monthly-service/checkout/${orderNo}`;
        
        try {
            const response = await axios.put(apiUrl, formData);
            if (response.status === 200) {
                Swal.fire('Successfully!', "Your Order has been Completed!", 'success');
                const checkDateSame = await getLatestMonthlyServiceByOrderNo(orderNo, feesPaidDateTime)
                if(checkDateSame){
                    await handleExtendedService(data, feesPaidDateTime);
                }
                dispatch(GetAllMonthlyServiceAction());
            } else {
                Swal.fire({ title: response.data.message, icon: "error" });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({ title: 'Error', text: error.response?.data?.message || error.message || 'An error occurred while checking out.', icon: 'error' });
        }
    };

    const CancelHandler = async (orderNo, feesPaidDateTime) =>{ 
        Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to Cancel this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Cancel it!'
          }).then(async (result) => {
              if (result.isConfirmed) {
        
        const formData = {
            pending: 5,
            feesPaidDateTime: feesPaidDateTime,
            checkintime: null,
            checkouttime: null
        }
        const apiUrl =  `${API_URL}/monthly-service/hold/${orderNo}`;;
        // Make a POST request using Axios
        axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
            Swal.fire('Successfully!', "Your Order has been Canceled!", 'warning')
            dispatch(GetAllMonthlyServiceAction())
        } else {
            Swal.fire({title:  response.data.message, icon: "error"})
        } 			
        }).catch(error => {
        console.error('Error:', error);
        });
    }
    })
    };
    const DeleteHandler = async (orderNo) =>{ 
        Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to Delete this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Delete it!'
          }).then(async (result) => {
              if (result.isConfirmed) {
        
        const apiUrl =  `${API_URL}/monthly-service/master-delete/${orderNo}`;;
        // Make a POST request using Axios
        axios.delete(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token here
                "Content-Type": "application/json",
            }
        }).then(response => {
        if (response.status === 200) {
            Swal.fire('Successfully!', "Your Order has been Deleted!", 'warning')
            dispatch(GetAllMonthlyServiceAction())
        } else {
            Swal.fire({title:  response.data.message, icon: "error"})
        } 			
        }).catch(error => {
        console.error('Error:', error);
        });
    }
    })
    };
    
    const ResetCheckIn = async (orderNo, feesPaidDateTime) =>{ 
        Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to Reset this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Reset it!'
          }).then(async (result) => {
              if (result.isConfirmed) {
        
        const formData = {
            pending: 0,
            checkintime: null,
            checkouttime: null,
            feesPaidDateTime: feesPaidDateTime
        }
        const apiUrl =  `${API_URL}/monthly-service/un-hold/${orderNo}`;;
        // Make a POST request using Axios
        axios.put(apiUrl, formData).then(response => {
        if (response.status === 200) {
            Swal.fire('Successfully!', "Your Order has been Reset!", 'warning')
            dispatch(GetAllMonthlyServiceAction())
        } else {
            Swal.fire({title:  response.data.message, icon: "error"})
        } 			
        }).catch(error => {
        console.error('Error:', error);
        });
    }
    })
    };

    const Holdtoggle = async (orderNo, feesPaidDateTime, currentPending) => {
        const action = currentPending === "Hold" ? "Unhold" : "Hold";
        const newPendingValue = currentPending === "Hold" ? 0 : 1;
    
        Swal.fire({
            title: `Are you sure you want to ${action} this order?`,
            text: `You are about to ${action} the order.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${action} it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const formData = {
                    pending: newPendingValue,
                    feesPaidDateTime: feesPaidDateTime,
                    checkintime: null,
                    checkouttime: null,
                };
                let apiUrl = '';
                console.log(currentPending)
                if(currentPending === "Hold"){
                    apiUrl = `${API_URL}/monthly-service/un-hold/${orderNo}`;
                }else{
                    apiUrl = `${API_URL}/monthly-service/hold/${orderNo}`;
                }
                try {
                    const response = await axios.put(apiUrl, formData);
                    if (response.status === 200) {
                        Swal.fire('Success!', `Your Order has been ${action}ed!`, 'success');
                        dispatch(GetAllMonthlyServiceAction()); // Refresh the data
                    } else {
                        Swal.fire({ title: response.data.message, icon: "error" });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({ title: "Error", text: "An error occurred while updating the order.", icon: "error" });
                }
            }
        });
    };

    const column = [
        {
            field: "Status",
            headerName: "Status",
            renderCell: (params) => {
                const { orderNo, checkintime, checkouttime, feesPaidDateTime, pending } = params.row;
        
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
                    checkInHandler =
                        today === feesPaidDate && pending !== "Cancel" && pending !== "Completed"
                            ? () => check_in(orderNo, feesPaidDateTime)
                            : null;
                } else {
                    checkInLabel = `Update Check In ${checkintime}`;
                    checkInColor = 'green';
                    checkInHandler = null; // Disable clicking for updated check-in
                }
        
                // Determine Check Out button state
                if (checkintime && !checkouttime) {
                    checkOutLabel = 'Check Out';
                    checkOutColor = 'red';
                    checkOutHandler =
                        today === feesPaidDate && pending !== "Cancel" && pending !== "Completed"
                            ? () => check_out(orderNo, feesPaidDateTime, params.row)
                            : null;
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
                                    color: "white",
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
        { field: "bike_no", headerName: "Bike No", minWidth: 150},       
        {
            field: "action",
            headerName: "Action",
            minWidth: 550,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button onClick={(e)=>{toggleEditMode(params.row)}} variant='contained' color='primary' style={{minWidth: "40px", maxWidth: "40px"}}><BorderColorIcon /></Button>
                    <Button variant="contained" color="success" 
                onClick={(e)=>{handleMemo(params.row)}}
                style={{minWidth: "40px", maxWidth: "40px"}}
                >
                    <VisibilityIcon />
                </Button>

                    <Button variant="contained" color="info"
                    onClick={(e) => {
                        handleInvoice(params.row)
                    }}
                    >
                       Invoice
                    </Button>

                    {params.row.pending !== 'Cancel' && params.row.pending !== 'Completed' && params.row.pending !== 'Running' && (
                        <>

                            <Button
                                variant="contained"
                                color={params.row.pending === "Hold" ? "error" : "warning"} // Different colors for Hold and Unhold
                                onClick={() => {
                                    Holdtoggle(params.row.orderNo, params.row.feesPaidDateTime, params.row.pending);
                                }}
                            >
                                {params.row.pending === "Hold" ? "Unhold" : "Hold"} {/* Toggle the button text */}
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    GetDeleteByID(params.row.id);
                                }}
                                style={{ minWidth: "40px", maxWidth: "40px" }}
                            >
                                <DeleteForeverIcon />
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    CancelHandler(params.row.orderNo, params.row.feesPaidDateTime);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    ResetCheckIn(params.row.orderNo, params.row.feesPaidDateTime);
                                }}
                            >
                                Reset
                            </Button>
                        </>
                    )}                  
                </div>
            ),
        },
        {
            field: "action2",
            headerName: "Master Action",
            minWidth: 500,
            renderCell: (params) => (
                currentUser.role === "Super Admin" ? (
                    <div className="d-flex gap-2">
                        <Button 
                            onClick={() => MastertoggleEditMode(params.row)} 
                            variant="contained" 
                            color="primary" 
                            style={{ minWidth: "100px", maxWidth: "150px" }}
                        >
                            Master <BorderColorIcon />
                        </Button> 
                        <Button 
                            onClick={() => DeleteHandler(params.row.orderNo)} 
                            variant="contained" 
                            color="error" 
                            style={{ minWidth: "40px", maxWidth: "40px" }}
                        > 
                            <DeleteForeverIcon /> 
                        </Button> 
                    </div>
                ) : null
                    )
              }      
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

    const getLatestMonthlyServiceByOrderNo = async (orderNo, date) => {
        try {
            const response = await axios.get(`${API_URL}/monthly-service/GetLatestMonthlyServiceByOrderNo/${orderNo}/${date}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Error fetching latest monthly service:', response.data.message);
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
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

    const FilterData = async () => {
        if(!from && !customer){
            return;
        }
        try{
            dispatch(GetAllMonthlyServiceAction(from, customer))
        }catch(err){
            console.log("Error fetching data: ", err);
        }
       
      };

      
      const handleComplain = async () => {
          let errors = {};

          // Basic validation for the mobile number
          if (!mobileNo) {
              errors.mobileNo = "Mobile number is required";
          } else if (!/^\d{10}$/.test(mobileNo)) {
              errors.mobileNo = "Mobile number should be 10 digits";
          } else if (mobileNo.startsWith("1") || mobileNo.startsWith("2") || mobileNo.startsWith("3") || mobileNo.startsWith("4") || mobileNo.startsWith("5")) {
              errors.mobileNo = "This mobile number does not exist in India";
          }

          // If basic validation fails, display errors
          if (Object.keys(errors).length > 0) {
              console.log("Validation Errors:", errors);
              setErrors(errors);
              return false;
          }

          try {
              // Call API to check customer by mobile number
              const response = await axios.get(`${API_URL}/get/customerByMobile/${mobileNo}`);
              
              if (response.status === 200 && response.data.status === true) {
                
                  const item = response.data.data;
                

                  // Update `editData` state
                  setEditData(prevFormData => {
                      const newFormData = {
                          ...prevFormData,
                          cust_name: item?.customerData?.NewCustomer?.name || '',
                          mobile_no: mobileNo || '',
                          location: item?.customerData?.address || '',
                          area: item?.customerData?.location || ''
                      };

                      // Call functions since we have a valid response and data is set
                      if (Object.keys(newFormData).length > 0) {
                          toggleModal();
                          customerTypeOpenFunction();
                      }

                      return newFormData;
                  });

              } else {
                  console.log("Mobile number does not exist in customer database");
                  setErrors({ mobileNo: "This mobile number is not associated with any customer" });
              }
          } catch (error) {
              console.error("Error checking mobile number:", error);
              setErrors({ mobileNo: "An error occurred while verifying the mobile number. Please try again." });
          }
      };

      // Remove the separate toggleAddMonthly function as it's no longer needed
    

    const toggleAddMonthly = () =>{
        if(editData.length > 0){
            toggleModal()
            customerTypeOpenFunction();
        }
    }

     const addcheckincheckoutlatetime = async () => {
        try {
            const response = await axios.get(`${API_URL}/monthly-service/addCheckInCheckOutLateTime`);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error updating due order:', error);
        }
      };
    
      useEffect(() => { 
          addcheckincheckoutlatetime()
      }, []);


      const handleExtendedService = async (rowData) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Extension',
                text: `Are you sure you want to extend the service for ${rowData.cust_name}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, extend it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                // Create payload from existing data
                const payload = {
                    ...rowData,
                    feesPaidDateTime: moment(rowData.date, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm'),
                    checkintime: '',
                    checkouttime: ''
                };
                
                delete payload.pending;
                delete payload.date;
                delete payload._id;
                delete payload.id;
                
                const response = await axios.post(`${API_URL}/monthly-service/add`, payload);
                
                if (response.data.status) {
                    await Swal.fire({
                        title: 'Success',
                        text: 'Service extended successfully!',
                        icon: 'success'
                    });
                    
                } else {
                    await Swal.fire({
                        title: 'Error',
                        text: response.data.message || 'An error occurred while extending the service.',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            console.error("Error extending service:", error);
            await Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'An error occurred while extending the service.',
                icon: 'error'
            });
        } 
    };


    return (
        <Fragment>

            <div style={{ display: 'none' }}>
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
        <ViewMonthlyService ref={memberRef} data={memoData} /> 
        <InvoiceMonthlyService ref={InvoiceRef} data={invoiceData} /> 
        </div>

      <div className='position-relative'>
        <AnimatedBackground />
        <div className='BackgroundTopContents'>
            <ModalComponent
                data={<AddMonthlyServices toggleModal={toggleModal} data={editData}  />}
                modalTitle={editMode ? "Edit Monthly Service" : "Add Monthly Service"}
                modal={showModal}
                toggle={toggleModal}
                size={"xl"}
            />
            <ModalComponent
                data={<MasterUpdate toggleModal={MastertoggleEditMode} data={editMasterData}  />}
                modalTitle={"Master Edit Monthly Service"}
                modal={showMasterModal}
                toggle={MastertoggleEditMode}
                size={"xl"}
            />

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}>Monthly Service</h4>

           

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={customerTypeOpenFunction} >
                Add Monthly Service 
                </div>
            </div>
            </div>

            <div className="flex flex-col justify-between w-full mb-3 ">
                <div className="flex justify-between gap-6 items-center">
                <div className="ml-4">
                    <label htmlFor="startDate" className="text-light">Date:</label>
                    <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e)=>setFrom(e.target.value)}/>
            </div>
                    <div className="ml-4">
                    <label htmlFor="customer"  className="text-light mr-2" >Customer Name:</label>
                    <Input id="customer" type="text" onChange={(e)=>setTo(e.target.value)}
                    placeholder='Enter Customer Name'
                    />
            </div>
                    <div className="ml-4" style={{marginTop: '32px'}}>
                    <Button className="btn btn-primary" size="small" variant="contained" onClick={FilterData}>
                    Search
                    </Button>
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

