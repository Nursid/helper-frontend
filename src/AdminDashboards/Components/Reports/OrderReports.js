
import { Fragment, useEffect, useState } from "react"
import AdminDataTable from "../../Elements/AdminDataTable"
import { useUserRoleContext } from "../../../Context/RolesContext";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar, GridToolbarDensitySelector, GridToolbarExportContainer, GridToolbarFilterButton, GridToolbarQuickFilter,GridToolbarColumnsButton, GridToolbarContainer,GridToolbarExport  } from "@mui/x-data-grid";
import GetAllOrders from "../../../Store/Actions/Dashboard/Orders/OrderAction";
import Tooltip from '@mui/material/Tooltip';
import { Form, Row, Col, Card, FormGroup, Label, Input,Table, Modal,
    ModalHeader, ModalBody, Button } from 'reactstrap';
import ColoredBtn from "../../Elements/ColoredBtn";
import axios from "axios";
import { API_URL } from "../../../config";
import SelectBox from "../../Elements/SelectBox";

export default function OrderReports() {

 
    const { userRole } = useUserRoleContext();
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [GetAllServiceProvider, setAllServiceProvider] = useState([]);
	  const [serviceProvider, setServiceProvider] = useState('');
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

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
            const customer = NewCustomer.customer || {}; // Ensure customer is an object
            const mergedItem = { ...item, ...NewCustomer, ...customer };
            NewData.push({
              ...mergedItem,
              pending: getStatusByKey(item.pending),
              _id: data.indexOf(item),
              date: moment(item.createdAt).format("D / M / Y"),
              bookdate: moment(item.bookdate).format("DD-MM-YYYY"),
              booktime: moment(item.booktime, ["hh:mm:ss A", "hh:mm"]).format("HH:mm"),
              userRole: userRole
            });
          }
        } else {
          NewData.push({ id: 0 });
        }
        return NewData;
      };

      
  const FilterData = async () => {
    const data ={
      from: from,
      to: to,
      serviceProvider: serviceProvider?.value
    }
  
    try {
      const response = await axios.post(`${API_URL}/order/reports/6`, data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    FilterData();
    getAllServices();
  }, []);

    const columns = [
        { field: "member_id", headerName: "Member ID", minWidth: 120, editable: true,  },
        { field: "order_no", headerName: "Order Number", minWidth: 120, editable: true },
        { field: "name", headerName: "Customer Name",minWidth: 150, editable: true },
        { field: "mobileno", headerName: "Mobile",minWidth: 150, editable: true },
        { field: "user_type", headerName: "Type", minWidth: 80, editable: true },
        { field: "service_name", headerName: "Service Type",minWidth: 150, editable: true },
        { field: "booktime", headerName: "Booking Time", minWidth: 120, editable: true },
        { field: "bookdate", headerName: "Booking Date", minWidth: 120, editable: true },
        { field: "problem_des", headerName: "Service Description ", minWidth: 150, editable: true, renderCell: (params) => (
            <Tooltip title={params.value}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {params.value}</div>
            </Tooltip>
        ) },    { field: "allot_time_range", headerName: "Alloted Time Slot ", minWidth: 150, editable: true },
        { field: "suprvisor_id", headerName: "Supervisor", minWidth: 200, editable: true },
    
        { field: "servicep_id", headerName: "Service Provider",minWidth: 200, editable: true },

        { field: "netpayamt", headerName: "Billing Amount",
        minWidth: 150 },
        { field: "paymethod", headerName: "Payment Method", minWidth: 150},
        { field: "piadamt", headerName: "Paid Amount", minWidth: 150 },
        { field: "totalamt", headerName: "Balance Amount", minWidth: 150},
        { field: "cust_remark", headerName: "Customer Feedback", minWidth: 150 },
        { field: "bakof_remark", headerName: "Back Office Remark",
        minWidth: 180, editable: true},
    
        { field: "suerv_remark", headerName: "Supervisor Remark",
        minWidth: 150, editable: true },
    
        { field: "servp_remark",
            headerName: "Service Provider Remark",
            minWidth: 180,
            editable: true,
        },
        { field: "pending", headerName: "Order Status", minWidth: 150, editable: true },
        { field: "cancle_reson", headerName: "Cancel Reason", minWidth: 150, editable: true },
         
    
        ];
      


        const getAllServices = async () => {
          const response = await axios.get(API_URL + '/service-provider/getall')
          
          if (response.status === 200) {
            const transformedData = response.data.data.map(item => ({ label: item.name, value: item.name })); 
              setAllServiceProvider(transformedData);
          }
        }


    return(
        <>
         <Fragment>
         <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> All Order List</h4>

      <div className="flex flex-col justify-between w-full mb-3 ">
            <div className="flex justify-between gap-6 items-center">
              <div className="ml-4">
                <label htmlFor="startDate" className="text-light">From:</label>
                <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e)=>setFrom(e.target.value)}/>
          </div>
                <div className="ml-4">
                <label htmlFor="endDate"  className="text-light mr-2" >To:</label>
                <Input id="endDate" type="date" onChange={(e)=>setTo(e.target.value)}/>
          </div>
              <div className="ml-4" style={{width: '12rem'}}>
							<label className="form-label text-light ml-2 mr-2" htmlFor="serviceRemark">
								 Service Provider
							</label>
							<SelectBox options={GetAllServiceProvider}
								setSelcted={setServiceProvider}
								selectOption={serviceProvider}/>
                </div>
                <div className="ml-4" style={{marginTop: '32px'}}>
                <Button className="btn btn-primary" size="small" variant="contained" onClick={FilterData}>
                  Search
                </Button>
              </div>
            </div>
        </div>  

         <AdminDataTable
              rows={DataWithID(data.data)}
              CustomToolbar={CustomToolbar}
              columns={columns}
                />
                        
         </Fragment>
        </>
    )
}