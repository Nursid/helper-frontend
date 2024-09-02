import React, { useState,useEffect, useRef } from 'react'
// import { Card, CardBody, Col, Row } from 'reactstrap'
import { DataGrid } from '@mui/x-data-grid';
import { CustomerRemarkModal, ServeiceRequestModal,CustomerCancelOrderModal } from '../../Components/Modal';
import { API_URL } from '../../config';
import { GetAllOrdersByID } from '../../Store/Actions/Dashboard/Orders/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2'
import { Button, Col, Form, FormGroup, Input, Label, Row, TextArea,CardBody,Card } from 'reactstrap';
import axios from 'axios';
import { AddNewComplain } from './AddNewComplain'
import { IMG_URL } from '../../config';
import { AddComplainModal } from '../../Components/Modal';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../../Components/Invoice';
import MemberInvoice from '../../Components/MemberInvoice';
const MyProfile = ({ serviceData }) => {

    const dispatch = useDispatch()
    const { data, isLoading } = useSelector(state => state.GetAllOrderByIdReducer)
    const [lastOrder, setData] = useState([])
    const [isComplain, setComplain] = useState(false)
    const componentRef = useRef();
    const [complainModalOpen, setComplainModalOpen] = useState(false)

    const status = [
        { id: 0, name: "Pending" },
        { id: 1, name: "Hold" },
        { id: 2, name: "Due" },
        { id: 3, name: "Completed" },
        { id: 4, name: "Running" },
        { id: 5, name: "Cancel" }
    ];

    async function fetchData() {
        try {
            const response = await axios.get(`${API_URL}/get/customerByMobile/${serviceData?.NewCustomer?.mobileno}`);
            if (response.status === 200) {
                setData(response.data.data);
                return true;
            } else {
                Swal.fire({
                    title: 'No User Found. Please Enter Valid User',
                    icon: "error",
                });
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    const Togglecomplain = async () => {
        const complain = await fetchData();
        if (complain) {
            setComplain(true);
            setComplainModalOpen(true);
        }
    }
    const ToggleService = async () => {
        const complain = await fetchData();
        if (complain) {
            setserveRequestModalOpen(!serveRequestModalOpen)
        }
    }

    useEffect(() => {
      dispatch(GetAllOrdersByID(serviceData.user_id))
    }, []);

    const [registered_id, setRegisterId]=useState('')
    const [order_no,setOrderNo]=useState('')


    const CancelOrderForm = (order_no,registered_id) =>{
        setRegisterId(registered_id);
        setOrderNo(order_no)
        setCustomerCancelModalOpen(!customerCancelModalOpen)
    }
    

    const [serveRequestModalOpen, setserveRequestModalOpen] = useState(false)
    const [customerRemarkModalOpen, setCustomerRemarkModalOpen] = useState(false)

    // const [CancelRequestModalOpen, setCancelRequestModalOpen] = useState(false)
    const [customerCancelModalOpen, setCustomerCancelModalOpen] = useState(false);
    // 

    const CustomerRemark = (orderNo,registerId) =>{
        setOrderNo(orderNo);
        setRegisterId(registerId);
        setCustomerRemarkModalOpen(!customerRemarkModalOpen)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerCenter: true },
        { field: 'order_no', headerName: 'Order No.', width: 150, headerCenter: true },
        { field: 'service_name', headerName: 'Service Name', width: 180, headerCenter: true },
        { field: 'bookdate', headerName: 'Bookig Date', width: 150, headerCenter: true },
        { field: 'booktime', headerName: 'Bookig Time', width: 100, headerCenter: true },
        { field: 'problem_des', headerName: 'Service Details', width: 200, headerCenter: true },
        { field: 'suprvisor_id', headerName: 'Supervisor', width: 100, headerCenter: true },
        { field: 'servicep_id', headerName: 'Service Provider', width: 150, headerCenter: true },
        { field: 'netpayamt', headerName: 'Billing Amount', width: 150, headerCenter: true },
        { field: 'piadamt', headerName: 'Paid Amount', width: 150, headerCenter: true },
        { field: 'totalamt', headerName: 'Balance Amount', width: 150, headerCenter: true },
        { field: 'paymethod', headerName: 'Payment Method', width: 180, headerCenter: true },
        {
            field: 'cust_remark', headerName: 'Customer Remark', width: 180, headerCenter: true,
            renderCell: (params) => (
                <>
                {(!params.row.cust_remark) ? <><Button color='success' onClick={()=> CustomerRemark(params.row.order_no, params.row.cust_id)} variant='contained'>Add Remark</Button></> : <>{params.row.cust_remark}</> } </>
            )
        },
        { field: 'suerv_remark', headerName: 'Supervisor Remark', width: 180, headerCenter: true },
        { field: 'cancle_reson', headerName: 'Cancel Reason', width: 180, headerCenter: true },
        
        {
            field: 'pending',
            headerCenter: true,
            width: 200,
            headerName: 'Cancel',
            renderCell: (params) => (
                <>
                    {params.row.admin_approve ? ( // Check if admin_approve is true
                        <>Completed</>
                    ) : params.row.pending === 5 ? (
                        <>Cancelled</>
                    ) : (
                        <Button 
                            color="danger"
                            variant="contained" 
                            onClick={() => CancelOrderForm(params.row.order_no, params.row.cust_id)}
                            disabled={params.row.pending === 3}
                        >
                            Cancel
                        </Button>
                    )}
                </>
            )
        },
        { field: "", headerName: "Invoice", minWidth: 150, editable: true,
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


    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                // let orderProcess = item.orderProcess;
                // let mergedItem = {...item, ...orderProcess};
                // NewData.push({ ...mergedItem, id: data.indexOf(item), bookdate: moment(item.createdAt).format("DD-MM-YYYY") })

                const NewCustomer = item.NewCustomer || {}; // Ensure NewCustomer is an object
                const customer = NewCustomer.customer || {}; // Ensure customer is an object
                const mergedItem = { ...item, ...NewCustomer, ...customer };
                NewData.push({
                ...mergedItem,
                _id: data.indexOf(item),
                date: moment(item.createdAt).format("D / M / Y"),
                bookdate: moment(item.bookdate).format("DD-MM-YYYY"),
                booktime: moment(item.booktime, ["hh:mm:ss A", "hh:mm"]).format("HH:mm"),
                });

            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
      }



    const InvoiceRef = useRef(null);
    const [invoiceData, setInvoice] = useState([]);
  
    const handlePrint = useReactToPrint({
      content: () => InvoiceRef.current,
      onAfterPrint: () => setInvoice([])
    });
    
    const handleInvoice = (data) => {
      setInvoice(data);
    };
  
    useEffect(()=>{
      if (invoiceData && Object.keys(invoiceData).length > 0) {
        handlePrint();
      }
    }, [invoiceData,handlePrint ])
 


    return (
        <div>
            <div style={{ display: 'none' }}>
                <Invoice ref={InvoiceRef} data={invoiceData} />
            </div>

            {customerRemarkModalOpen && <CustomerRemarkModal
                customerRemarkModalOpen={customerRemarkModalOpen}
                customerRemarkModalfunction={() => setCustomerRemarkModalOpen(!customerRemarkModalOpen)}
                orderNo={order_no}
                registerId={registered_id}
                GetAllOrders={GetAllOrdersByID}
            />
            }
            {customerCancelModalOpen && <CustomerCancelOrderModal
                customerCancelOrderModalOpen={customerCancelModalOpen}
                customerCancelModalfunction={() => setCustomerCancelModalOpen(!customerCancelModalOpen)}
                registerId={registered_id}
                orderNo={order_no}
                GetAllOrders={GetAllOrdersByID}
                />
            }
         {isComplain && <AddComplainModal
                complainModalOpen={complainModalOpen}
                complainModalOpenfunction={()=>setComplainModalOpen(!complainModalOpen)}
                data={lastOrder}
                fetchData={fetchData}
            />
         }
          {serveRequestModalOpen &&   <ServeiceRequestModal
                                serveRequestModalOpen={serveRequestModalOpen}
                                serveRequestModalOpenfunction={() => setserveRequestModalOpen(!serveRequestModalOpen)} 
                                Data={lastOrder}
                                GetAllOrders={GetAllOrdersByID}
                                />
                         }
            <Row>
                <Col xs={12} lg={4} xl={4} >
                    <Card className='mt-2'>
                        <CardBody className="text-center">
                            <div className='w-80 h-80 rounded-circle'>
                            <img
                                src={IMG_URL+serviceData?.image || `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp`}
                                alt="avatar"
                                 className="rounded-circle mb-3"
                                style={{ width: '150px', height: '150px' }}
                                />
                            </div>
                           
                            <h6 className="text-muted mb-1">{serviceData.NewCustomer.name ? serviceData.NewCustomer.name : "NA" }</h6>
                            <p className="text-muted mb-4">{serviceData.address ? serviceData.address : '-------'}</p>
                            <div className="d-flex justify-content-center">
                                <h5>Memeber Id: <span style={{ color: '#ff0000' }}>{serviceData.member_id}</span></h5>
                            </div>
                            <Button 
                                onClick={ToggleService} 
                                sx={{ background: '#3d5ce8' }} 
                                variant='contained'
                            > 
                                Request New Service 
                            </Button>
                            <Button onClick={Togglecomplain} style={{ backgroundColor: '#e74c3c' }} variant='contained' className='ms-5'> Add New Complain </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} lg={8} xl={8} >
                    <Card className="mt-2 py-2">
                        <div className='pl-2 pt-2 pr-2 pb-2'>
                            <Row>
                                <Col sm="3">
                                    <h5>Full Name</h5>
                                </Col>
                                <Col sm="9">
                                    <p className="text-muted">{serviceData.NewCustomer.name}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="3">
                                    <h5>Gender</h5>
                                </Col>
                                <Col sm="9">
                                    <p className="text-muted">{serviceData.gender}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="3">
                                    <h5>Email</h5>
                                </Col>
                                <Col sm="9">
                                    <p className="text-muted">{serviceData.NewCustomer.email}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="3">
                                    <h5>Mobile</h5>
                                </Col>
                                <Col sm="9">
                                    <p className="text-muted">{serviceData.NewCustomer.mobileno}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="3">
                                    <h5>Address</h5>
                                </Col>
                                <Col sm="9">
                                    <p className="text-muted">{serviceData.address ? serviceData.address : '-------'}</p>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className='py-2'>
                <Col xs={12}>
                    {/* Map over serviceData and create a table */}
                    <Card>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={DataWithID(data.data)}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyProfile