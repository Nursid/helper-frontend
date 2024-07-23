import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'
import { AddComplainModal } from '../../../Components/Modal';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import { API_URL, IMG_URL } from '../../../config';
// import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlockIcon from '@mui/icons-material/Block';
import axios from 'axios';
import {
    Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Alert,
	Row,
	Col,
	Input,
	CardBody,
	CardHeader,
	Card,
	Label,
	FormGroup
} from "reactstrap";
export default function ManageComplain(){

    const [Block, setBlock] = useState(false)
    const [editData, setEditData] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false); // New state variable
    const [data, setData] = useState([])
    const [complainModalOpen, setComplainModalOpen ] = useState(false)
    const [customerTypeOpen, customerTypeOpenFunction] =useState(false)
    const [memberType, setMemberType] = useState('');
    const [mobileNo, setMobileNo] = useState('')
    const [errors, setErrors] = useState([])
    const [lastOrder, setLastOrder] = useState([])
    async function fetchData() {
    try {
        const response = await axios.get(`${API_URL}/complain/getall`);
        console.log('Data:', response.data);
        setData(response.data)
        // Handle the data as needed
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
    }
    }

    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                const NewCustomer = item.NewCustomer
                let mergedItem = {...item, ...NewCustomer};
                NewData.push({ ...mergedItem, _id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    // const [blockStatus, setBlockStatus] = useState({});


    // useEffect(() => {
    //     if (data.data && data.data.length > 0) {
    //         const initialBlockStatus = {};
    //         data.data.forEach(item => {
    //             initialBlockStatus[item.id] = item.block;
    //         });
    //         setBlockStatus(initialBlockStatus);
    //     }
    // }, [data]);




    // const handleToggleBlock = (userId) => {
    //     const newBlockStatus = !blockStatus[userId]; // Toggle the block status
    //     // Make API call to update block status on the server

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
    //     axios.put(`${API_URL}/service/block/${userId}`, { block: newBlockStatus })
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



    // const IconWrapper = ({ icon }) => {
    //     const IconComponent = ALlIcon[icon];
    //     return IconComponent ? <IconComponent /> : null;
    // };


    // const handleDeleteServices = (id) => {
    //     Swal.fire({
    //         title: `Are you sure? `,
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(DeleteService(id))
    //                 .then(() => {
    //                     setDeleteSuccess(true);
    //                     Swal.fire("Deleted!", "Your Data Deleted", "success");
    //                 })
    //                 .catch((error) => {
    //                     console.error("Delete error:", error);
    //                     Swal.fire(
    //                         "Error",
    //                         "An error occurred while deleting the file.",
    //                         "error"
    //                     );
    //                 });
    //         }
    //     })

    // }

    const column = [
        {
            field: "action",
            headerName: "Action",
            flex: 1,
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
        { field: "order_no", headerName: "Complain Number", minWidth: 120, editable: true },
        { field: "name", headerName: "Customer Name",minWidth: 150, editable: true },
        { field: "mobileno", headerName: "Mobile",minWidth: 150, editable: true },
        { field: "user_type",flex: 1, headerName: "Type", minWidth: 80, editable: true },
        { field: "service_name",flex: 1, headerName: "Service Type",minWidth: 150, editable: true },
        { field: "booktime",flex: 1, headerName: "Booking Time", minWidth: 120, editable: true },
        { field: "bookdate", flex: 1, headerName: "Booking Date", minWidth: 120, editable: true },
        { field: "problem_des",flex: 1, headerName: "Problem Description ", minWidth: 150, editable: true },
        // { field: "suprvisor_id", headerName: "Supervisor",
        // renderCell: (params) => ( 
        //     <>
        //     {
        //     params?.row?.pending !== "Completed" && params?.row?.pending !== "Cancel" ? (
        //       !params.row.suprvisor_id ? (
        //         <Button 
        //           variant='contained' 
        //           color='primary' 
        //           onClick={() => AssignSupervisor(params.row.order_no)} 
        //           disabled={params?.row?.userRole?.role === "service"}
        //         >
        //           Supervisor
        //         </Button>
        //       ) : (
        //         params.row.suprvisor_id
        //       )
        //     ) :  params.row.suprvisor_id
        //   } </> ), minWidth: 200, editable: true },
    
        // { field: "servicep_id", headerName: "Service Provider",
        // renderCell: (params) => ( 
        //     <>
        //     {
        //   params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        //     !params.row.servicep_id ? (
           
        //       <Button variant='contained' color='primary' onClick={() => AssignServiceProvider(params.row.order_no)} >
        //         Service Provider
        //       </Button>
    
        //     ) : (
        //       params.row.servicep_id
        //     )
        //   ) : params.row.servicep_id } </> ),
        // minWidth: 200, editable: true },
    
        // { field: "vehicle_inventory", headerName: "Vehicle Used",
        // renderCell: (params) => ( 
        //     <>
        //     {(!params.row.vehicle_inventory) ? (<><Button variant='contained' color='primary'> Choose Vehicle</Button></> ) : <>{params.row.vehicle_inventory} </> } </> ),
        //  minWidth: 200, editable: true },
    //     { field: "netpayamt", headerName: "Billing Amount",
    //     renderCell: (params) => ( 
    //         <>
    //         {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
    //         (!params.row.netpayamt) ? (<><Button variant='contained' color='primary'  
    // onClick={()=>AssignAmount(params.row.order_no)}
    //         >Amount</Button></> ) : <>{params.row.netpayamt} </> ) : <>{params.row.netpayamt}</>
            
    //         } </> ),
    //     minWidth: 150 },
        // { field: "paymethod", headerName: "Payment Method", minWidth: 150},
        // { field: "piadamt", headerName: "Paid Amount", minWidth: 150 },
        // { field: "totalamt", headerName: "Balance Amount", minWidth: 150},
        // { field: "cust_remark", headerName: "Customer Feedback", minWidth: 150 },
        // { field: "bakof_remark", headerName: "Back Office Remark",
        // renderCell: (params) => ( 
        //     <>
        //     { params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        //     (params.row?.userRole?.role==="office" && !params.row.bakof_remark) ? (<><Button variant='contained' color='primary' onClick={()=>backOfficeRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.bakof_remark} </>) : params.row.bakof_remark } </> ),
    
        // minWidth: 180, editable: true},
        // { field: "admin_remark", headerName: "Admin Remark",
        // renderCell: (params) => ( 
        //     <>
        //     {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
            
        //     (params?.row?.userRole?.role==="admin" && !params.row.admin_remark) ? (<><Button variant='contained' color='primary' onClick={()=>AdminRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.admin_remark} </> ) : params.row.admin_remark } </> ),
        // minWidth: 150, editable: true },
        // { field: "providerratings", headerName: "Provider Ratings",
        // // renderCell: (params) => ( 
        // //     <>
        // //     {console.log("params.row.userRole-----",params.row)}
        // //      </> ),
    
        // minWidth: 150, editable: true },
        // { field: "sueadmin_remark", headerName: "Super Admin Remark",
        // renderCell: (params) => ( 
        //     <>
        //     {
        //     params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        //     (params.row?.userRole?.role==="super" && !params.row.sueadmin_remark) ? (<><Button variant='contained' color='primary' onClick={()=>SuperAdminRemark(params.row.order_no)}>Remark</Button></> ) : <>{params.row.sueadmin_remark} </> ) : params.row.sueadmin_remark} </> ),
    
        // minWidth: 180, editable: true,},
        // { field: "servp_remark",
        //     headerName: "Service Provider Remark",
    
        //     renderCell: (params) => ( 
        //         <>
        //         {params.row.pending !== "Completed" && params.row.pending !== "Cancel" ? (
        //         ( params.row?.userRole?.role==="service" && !params.row.servp_remark) ? (<><Button variant='contained' color='primary' onClick={()=>ServiceProviderRemark(params.row.order_no)} >Remark</Button></> ) : <>{params.row.servp_remark} </>) : params.row.servp_remark }
        //         </> ),
        //     minWidth: 180,
        //     editable: true,
        // },
        { field: "pending", headerName: "Order Status", minWidth: 150, editable: true },
        // { field: "cancle_reson", headerName: "Cancel Reason", minWidth: 150, editable: true },
      ];

      const handleComplain = () =>{
        let errors = {};
        if(memberType){
            if (!mobileNo) {
                errors.mobileNo = "Mobile number is required";
            } else if (!/^\d{10}$/.test(mobileNo)) {
                errors.mobileNo = "Mobile number should be 10 digits";
            }

            if (errors && Object.keys(errors).length === 0) {
                console.log("Form submitted successfully!",);
              } else {
                // Form is invalid, display validation errors
                console.log("Validation Errors:", errors);
                setErrors(errors);
                return false;
              }

          
		axios.get(`${API_URL}/get/customerByMobile/${mobileNo}`)
			.then(response => {
				if (response.status === 200) {
					setLastOrder(response.data.data)
                    customerTypeOpenFunction()
                    setComplainModalOpen(true)
				} else {
					Swal.fire({
						title: 'Not User Found Please Enter valid User',
						icon: "error",
					})
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
        }
        else{
            customerTypeOpenFunction()
            setComplainModalOpen(true)
        }
        
      }

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

    // const [masterAddService, setMasterAddServices] = useState(false)
    // // const ToggleMasterAddService = () => setMasterAddServices(!masterAddService)

    // const ToggleMasterAddService = () => {
    //     setMasterAddServices(!masterAddService);
    //     if (masterAddService) {
    //         setEditData(null); // Reset editData when closing masterAddService
    //     }
    // };
    // const handleEdit = (data) =>{
    //     setEditData(data)
    //     ToggleMasterAddService()
    // }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        // dispatch(GetAllServices());
        setDeleteSuccess(false); // Reset the delete success state
    }, [deleteSuccess]); // Trigger useEffect when deleteSuccess changes
    return (
        <Fragment>

           {complainModalOpen &&  <AddComplainModal
                    complainModalOpen={complainModalOpen}
                    complainModalOpenfunction={() => setComplainModalOpen(!complainModalOpen)}
                    data={lastOrder}
                    fetchData={fetchData}
                    // role={role}
                    // currentUser={currentUser.id}
                />
            }
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
                    
                            {memberType && JSON.parse(memberType) && (
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
                                {errors?.name && (
                        <span className='validationError'>
                            {errors?.name}
                        </span>
                    )}
                                </FormGroup>
                                </Col>
                            )}
                        
                            <Button variant='contained' color='primary' onClick={handleComplain}>Complain Now</Button>
					{/* <div className="d-flex justify-content-end ">
						<Button color="success"
							
							style={
								{marginRight: '10px'}
						}>
							Save
						</Button>
						<Button color="danger"
							onClick={customerTypeOpenFunction}>
							Close
						</Button>
					</div> */}
				</Row>
			</ModalBody>
		</Modal>
        }
            {/* <ModalComponent modal={masterAddService} toggle={ToggleMasterAddService} data={<MasterAddService ToggleMasterAddService={ToggleMasterAddService} data={editData} />} modalTitle={`${editData?.id ? 'Edit Service' : 'Add Service' } `} /> */}
            {/* <DashHeader /> */} 
            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> All Complain List</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "18rem", maxWidth: "18rem" }} onClick={() => customerTypeOpenFunction(!customerTypeOpen)}>
                Add New Complain
                </div>
            </div>
            </div>

            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data.data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

// export default ManageService