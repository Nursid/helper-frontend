import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@mui/material';
import axios from "axios";
import { GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from "@mui/x-data-grid";
import AdminDataTable from "../../Elements/AdminDataTable";
import { useUserRoleContext } from "../../../Context/RolesContext";
import { GetAvailability } from "../../../Store/Actions/Dashboard/AvailabilityAction";
import { API_URL, IMG_URL } from "../../../config";

const Test = ({ availabilityType, title }) => {
    const { userRole } = useUserRoleContext();
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.AvailabilityReducers[availabilityType]);
    const [transferData, setTransferData] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [getAllServiceProvider, setGetAllServiceProvider] = useState([]);
    const [serviceProvider, setServiceProvider] = useState('');
    const statusClassesRef = useRef({}); // Cache for regular orders
    const statusClasses2Ref = useRef({}); // Cache for monthly services

    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );

    const DataWithID = useCallback((data) => {
        return data?.flatMap(item => item.availabilities.length > 0
            ? item.availabilities.map(availability => ({
                ...item,
                ...availability,
                id: availability.id,
                "01:00-01:30": availability["01:00-01:30"] === 'leave' ? 'leave' : 'lunch'
            }))
            : [{ ...item, id: item.id }]
        ) || [{ id: 0 }];
    }, []);

    const fetchStatus = useCallback(async (order_no) => {
        if (statusClassesRef.current[order_no]) return; // Skip if already cached

        try {
            const response = await axios.get(`${API_URL}/order/getbyorderno/${order_no}`);
            const statusMap = ["Pending-availability", "Hold-availability", "Due-availability", "completed-cell", "Running-availability", "Cancel-availability"];
            const status = statusMap[response?.data?.data?.pending] || '';
            statusClassesRef.current[order_no] = status; // Cache the result
        } catch (error) {
            console.error("Error fetching order status", error);
            statusClassesRef.current[order_no] = ''; // Cache empty string in case of error
        }
    }, []);

    const fetchStatus2 = useCallback(async (order_no, date) => {
        const cacheKey = `${order_no}-${date}`;
        if (statusClasses2Ref.current[cacheKey]) return; // Skip if already cached

        try {
            const response = await axios.post(`${API_URL}/monthly-service/get-monthlyservice`, {
                orderNo: order_no,
                date: date
            });
            const statusMap = {
                0: "Pending-availability",
                1: "Hold-availability",
                2: "Due-availability",
                3: "completed-cell",
                4: "Running-availability",
                5: "Cancel-availability"
            };
            const status = statusMap[response?.data?.data?.pending] || '';
            statusClasses2Ref.current[cacheKey] = status; // Cache the result
        } catch (error) {
            console.error("Error fetching monthly service status", error);
            statusClasses2Ref.current[cacheKey] = ''; // Cache empty string in case of error
        }
    }, []);

    const getCellClassName = useCallback((params) => {
        if (!params?.value) return 'Cancel-availability';
        if (params.value === 'p') return 'class-green';
        if (['Full day Leave', 'Lunch', 'lunch', 'Half Day Leave'].includes(params.value)) return 'class-red';
        if (["Week Off", "Absent"].includes(params?.value)) return "Cancel-availability";

        if (params?.value?.includes("MonthlyService")) {
            const numericPart = 'MORDN - ' + params.value.split("-").pop();
            const cacheKey = `${numericPart}-${params.row.date}`;
            if (!statusClasses2Ref.current[cacheKey]) {
                fetchStatus2(numericPart, params.row.date); // Fetch if not cached
                return '';
            }
            return statusClasses2Ref.current[cacheKey]; // Return cached status
        }

        const numericPart = params.value.split('-')[1];
        if (!statusClassesRef.current[numericPart]) {
            fetchStatus(numericPart); // Fetch if not cached
            return '';
        }
        return statusClassesRef.current[numericPart]; // Return cached status
    }, [fetchStatus, fetchStatus2]);

    const columns = [
        { field: "status", headerName: "Status", renderCell: (params) => (
            <Button variant='contained' color='primary' onClick={() => setTransferData(params.row)}>Transfer</Button>
        ), minWidth: 100 },
        { field: "name", headerName: "Name", minWidth: 150 },
        { field: "image", headerName: "Image", minWidth: 120, renderCell: (params) => (
            <img src={params.row.image ? IMG_URL + params.row.image : "default_image_url"} alt="Image" style={{ width: 50, height: 50 }} />
        )},
        { field: "provider_type", headerName: "Provider Type", minWidth: 150 },
        { field: "duty_hours", headerName: "Duty Hours", minWidth: 150 },
        { field: "date", headerName: "Date", minWidth: 150 },
        ...Array.from({ length: 24 }, (_, i) => ({
            field: `${String(7 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}-${String(7 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '30' : '00'}`,
            headerName: `${String(7 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'} ${i < 12 ? 'AM' : 'PM'}`,
            minWidth: 150,
            cellClassName: getCellClassName
        }))
    ];

    useEffect(() => {
        dispatch(GetAvailability({ type: availabilityType }));
    }, [dispatch, availabilityType]);

    return (
        <Fragment>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "30rem", minWidth: "30rem" }}>{title}</h4>
            <div className='d-flex p-3 px-4 justify-content-between'>
                <Input type="date" className="px-3" onChange={(e) => setFilterDate({ ...filterDate, date: e.target.value })} />
                <Button variant='contained' color='primary' className="ml-4" style={{ width: "200px" }} onClick={() => dispatch(GetAvailability(filterDate))}>Search</Button>
            </div>
            <div className="p-4">
                <AdminDataTable rows={DataWithID(data)} columns={columns} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    );
};

export default Test;