import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Input } from "reactstrap";
import axios from "axios";
import SelectBox from "../../Elements/SelectBox";
import CustomDataTable from "../../Elements/CustomDataTable";
import { GetAvailability } from "../../../Store/Actions/Dashboard/AvailabilityAction";
import { API_URL } from "../../../config";

const timeSlots = [
  "07:00-07:30", "07:30-08:00", "08:00-08:30", "08:30-09:00",
  "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00",
  "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-01:00",
  "01:00-01:30", "01:30-02:00", "02:00-02:30", "02:30-03:00",
  "03:00-03:30", "03:30-04:00", "04:00-04:30", "04:30-05:00",
  "05:00-05:30", "05:30-06:00"
];

const BaseAvailability = ({ availabilityType, title }) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.AvailabilityReducers[availabilityType]);
  
  // State management
  const [statusClasses, setStatusClasses] = useState({});
  const [filterDate, setFilterDate] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [getAllServiceProvider, setGetAllServiceProvider] = useState([]);
  const [serviceProvider, setServiceProvider] = useState('');
  // Toggle functions


    // Fetch order status
    const fetchStatus = useCallback(async (order_no) => {
      try {
        const response = await axios.get(`${API_URL}/order/getbyorderno/${order_no}`);
        const orderData = response?.data?.data;
        
        const statusMap = {
          0: "Pending-availability2",
          1: "Hold-availability2",
          2: "Due-availability2",
          3: "completed-cell2",
          4: "Running-availability2",
          5: "Cancel-availability2"
        };
  
        const status = statusMap[orderData?.pending] || '';
  
        setStatusClasses(prev => ({
          ...prev,
          [order_no]: {
            className: status,
            additionalData: {
              piadamt: orderData?.piadamt || '',
              service_name: orderData?.service_name,
              customer_name: orderData?.NewCustomer?.name
            }
          }
        }));
  
      } catch (error) {
        console.error("Error fetching order status", error);
        setStatusClasses(prev => ({
          ...prev,
          [order_no]: {
            className: '',
            additionalData: {
              piadamt: 'N/A',
              service_name: 'Unknown',
              customer_name: 'Unknown'
            }
          }
        }));
      }
    }, []);

  // Process data with IDs and calculate totals
