// import React, { Fragment, useEffect, useState } from 'react'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import BlockIcon from '@mui/icons-material/Block'
// import BorderColorIcon from '@mui/icons-material/BorderColor'
// import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
// import { Modal, ModalBody, ModalHeader } from 'reactstrap'
// import { useNavigate } from 'react-router-dom/dist'
// import AdminDataTable from '../../Elements/AdminDataTable'
// import ModalComponent from '../../Elements/ModalComponent'
// import AdminEditEmploye from './Forms/AdminEditEmploye'
// import { useDispatch, useSelector } from 'react-redux'
// import GetAllMonthlyServiceDataReducer from '../../../Store/Reducers/Dashboard/EmployeeReducers/GetAllMonthlyServiceReducer'
// import { GetAllMonthlyServiceAction } from '../../../Store/Actions/Dashboard/EmployeeActions/GetAllMonthlyServices'
// import moment from 'moment'
// import { Button } from '@mui/material'
// import Swal from 'sweetalert2'
// import { API_URL } from '../../../config'
// import axios from 'axios'
// import AddMonthlyServices from './Forms/AddMonthlyServices'

// const ManageMonthService = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const { data } = useSelector(state => state.GetAllMonthlyServiceDataReducer)

//     const DataWithID = (data) => {
//         const NewData = []
//         if (data !== undefined) {
//             for (let item of data) {
//                 NewData.push({ ...item, _id: data.indexOf(item), date: moment(item.feesPaidDateTime).format("DD-MM-YYYY") })
//             }
//         } else {
//             NewData.push({ id: 0 })
//         }
//         return NewData
//     }

//     useEffect(() => {
//         dispatch(GetAllMonthlyServiceAction())
//     }, [])


//     const GetDeleteByID = (user_id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const response = await axios.delete(API_URL + '/monthly-service/delete/' + user_id)
//                 if (response.status === 200) {
//                     Swal.fire(
//                         'Deleted!',
//                         'Monthly Service has been deleted.',
//                         'success'
//                     )
//                      dispatch(GetAllMonthlyServiceAction())
//                 } else {
//                     Swal.fire({
//                         title: 'failed to delete try again',
//                         icon: "error",
//                     })
//                 }
//             }
//         })
//     }
//     const [Block, setBlock] = useState(false)
//     const [showModal, setShowModal] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [editData,setEditData]=useState([])
//     const toggleModal = () => {
//         setShowModal(!showModal);
//         setEditMode(false); 
//         setEditData('')
//     };
//     const toggleEditMode = (data) => { 
//         setShowModal(true); 
//         setEditMode(true);
//         setEditData(data)
//     };

//     const column = [
//         { field: "_id", headerName: "Sr No", minWidth: 50, editable: true },
//         { field: "cust_name", headerName: "Customer Name", minWidth: 120, editable: true },
//         { field: "mobile_no", headerName: "Mobile", minWidth: 120, editable: true },
//         { field: "service_provider", headerName: "Service Provider", minWidth: 120, editable: true },
//         { field: "serviceType", headerName: "Service Type", minWidth: 120, editable: true },
//         { field: "serviceServeType", headerName: "Service Serve Type", minWidth: 120, editable: true },
//         { field: "selectedTimeSlot", headerName: "Hourly Time Slot", minWidth: 120, editable: true },
//         { field: "specialInterest", headerName: "Special Interest", minWidth: 220, editable: true },
//         { field: "serviceFees", headerName: "Service Fees", minWidth: 120, editable: true },
//         { field: "date", headerName: "Fees Paid Date & Time", minWidth: 120, editable: true },      
//         // {
//         //     field: "status",
//         //     minWidth: 150,
//         //     headerName: "Status",
//         //     renderCell: (params) => (
//         //         <Button className="text-white bg-green">Approved</Button>
//         //     ),
//         // },
//         {
//             field: "action",
//             headerName: "Action",
//             minWidth: 220,
//             renderCell: (params) => (
//                 <div className="d-flex gap-2">
//                     <Button onClick={(e)=>{toggleEditMode(params.row)}} variant='contained' color='primary' style={{minWidth: "40px", maxWidth: "40px"}}><BorderColorIcon /></Button>
//                     {/* <Button variant="contained" color="success">
//                         <VisibilityIcon />
//                     </Button> */}
//                     <Button variant="contained" color="error"
//                     onClick={(e) => {
//                         GetDeleteByID(params.row.id)
//                     }}
//                     style={{minWidth: "40px", maxWidth: "40px"}}
//                     >
//                         <DeleteForeverIcon />
//                     </Button>
//                 </div>
//             ),
//         },
//         // {
//         //     field: "block",
//         //     headerName: "Block",
//         //     minWidth: 100,
//         //     renderCell: (params) => (
//         //         <div className="d-flex gap-2">
//         //             {Block ?
//         //                 <Button className="text-white bg-warning border-warning" onClick={() => setBlock(false)}>Un-Block</Button>
//         //                 :
//         //                 <Button variant="contained" color="error" onClick={() => setBlock(true)}><BlockIcon /></Button>
//         //             }
//         //         </div>
//         //     ),
//         // },
//     ];

//     const CustomToolbar = () => {
//         return (
//             <GridToolbarContainer>
//                 <GridToolbarQuickFilter />
//                 <GridToolbarColumnsButton />
//                 <GridToolbarFilterButton />
//                 <GridToolbarExport />
//                 <GridToolbarDensitySelector />
//             </GridToolbarContainer>
//         );
//     };

//     // Add Employee form Handler 
//     // const [addEmployee, setAddEmployee] = useState(false)
//     // const ToggleAddMonthlyService = () => {
//     //     setAddEmployee(!addEmployee)
       
//     // }
//     return (
//         <Fragment>
//             {/* employee add form Modal  */}
//             <ModalComponent
//                 data={<AddMonthlyServices toggleModal={toggleModal} data={editData} />}
//                 modalTitle={editMode ? "Edit Monthly Service" : "Add Monthly Service"}
//                 modal={showModal}
//                 toggle={toggleModal}
//                 size={"xl"}
//             />

//             <div className='flex'>
//             <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}>Monthly Service</h4>

//             <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
//                 <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
//                 Add Monthly Service 
//                 </div>
//             </div>
//             </div>
//             <div className='p-4'>
//                 <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
//             </div>
        
//         </Fragment>
//     )
// }

// export default ManageMonthService