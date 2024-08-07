import React, { Fragment, useState, useEffect } from "react";
import AdminDataTable from "../../Elements/AdminDataTable";
import { useUserRoleContext } from "../../../Context/RolesContext";
import AdminNavItems from "../../Elements/AdminNavItems";
import AnimatedBackground from "../../Elements/AnimatedBacground";
// import { FaRegClock } from "react-icons/fa";
import { GetAvailability } from "../../../Store/Actions/Dashboard/AvailabilityAction";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import  AddAvailability  from "./form/AddAvailability";
import ModalComponent from "../../Elements/ModalComponent";
import moment from "moment";
import { AssignEmployeeAvailability } from "../../../Components/Modal";
import { Input } from "reactstrap";
const Availability = () => {

    const { userRole } = useUserRoleContext();
    const { data } = useSelector(state => state.AvailabilityReducers)
    const [EmployeeAvailabilityModalOpen, setEmployeeAvailabilityModalOpen] = useState(false);
    const [field, setField] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [date, setDate] = useState("");
    const [filterDate, setFilterDate] = useState({date: moment().format("YYYY-MM-DD")});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAvailability(filterDate))
    }, []);
   
    const [Toggle, setToggle] = useState(false);
    const toggleAddAvailability = () => setToggle(!Toggle);

    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                NewData.push({ ...item, _id: data.indexOf(item)})
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    const AssignDate = (field, data) =>{
        setField(field);
        setMobileNo(data.emp_id)
        setDate(moment(data.date, "DD-MM-YYYY").format("YYYY-MM-DD")) 
        setEmployeeAvailabilityModalOpen(!EmployeeAvailabilityModalOpen);
    }

    const getCellClassName = (params) => {
        if (!params.field) {
          return 'class-green';
        }
        if (params.value === 'leave' || params.value === 'Lunch') {
          return 'class-red';
        }
        if (params.field && !params.value) {
          return 'class-green';
        }
        if (params.field) {
          return 'class-yellow';
        }
        return '';
      };
      
  
    const colums = [
        { field: "name",  headerName: "Name", minWidth: 150, editable: true,
            cellClassName: getCellClassName
         },
        { field: "provider_type",  headerName: "Provider Type", minWidth: 100, editable: true ,cellClassName: getCellClassName},
        {
            field: "09:00-09:30",
            headerName: "09:00-09:30 AM",
            minWidth: 150,
            cellClassName: getCellClassName
        },
        { field: "09:30-10:00", headerName: "09:30-10:00 AM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "10:00-10:30", headerName: "10:00-10:30 AM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "10:30-11:00", headerName: "10:30-11:00 AM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "11:00-11:30", headerName: "11:00-11:30 AM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "11:30-12:00", headerName: "11:30-12:00 AM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "12:00-12:30", headerName: "12:00-12:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "12:30-01:00", headerName: "12:30-01:00 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "01:00-01:30", headerName: "01:00-01:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "01:30-02:00", headerName: "01:30-02:00 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "02:00-02:30", headerName: "02:00-02:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "02:30-03:00", headerName: "02:30-03:00 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "03:00-03:30", headerName: "03:00-03:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "03:30-04:00", headerName: "03:30-04:00 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "04:00-04:30", headerName: "04:00-04:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "04:30-05:00", headerName: "04:30-05:00 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "05:00-05:30", headerName: "05:00-05:30 PM ", minWidth: 150, cellClassName: getCellClassName},
        { field: "05:30-06:00", headerName: "05:30-06:00 PM ", minWidth: 150, cellClassName: getCellClassName},
    ]

    return (
        <Fragment>
        <ModalComponent
        modalTitle={"Add Availability"}
        modal={Toggle}
        toggle={toggleAddAvailability}
        data={<AddAvailability prop={toggleAddAvailability}  />}
      />
        <AssignEmployeeAvailability
            EmployeeAvailabilityModalOpen={EmployeeAvailabilityModalOpen}
            EmployeeAvailabilityModalfunction={() => setEmployeeAvailabilityModalOpen(!EmployeeAvailabilityModalOpen)}
            field={field}
            mobile_no={mobileNo}
            date={date}
        />

              <div className="position-relative">

              <AnimatedBackground />
        <div className="BackgroundTopContents" style={{ overflowX: "hidden" }}>
                {userRole && userRole.Dashboard ? <AdminNavItems /> : null}
                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "fit-content" }}>Availability List</h4>

            <div className='d-flex p-3 px-4 justify-content-between'>

            <div className="d-flex">
                <Input type="date" className="px-3" 
                onChange={(e)=>setFilterDate({...filterDate,date: e.target.value})}
                
                />
                <Button variant='contained' color='primary' className="ml-4" style={{width: "200px"}}  onClick={()=>dispatch(GetAvailability(filterDate))}> Search </Button>

                </div>

                <div className={`border py-2 px-4  shadow rounded-2 cursor-p hoverThis text-white`} style={{ minWidth: "15rem", maxWidth: "17rem" 
                 }} 
                 onClick={toggleAddAvailability}
                >
                Add Employee Availability
                </div>

                

            </div>

            <div className="p-4">
                <AdminDataTable rows={DataWithID(data)} columns={colums}  />
            </div>
        </div>
        </div>
            </Fragment>
    )
}

export default Availability;