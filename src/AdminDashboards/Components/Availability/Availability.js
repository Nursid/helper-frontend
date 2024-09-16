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
import AdminHeader from "../AdminHeader";
import TransferAvailability from "./form/TransferAvailability";
import axios from "axios";
import { API_URL } from "../../../config";
const Availability = () => {

    const { userRole } = useUserRoleContext();
    const { data } = useSelector(state => state.AvailabilityReducers)
    const [EmployeeAvailabilityModalOpen, setEmployeeAvailabilityModalOpen] = useState(false);
    const [field, setField] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [date, setDate] = useState("");
    const [transferData, setTransferData] = useState([])
    const [filterDate, setFilterDate] = useState({date: moment().format("YYYY-MM-DD")});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAvailability(filterDate))
    }, []);
   
    const [Toggle, setToggle] = useState(false);
    const toggleAddAvailability = () => setToggle(!Toggle);
   
    const [isTransfer, setToggleTransfer] = useState(false);
    const toggleTransfer = () => setToggleTransfer(!isTransfer);
    const toggleTransferData = (data) => {
        setTransferData(data);
        toggleTransfer();
    }

    const DataWithID = (data) => {
        const NewData = [];  
        if (data !== undefined) {
            for (let item of data) {
                // Extract availabilities
                const availabilities = item.availabilities;
                
                if (availabilities.length > 0) {
                    for (let availability of availabilities) {
                        // Merge item with availability details
                        let mergedItem = { ...item, ...availability };
                        NewData.push({
                            ...mergedItem,
                            id: item.id,
                            date: moment(availability.date).format("DD-MM-YYYY"),
                             "01:00-01:30": availability["01:00-01:30"] === 'leave' ? 'leave' : 'lunch'
                        });
                    }
                } else {
                    NewData.push({ ...item, id: item.id });
                }
            }
        } else {
            NewData.push({ id: 0 });
        }
        
        return NewData;
    };

    const AssignDate = (field, data) =>{
        setField(field);
        setMobileNo(data.emp_id)
        setDate(moment(data.date, "DD-MM-YYYY").format("YYYY-MM-DD")) 
        setEmployeeAvailabilityModalOpen(!EmployeeAvailabilityModalOpen);
    }

   

    const [statusClasses, setStatusClasses] = useState({}); // Cache for order statuses

    const getCellClassName = (params) => {
      if (!params?.value) return ''; // Ensure value exists
  
      if (params?.value?.includes("MonthlyService")) {
        return "bg-primary";
      }
  
      if (params.value === 'leave' || params.value === 'Lunch') {
        return 'class-red';
      }
  
      if (params?.value && !params.value.includes("MonthlyService")) {
        const splitValue = params.value.split('-');  // Split by '-'
        const numericPart = splitValue[1];           // Get the second part (the number)
  
        const statusAvailability = statusClasses[numericPart]; // Check cache first
  
        if (!statusAvailability) {
          // If not cached, fetch the status asynchronously
          fetchStatus(numericPart);
          return ''; // Return empty string until status is fetched
        }
  
        return statusAvailability; // Return cached status
      }
  
      return '';
    };
  
    const fetchStatus = async (order_no) => {
      try {
        const GetStatus = await axios.get(`${API_URL}/order/getbyorderno/${order_no}`);
        const pendingStatus = GetStatus?.data?.data?.pending;
  
        const statusMap = {
          0: "Pending-availability",
          1: "Hold-availability",
          2: "Due-availability",
          3: "class-green",
          4: "Running-availability",
          5: "Cancel-availability"
        };
  
        const status = statusMap[pendingStatus] || ''; // Map status to class name
  
        // Update state and cache the result for future use
        setStatusClasses((prev) => ({
          ...prev,
          [order_no]: status
        }));
      } catch (error) {
        console.error("Error fetching order status", error);
        setStatusClasses((prev) => ({
          ...prev,
          [order_no]: '' // Cache empty string in case of error
        }));
      }
    };
      
    const colums = [

        {
            field: "status",
            headerName: "Status",
            renderCell: (params) => (
                <Button 
                variant='contained' 
                color='primary' 
                onClick={() => toggleTransferData(params.row)}
              >
                Transfer
              </Button>
            ),
            minWidth: 100,
            editable: true,
        },

        { field: "name",  headerName: "Name", minWidth: 150, editable: true,
         },
        { field: "provider_type",  headerName: "Provider Type", minWidth: 100, editable: true},
        { field: "date",  headerName: "Date", minWidth: 150, editable: true
         },
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
            <AdminHeader />
        <ModalComponent
            modalTitle={"Add Leave"}
            modal={Toggle}
            toggle={toggleAddAvailability}
            data={<AddAvailability prop={toggleAddAvailability}  />}
        />

        <ModalComponent
            modalTitle={"Transfer"}
            modal={isTransfer}
            toggle={toggleTransfer}
            data={<TransferAvailability prop={toggleTransfer} transferData={transferData} />}
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

                <div className={`border py-2 px-2  shadow rounded-2 cursor-p hoverThis text-white`}
                 onClick={toggleAddAvailability}
                >
                Add Leave
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