// Process data with IDs and calculate totals
// Process data with IDs and calculate daily totals
const DataWithID = useCallback((data) => {
  if (!data) return [{ id: 0, totalAmount: '0.00' }];

  const newData = [];
  const dailyTotals = {}; // { date: { providerId: total } }

  // First pass: calculate daily totals for each provider
  data.forEach(item => {
    item.availabilities?.forEach(availability => {
      const date = availability.date;
      const providerId = item.id;
      
      // Initialize daily totals structure if not exists
      if (!dailyTotals[date]) {
        dailyTotals[date] = {};
      }
      
      if (!dailyTotals[date][providerId]) {
        dailyTotals[date][providerId] = {
          uniqueOrders: new Set(),
          total: 0
        };
      }

      // Track unique orders and their amounts
      const uniqueOrdersMap = {};

      // First, collect all unique orders from all time slots
      timeSlots.forEach(slot => {
        const value = availability[slot];
        if (value && value.includes('-') && !['leave', 'lunch', 'Week Off', 'Absent'].includes(value)) {
          // Split the value to get service name and order number
          const parts = value.split('-');
          if (parts.length >= 2) {
            const orderNo = parts[1];
            
            // If we have status info and it's not already in our uniqueOrdersMap
            if (orderNo && statusClasses[orderNo]?.additionalData && !uniqueOrdersMap[orderNo]) {
              const payment = parseFloat(statusClasses[orderNo].additionalData.piadamt) || 0;
              uniqueOrdersMap[orderNo] = payment;
            } else if (orderNo && !statusClasses[orderNo]) {
              fetchStatus(orderNo);
            }
          }
        }
      });

      // Now add up the unique order amounts
      Object.keys(uniqueOrdersMap).forEach(orderNo => {
        dailyTotals[date][providerId].uniqueOrders.add(orderNo);
        dailyTotals[date][providerId].total += uniqueOrdersMap[orderNo];
      });
    });
  });

  // Second pass: create rows with daily totals
  data.forEach(item => {
    const availabilities = item.availabilities || [];
    
    if (availabilities.length > 0) {
      availabilities.forEach(availability => {
        const date = availability.date;
        const processedTimeSlots = {};
        
        Object.keys(availability).forEach(key => {
          const value = availability[key];
          if (key.includes('-') && key.length > 5) {
            if (value && !['leave', 'lunch', 'Week Off', 'Absent'].includes(value)) {
              const [serviceName, orderNo] = value.split('-');
              if (orderNo && statusClasses[orderNo]?.additionalData) {
                processedTimeSlots[key] = `${serviceName}-${orderNo}-Amount-${statusClasses[orderNo].additionalData.piadamt}`;
              } else {
                processedTimeSlots[key] = value;
              }
            } else {
              processedTimeSlots[key] = value;
            }
          } else {
            processedTimeSlots[key] = '';
          }
        });

        newData.push({
          ...item,
          ...availability,
          ...processedTimeSlots,
          id: availability.id,
          date: availability.date || item.date, // Preserve the date from availability or item
          // Show daily total for this provider
          totalAmount: (dailyTotals[date]?.[item.id]?.total || 0).toFixed(2)
        });
      });
    } else {
      newData.push({ 
        ...item, 
        id: item.id,
        date: item.date, // Preserve the date from item
        totalAmount: '0.00'
      });
    }
  });

  return newData;
}, [statusClasses, fetchStatus, timeSlots]);

  // Cell class name determination
  const getCellClassName = useCallback((params) => {
    if (!params?.value) return 'Cancel-availability2';
    if (params.value === 'p') return 'class-green2';

    const specialClasses = {
      'Full day Leave': 'class-red2',
      'Lunch': 'class-red2',
      'lunch': 'class-red2',
      'Half Day Leave': 'class-red2',
      'Week Off': 'Cancel-availability2',
      'Absent': 'Cancel-availability2'
    };

    if (specialClasses[params.value]) return specialClasses[params.value];

    if (params.value?.includes("MonthlyService")) {
      const status = params.value.split('-').pop();
      return status === "completed" ? "completed-cell2" : 
             status === "pending" ? "Running-availability2" : "class-monthly2";
    }

    if (params.value?.includes('-')) {
      const orderNo = params.value.split('-')[1];
      return statusClasses[orderNo]?.className || '';
    }

    return '';
  }, [statusClasses]);



  // Filter data functions
  const FilterData = useCallback(() => {
    const filterParams = {
      from,
      to,
      emp_id: serviceProvider?.value,
      type: availabilityType
    };

    if (!from || !to || !serviceProvider?.value) return;
    dispatch(GetAvailability(filterParams));
  }, [from, to, serviceProvider, availabilityType, dispatch]);

  const FilterData2 = useCallback(() => {
    const filterParams = {
      ...filterDate,
      type: availabilityType
    };

    if (!filterDate) return;
    dispatch(GetAvailability(filterParams));
  }, [filterDate,statusClasses, availabilityType, dispatch]);

  // Fetch service providers
  const getAllServicesProvider = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/service-provider/getall`);
      if (response.status === 200) {
        const transformedData = response.data.data.map(item => ({ 
          label: item.name, 
          value: item.id 
        }));
        setGetAllServiceProvider(transformedData);
      }
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  }, []);

  // Columns configuration
  const columns = [
    { 
      field: "name", 
      headerName: "Name", 
      width: 150, 
      editable: true,  
      pinned: 'left' 
    },
    { 
      field: "provider_type", 
      headerName: "Provider Type", 
      width: 150, 
      editable: true,
      cellClassName: () => "class-gray"
    },
    { 
      field: "duty_hours", 
      headerName: "Duty Hours", 
      width: 150, 
      editable: true,
      cellClassName: () => "class-gray"
    },
    { 
      field: "date", 
      headerName: "Date", 
      width: 150, 
      editable: true,
      cellClassName: () => "class-gray"
    },
    ...timeSlots.map(slot => ({
      field: slot,
      headerName: `${slot.replace('-', ' ')} ${parseInt(slot.split(':')[0]) < 12 ? 'AM' : 'PM'}`,
      width: 150,
      cellClassName: getCellClassName
    })),
    { 
      field: "totalAmount", 
      headerName: "Total Amount", 
      width: 150,
      cellClassName: () => "class-gray",
      valueFormatter: (params) => `₹${params.value || '0.00'}`
    }
  ];

  // Initial data fetch
  useEffect(() => {
    getAllServicesProvider();
    dispatch(GetAvailability({ type: availabilityType }));
  }, [availabilityType, dispatch, getAllServicesProvider,statusClasses]);

  return (
    <Fragment>

      <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "30rem" }}>
        {title}
      </h4>

      <div className='d-flex p-3 px-4 justify-content-between'>
        <div className="d-flex">
          <Input 
            type="date" 
            className="px-3" 
            onChange={(e) => setFilterDate({...filterDate, date: e.target.value})}
          />
          <Button 
            variant='contained' 
            color='primary' 
            className="ml-4" 
            style={{width: "200px"}}  
            onClick={FilterData2}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full mb-3">
        <div className="flex justify-between gap-6 items-center">
          <div className="ml-4">
            <label htmlFor="startDate" className="text-light">From:</label>
            <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e) => setFrom(e.target.value)}/>
          </div>
          <div className="ml-4">
            <label htmlFor="endDate" className="text-light mr-2">To:</label>
            <Input id="endDate" type="date" onChange={(e) => setTo(e.target.value)}/>
          </div>
          <div className="ml-4" style={{width: '12rem'}}>
            <label className="form-label text-light ml-2 mr-2" htmlFor="serviceRemark">
              Service Provider
            </label>
            <SelectBox 
              options={getAllServiceProvider}
              setSelcted={setServiceProvider}
              selectOption={serviceProvider}
            />
          </div>
          <div className="ml-4" style={{marginTop: '32px'}}>
            <Button 
              className="btn btn-primary" 
              size="small" 
              variant="contained" 
              onClick={FilterData}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <CustomDataTable
          columns={columns}
          rows={DataWithID(data)}
          frozenFields={['name']}
        />
      </div>
    </Fragment>
  );
};

export default BaseAvailability;