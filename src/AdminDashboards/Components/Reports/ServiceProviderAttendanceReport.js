
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
import  ServiceProviderAttendanceReport  from "../../../Store/Actions/Dashboard/AttendanceAction/ServiceProviderAttendanceReports";


export default function ServiceProviderAttendanceReports() {
 
    const { userRole } = useUserRoleContext();
    const dispatch = useDispatch() 
	  const [supervisor, setSupervisor] = useState('');
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const { data, isSuccess } = useSelector(state => state.ServiceProviderAttendanceReportReducers);
    const [attendanceData, setAttendanceData] = useState([{id: 0}]);
    const [GetAllSupervisorData, setGetAllSupervisor] = useState([])

    const DataWithID = (data) => {
      const NewData = [];
      if (data !== undefined) {
        for (let item of data) {
          const employee = item.service_provider || {}; // Ensure NewCustomer is an object
          const mergedItem = { ...item, ...employee };
         
          NewData.push({
            ...mergedItem,
            id: data.indexOf(item),
          });
        }
      } else {
        NewData.push({ id: 0 });
      }
      return NewData;
    };

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

      
  const FilterData = async () => {
    const data ={
      from: from,
      to: to,
      emp_id: supervisor?.value
    }
    try {
      dispatch(ServiceProviderAttendanceReport(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    dispatch(ServiceProviderAttendanceReport());
    GetAllSupervisor();
  }, []);

const GetAllSupervisor = async () => {
  const response = await axios.get(API_URL + '/service-provider/getall')
  if (response.status === 200) {
    const transformedData = response.data.data.map(item => ({label: item.name, value: item.id}));
    setGetAllSupervisor(transformedData);
  }
}

    const columns = [
      { field: "in_date", headerName: "In Date", flex: 1, minWidth: 120, editable: false },
      { field: "name", headerName: "Supervisor Name", flex: 1, minWidth: 120, editable: false },
      { field: "status", headerName: "Attendance Mark", flex: 1, minWidth: 120, editable: false },
      { field: "check_in", headerName: "Check In", minWidth: 80, flex: 1, editable: false },
      { field: "out_date", headerName: "Out Date", minWidth: 80, flex: 1, editable: false },
      { field: "check_out", headerName: "Check Out", flex: 1, minWidth: 120, editable: false },
      { field: "createdby", headerName: "Created By", flex: 1, minWidth: 120, editable: false },
      { field: "message", headerName: "Remark", flex: 1, minWidth: 120, editable: false },    
    ];
    


return(
    <>
        <Fragment>
        <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "24rem", minWidth: "24rem" }}>Service Provider Attendance Reports</h4>

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
                                <SelectBox options={GetAllSupervisorData}
                                    setSelcted={setSupervisor}
                                    selectOption={supervisor}/>
                    </div>
                    <div className="ml-4" style={{marginTop: '32px'}}>
                    <Button className="btn btn-primary" size="small" variant="contained" onClick={FilterData}>
                    Search
                    </Button>
                </div>
            </div>
        </div>  
    <AdminDataTable rows={DataWithID(data)} CustomToolbar={CustomToolbar} columns={columns} />
    </Fragment>
    </>
)}