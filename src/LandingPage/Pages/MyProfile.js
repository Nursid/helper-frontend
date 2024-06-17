import React, { useState,useEffect } from 'react'
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
const MyProfile = ({ serviceData }) => {

    const dispatch = useDispatch()
    const { data, isLoading } = useSelector(state => state.GetAllOrderByIdReducer)
   

    const [complainModalOpen, setComplainModalOpen] = useState(false)

    const status = [
        { id: 0, name: "Pending" },
        { id: 1, name: "Hold" },
        { id: 2, name: "Due" },
        { id: 3, name: "Completed" },
        { id: 4, name: "Running" },
        { id: 5, name: "Cancel" }
    ];


    useEffect(() => {
      dispatch(GetAllOrdersByID(serviceData.user_id))
    }, []);

    const [registered_id, setRegisterId]=useState('')
    const [order_no,setOrderNo]=useState('')


    const CancelOrderForm = (registered_id,order_no) =>{
        // onClick={()=>{CancelOrderForm(params.row.registered_id,params.row.order_no)}}
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
        { field: 'service_name', headerName: 'Service Name', width: 180, headerCenter: true },
        { field: 'bookdate', headerName: 'Bookig Date', width: 150, headerCenter: true },
        { field: 'booktime', headerName: 'Bookig Time', width: 100, headerCenter: true },
        { field: 'service_des', headerName: 'Service Details', width: 200, headerCenter: true },
        { field: 'suprvisor_id', headerName: 'Supervisor', width: 100, headerCenter: true },
        { field: 'servicep_id', headerName: 'Service Provider', width: 150, headerCenter: true },
        { field: 'totalamt', headerName: 'Billing Amount', width: 150, headerCenter: true },
        { field: 'piadamt', headerName: 'Paid Amount', width: 150, headerCenter: true },
        { field: 'netpayamt', headerName: 'Balance Amount', width: 150, headerCenter: true },
        { field: 'paymethod', headerName: 'Payment Method', width: 180, headerCenter: true },
        {
            field: 'cust_remark', headerName: 'Customer Remark', width: 180, headerCenter: true,
            renderCell: (params) => (
                <>
                {(!params.row.cust_remark) ? <><Button color='success' onClick={()=> CustomerRemark(params.row.order_no, params.row.cust_id)} variant='contained'>Add Remark</Button></> : <>{params.row.cust_remark}</> } </>
            )
        },
        { field: 'suerv_remark', headerName: 'Supervisor Remark', width: 180, headerCenter: true },
        { field: 'problem_des', headerName: 'Complain', width: 180, headerCenter: true },
        {
            field: 'pending',
            headerCenter: true,
            width: 200,
            headerName: 'Order Status',
            renderCell: (params) => (
            <Button 
            
            color={
                params.row.pending === 0 ? "warning" :
                params.row.pending === 1 ? "secondary" :
                params.row.pending === 2 ? "secondary" :
                params.row.pending === 3 ? "success" :
                params.row.pending === 4 ? "info" :
                "danger"
            }
                variant='contained' >{status.find(item => item.id === params.row.pending)?.name}</Button>)
        }
    ];


    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                let orderProcess = item.orderProcess;
                let mergedItem = {...item, ...orderProcess};
                NewData.push({ ...mergedItem, id: data.indexOf(item), bookdate: moment(item.createdAt).format("DD-MM-YYYY") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
      }
 


    return (
        <div>
            <CustomerRemarkModal
                customerRemarkModalOpen={customerRemarkModalOpen}
                customerRemarkModalfunction={() => setCustomerRemarkModalOpen(!customerRemarkModalOpen)}
                orderNo={order_no}
                registerId={registered_id}
                GetAllOrders={GetAllOrdersByID}
            />
             <CustomerCancelOrderModal
                customerCancelOrderModalOpen={customerCancelModalOpen}
                customerCancelModalfunction={() => setCustomerCancelModalOpen(!customerCancelModalOpen)}
                registerId={registered_id}
                orderNo={order_no}
                GetAllOrders={GetAllOrdersByID}
                />

            <AddNewComplain
                complainModalOpen={complainModalOpen}
                complainModalOpenfunction={() => setComplainModalOpen(!complainModalOpen)}
                mobileNo={serviceData?.NewCustomer?.mobileno}
                UserID={registered_id}
            />

            <Row>
                <Col xs={12} lg={4} xl={4} >
                    <Card className='mt-2'>
                        <CardBody className="text-center">
                            <img
                                src={IMG_URL+serviceData?.image || `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp`}
                                alt="avatar"
                                 className="rounded-circle mb-3"
                                style={{ width: '150px' }}
                                />
                            <h6 className="text-muted mb-1">{serviceData.NewCustomer.name ? serviceData.NewCustomer.name : "NA" }</h6>
                            <p className="text-muted mb-4">{serviceData.address ? serviceData.address : '-------'}</p>
                            <div className="d-flex justify-content-center">
                                <h5>Memeber Id: <span style={{ color: '#ff0000' }}>{serviceData.member_id}</span></h5>
                            </div>
                            <Button onClick={() => setserveRequestModalOpen(!serveRequestModalOpen)} sx={{ background: '#3d5ce8' }} variant='contained'> Request New Service </Button>

                            <Button onClick={() => setComplainModalOpen(!complainModalOpen)} style={{ backgroundColor: '#e74c3c' }} variant='contained' className='ms-5'> Add New Complain </Button>

                            <ServeiceRequestModal
                                serveRequestModalOpen={serveRequestModalOpen}
                                serveRequestModalOpenfunction={() => setserveRequestModalOpen(!serveRequestModalOpen)} />
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