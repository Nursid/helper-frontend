import React, { Fragment, useState, useEffect } from "react";
import AdminDataTable from "../../Elements/AdminDataTable";
import { useUserRoleContext } from "../../../Context/RolesContext";
import AdminNavItems from "../../Elements/AdminNavItems";
import AnimatedBackground from "../../Elements/AnimatedBacground";
// import { FaRegClock } from "react-icons/fa";
import { GetSupervisorAvailability } from "../../../Store/Actions/Dashboard/SupervisorAvailabilityAction";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import  AddAvailability  from "./form/AddAvailability";
import ModalComponent from "../../Elements/ModalComponent";
import moment from "moment";
import { Input } from "reactstrap";
import AdminHeader from "../AdminHeader";
import TransferAvailability from "./form/TransferAvailability";
import axios from "axios";
import { API_URL } from "../../../config";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import { GridToolbarQuickFilter, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from "@mui/x-data-grid";

const SupervisorAvailability = () => {

    const { userRole } = useUserRoleContext();
    const { data } = useSelector(state => state.SupervisorAvailabilityReducers)
    const [EmployeeAvailabilityModalOpen, setEmployeeAvailabilityModalOpen] = useState(false);
    const [field, setField] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [date, setDate] = useState("");
    const [transferData, setTransferData] = useState([])
    const [filterDate, setFilterDate] = useState({date: moment().format("YYYY-MM-DD")});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSupervisorAvailability(filterDate))
    }, []);
   
    const [Toggle, setToggle] = useState(false);
    const toggleAddAvailability = () => setToggle(!Toggle);
   
    const [isTransfer, setToggleTransfer] = useState(false);
    const toggleTransfer = () => setToggleTransfer(!isTransfer);
    const toggleTransferData = (data) => {
        setTransferData(data);
        toggleTransfer();
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

    const DataWithID = (data) => {
        const NewData = [];  
        if (data !== undefined) {
            for (let item of data) {
                // Extract availabilities
                const availabilities = item.supervisor_availabilities;
                
                if (availabilities.length > 0) {
                    for (let availability of availabilities) {
                        // Merge item with availability details
                        let mergedItem = { ...item, ...availability };
                        NewData.push({
                            ...mergedItem,
                            id: data.indexOf(item),
                            date: moment(availability.date).format("DD-MM-YYYY"),
                             "01:00-01:30": availability["01:00-01:30"] === 'leave' ? 'leave' : 'lunch'
                        });
                    }
                } else {
                    NewData.push({ ...item, id: data.indexOf(item) });
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
      if (!params?.value) return 'class-green'; // Ensure value exists
  

      if (params.value === 'Full day Leave' || params.value === 'Lunch' || params.value === 'lunch' || params.value === 'Half Day Leave') {
        return 'class-red';
      }

      if (params?.value === "Week Off" || params?.value === "Absent") {
        return "Cancel-availability";
      }

      if (params?.value?.includes("MonthlyService")) {
        return "class-monthly";
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
          0: "Running-availability",
          1: "Hold-availability",
          2: "Due-availability",
          3: "Running-availability",
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

        // {
        //     field: "status",
        //     headerName: "Status",
        //     renderCell: (params) => (
        //         <Button 
        //         variant='contained' 
        //         color='primary' 
        //         onClick={() => toggleTransferData(params.row)}
        //       >
        //         Transfer
        //       </Button>
        //     ),
        //     minWidth: 100,
        //     editable: true,
        // },
        { field: "id",  headerName: "Sr No", minWidth: 150, editable: true},

        { field: "name",  headerName: "Name", minWidth: 150, editable: true},
         {
          field: "image", headerName: "Image", minWidth: 120, renderCell: (params) => (
              <div className='w-80 h-80 rounded-circle'>
                 <img src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" alt="Image" style={{ width: "40px", height: "40px" }} />
              </div>
          )
      },
        { field: "date",  headerName: "Date", minWidth: 150, editable: true
         },
          {
            field: "07:00-07:30",
            headerName: "07:00-07:30 AM",
            minWidth: 150,
            cellClassName: getCellClassName
        },
        {
          field: "07:30-08:00",
          headerName: "07:30-08:00 AM",
          minWidth: 150,
          cellClassName: getCellClassName
      },
      {
        field: "08:00-08:30",
        headerName: "08:00-08:30 AM",
        minWidth: 150,
        cellClassName: getCellClassName
    },
        {
          field: "08:30-09:00",
          headerName: "08:30-09:00 AM",
          minWidth: 150,
          cellClassName: getCellClassName
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

        {/* <AssignEmployeeAvailability
            EmployeeAvailabilityModalOpen={EmployeeAvailabilityModalOpen}
            EmployeeAvailabilityModalfunction={() => setEmployeeAvailabilityModalOpen(!EmployeeAvailabilityModalOpen)}
            field={field}
            mobile_no={mobileNo}
            date={date}
        /> */}


                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "25rem", minWidth: "25rem" }}>Supervisor Availability</h4>

                

            <div className='d-flex p-3 px-4 justify-content-between'>

            <div className="d-flex">
                <Input type="date" className="px-3" 
                onChange={(e)=>setFilterDate({...filterDate,date: e.target.value})}
                
                />
                <Button variant='contained' color='primary' className="ml-4" style={{width: "200px"}}  onClick={()=>dispatch(GetSupervisorAvailability(filterDate))}> Search </Button>

                </div>

            {/*
              <div className={`border py-2 px-2  shadow rounded-2 cursor-p hoverThis text-white`}
                 onClick={toggleAddAvailability}
                >
                Add Leave
                </div>
            */} 
            
            </div>

            <div className="p-4">
                <AdminDataTable rows={DataWithID(data)} columns={colums}  CustomToolbar={CustomToolbar} />
            </div>
            </Fragment>
    )
}

export default SupervisorAvailability;