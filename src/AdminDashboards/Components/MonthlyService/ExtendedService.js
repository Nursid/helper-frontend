import React, { Fragment, useEffect, useState, useRef } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom/dist'
import ModalComponent from '../../Elements/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
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

const ExtendedService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [monthlyServices, setMonthlyServices] = useState([])
    const [loading, setLoading] = useState(false)
    const [processingOrderId, setProcessingOrderId] = useState(null)
    const { currentUser, setCurrentUser } = useAuth();
    
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
            // For the latest services API, we don't need to group by orderNo
            // since we're already getting the latest record for each orderNo
            for (let item of data) {
                NewData.push({
                    ...item,
                    _id: data.indexOf(item),
                    date: moment(item.feesPaidDateTime).format("DD-MM-YYYY"),
                    pending: getStatusByKey(item.pending),
                });
            }
        } else {
            NewData.push({ id: 0 });
        }
    
        return NewData;
    };
    
    // Handle ExtendedService action
    const handleExtendedService = async (rowData) => {
        setProcessingOrderId(rowData.orderNo);
        try {
            Swal.fire({
                title: 'Confirm Extension',
                text: `Are you sure you want to extend the service for ${rowData.cust_name}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, extend it!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Create payload from existing data
                    const payload = {
                        ...rowData,
                        feesPaidDateTime: moment(rowData.date, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm') // Use the date from rowData in the format 'YYYY-MM-DDTHH:mm'
                    };
                    
                    delete payload.pending;
                    delete payload.date;
                    delete payload._id;
                    delete payload.id;
                    
                    const response = await axios.post(`${API_URL}/monthly-service/add`, payload);
                    
                    if (response.data.status) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Service extended successfully!',
                            icon: 'success'
                        });
                        
                        // Refresh data
                        fetchLatestMonthlyServices();
                    } else {
                        throw new Error(response.data.message || 'Failed to extend service');
                    }
                }
            });
        } catch (error) {
            console.error("Error extending service:", error);
            Swal.fire({
                title: 'Error',
                text: error.message || 'An error occurred while extending the service.',
                icon: 'error'
            });
        } finally {
            setProcessingOrderId(null);
        }
    };
    
    // Extract fetchLatestMonthlyServices into a named function to be able to call it from handleExtendedService
    const fetchLatestMonthlyServices = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/monthly-service/getLatestMonthlyServices`);
            if (response.data.status === 200) {
                setMonthlyServices(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching latest monthly services:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch monthly services'
            });
        } finally {
            setLoading(false);
        }
    };
        
    useEffect(() => {
        fetchLatestMonthlyServices();
    }, []);

    const column = [  
        { field: "cust_name", headerName: "Customer Name", minWidth: 120 },
        { field: "mobile_no", headerName: "Mobile", minWidth: 120 },
        { field: "date", headerName: "Date", minWidth: 120 },
        { field: "orderNo", headerName: "OrderNo ", minWidth: 120 },
        { field: "serviceType", headerName: "Service ", minWidth: 120 },
        { field: "serviceServeType", headerName: "Monthly Service Type", minWidth: 120 },
        { field: "selectedTimeSlot", headerName: "Time Slot", minWidth: 120  },
        { field: "service_provider", headerName: "Service Provider", minWidth: 120 },
        { field: "supervisor", headerName: "Supervisor", minWidth: 120 },  
        {
            field: "action",
            headerName: "Action",
            minWidth: 550,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button 
                        variant="contained" 
                        color="info"
                        onClick={() => handleExtendedService(params.row)}
                        disabled={processingOrderId === params.row.orderNo}
                    >
                        {processingOrderId === params.row.orderNo ? 
                            'Processing...' : 'ExtendedService'}
                    </Button>                
                </div>
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

    return (
        <Fragment>
            <div className='position-relative'>
                <AnimatedBackground />
                <div className='BackgroundTopContents'>
                    <div className='flex' style={{ justifyContent: "flex-start", width: "100%" }}>
                        <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "40rem", minWidth: "20rem" }}>Monthly ExtendedService</h4>
                    </div>

                    <div className='p-4'>
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <CollapseDatatable rows={DataWithID(monthlyServices)} columns={column} CustomToolbar={CustomToolbar} />
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ExtendedService

