
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
import { SupervisorAttendanceReport } from "../../../Store/Actions/Dashboard/AttendanceAction/SupervisorAttendanceReport";

export default function Attendance() {
 
    const { userRole } = useUserRoleContext();
    const dispatch = useDispatch() 
    const [date, setDate] = useState('')
    const { data, isSuccess } = useSelector(state => state.AttendanceReportReducers);
    const [attendanceData, setAttendanceData] = useState([{id: 0}]);
    const [GetAllSupervisorData, setGetAllSupervisor] = useState([])

    const DataWithID = (data) => {
      const NewData = [];
      if (data !== undefined) {
       for (let item of data) {
          NewData.push({
            ...item,
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
    try {
      GetAllSupervisor(date);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    const date = moment().format('YYYY-MM-DD');
    GetAllSupervisor(date);
  }, []);

const GetAllSupervisor = async (date) => {
  const response = await axios.post(API_URL + '/attendance/getall', {
    date: date
  })
  if (response.status === 200) {
    setAttendanceData(response.data.data);
  }
}

    const columns = [
      { field: "id", headerName: "Sr No.", flex: 1, minWidth: 120, editable: false },
      { field: "name", headerName: "Name", flex: 1, minWidth: 120, editable: false },
      { field: "role", headerName: "Work Profile", flex: 1, minWidth: 120, editable: false },
      { field: "mobile_no", headerName: "Mobile", flex: 1, minWidth: 120, editable: false },
      { field: "in_date", headerName: "Date", flex: 1, minWidth: 120, editable: false },
      { field: "check_in", headerName: "Check In", minWidth: 80, flex: 1, editable: false },
      { field: "check_out", headerName: "Check Out", flex: 1, minWidth: 120, editable: false },
      { field: "status", headerName: "Attendace Status", flex: 1, minWidth: 120, editable: false },
    ];
    


return(
    <>
        <Fragment>
        <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "32rem", minWidth: "32rem" }}> Attendance Reports</h4>

        <div className="flex flex-col justify-between w-full mb-3 ">
                <div className="flex justify-between gap-6 items-center">
                <div className="ml-4">
                    <label htmlFor="startDate" className="text-light">Date:</label>
                    <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e)=>setDate(e.target.value)}/>
                 </div>
               
                    <div className="ml-4" style={{marginTop: '32px'}}>
                    <Button className="btn btn-primary" size="small" variant="contained" onClick={FilterData}>
                    Search
                    </Button>
                </div>
            </div>
        </div>  

    <AdminDataTable rows={DataWithID(attendanceData)} CustomToolbar={CustomToolbar} columns={columns} />
    </Fragment>
    </>
)}