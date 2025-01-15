import React, { Fragment, useState, useEffect } from "react";
import AdminDataTable from "../../Elements/AdminDataTable";
import { useUserRoleContext } from "../../../Context/RolesContext";
import AdminNavItems from "../../Elements/AdminNavItems";
import AnimatedBackground from "../../Elements/AnimatedBacground";
// import { FaRegClock } from "react-icons/fa";
import { GetAvailability } from "../../../Store/Actions/Dashboard/AvailabilityAction";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Input } from "reactstrap";
import axios from "axios";
import { API_URL , IMG_URL} from "../../../config";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import { GridToolbarQuickFilter, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from "@mui/x-data-grid";
import { BiExport } from "react-icons/bi";
import MonthlySchedule from "../../MonthlySchedule";

const CarSchedule = () => {

    
    const [data, setData] = useState([]);
    
    const dispatch = useDispatch();
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
          <Button
            onClick= {() => {
              MonthlySchedule(colums, DataWithID(data),);
            }}
            className="btn btn-primary"
            size="sm"
            >
            <BiExport className="mr-2" />
            Export
            </Button>
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
          return "";
        }

        const DataWithID = (data) => {
            const NewData = [];
        
            if (data !== undefined) {
                for (let item of data) {
                    NewData.push({
                        ...item,
                        id: data.indexOf(item) + 1, // Generate a unique ID based on index
                        [item.selectedTimeSlot]: `${item.cust_name} - ${item.orderNo} - ${getStatusByKey(item.pending)}`,
                    });
                }
            } else {
                // If data is not an array or undefined
                NewData.push({ id: 0 });
            }
        
            return NewData;
        };
        

    const getCellClassName = (params) => {
      if(!params.value) {
        return 'completed-cell';
      }
      const parts = params.value.split(" - ");
      const lastData = parts[parts.length - 1];
      if (lastData === "Pending") {
        return 'pending-cell';
      } else if (lastData === "Hold") {
        return 'hold-cell';
      } else if (lastData === "Due") {
        return 'due-cell';
      } else if (lastData === "Completed") {
        return 'completed-cell';
      } else if (lastData === "Running") {
        return 'running-cell';
      } else if (lastData === "Cancel") {
        return 'cancel-cell';
      }
      return lastData;
    };

  
    const fetchData = async () => {
      try {
        const GetStatus = await axios.get(`${API_URL}/monthly-service/get-daily-schedule`);
        setData(GetStatus?.data?.result);
      } catch (error) {
        console.error("Error fetching order status", error);
        return [];
      }
    };
    

   
    const colums = [

        { field: "name",  headerName: "Name", minWidth: 150, cellClassName: 'cancel-cell'},
        
        { field: "optional",  headerName: "Optional", minWidth: 150, editable: true},
       
        { field: "bike_no",  headerName: "Scooty No.", minWidth: 150, editable: true
         },
        { field: "check_in",  headerName: "Check In", minWidth: 150, editable: true
         },
        { field: "check_out",  headerName: "Check Out", minWidth: 150, editable: true
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


 
    useEffect(()=> {
      fetchData()
    }, [])


    return (
        <Fragment>

                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "30rem", minWidth: "30rem" }}>Daily Schedule</h4>
            
            
            <div className="p-4">
                <AdminDataTable rows={DataWithID(data)} columns={colums}  CustomToolbar={CustomToolbar} />
            </div>
            </Fragment>
    )
}

export default CarSchedule;