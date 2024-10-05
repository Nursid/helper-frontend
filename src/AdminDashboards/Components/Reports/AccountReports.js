import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AdminDataTable from '../../Elements/AdminDataTable';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import StackBox from '../../Elements/StackBox';
import { useUserRoleContext } from '../../../Context/RolesContext';
import { useAuth } from '../../../Context/userAuthContext';
import { AccountListing } from '../../../Store/Actions/Dashboard/AccountAction';
import Switch from '@mui/material/Switch';
import { ApprovePaymentRemarkModal } from '../../../Components/Modal';

const AccountReports = () => {
    const [selectedAttendance, setSelectedAttendance] = useState("Credit");
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.AccountReducers);
    const { userRole } = useUserRoleContext();
    const { currentUser } = useAuth();
    const [openingBalance, setOpeningBalance] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [amountId, setAmountId] = useState(false);
    const [adminAprove, setAdminAprove] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen)

    useEffect(() => {
        dispatch(AccountListing());
    }, [dispatch]);

    const toggleApprove = (id, approve) => {
        setAmountId(id);
        setAdminAprove(!approve);
        toggleModal();
    }

    useEffect(() => {
        const totalPaidAmt = data?.reduce((acc, item) => acc + (item.type_payment === false ? (Number(item.amount) || 0) : 0), 0);
        const totalExpenses = data?.reduce((acc, item) => acc + (item.type_payment === true ? (Number(item.amount) || 0) : 0), 0);
        const openingBalance = totalPaidAmt - totalExpenses;
        setOpeningBalance(openingBalance);
    }, [data]);

    const all_columns = [
        { field: "date", headerName: "Date", flex: 1, minWidth: 50 },
        { field: "person_name", headerName: "Party Name", flex: 1, minWidth: 120 },
        { field: "about_payment", headerName: "Particular (Service Desc.)", flex: 1, minWidth: 250 },
        { field: "payment_mode", headerName: "Payment Mode", flex: 1, minWidth: 120 },
        { field: "debit", headerName: "Amount Debit", flex: 1, minWidth: 120 },
        { field: "credit", headerName: "Amount Credit", flex: 1, minWidth: 120 },
        { field: "balance", headerName: "Balance", flex: 1, minWidth: 120 },
        { field: "remark", headerName: "Remark", flex: 1, minWidth: 120 },
    ];

    const DataWithID = (data, payment_mode) => {
        return useMemo(() => {
            const newData = [];
    
            if (data) {
                for (let item of data) {
                    let debit = 0;
                    let credit = 0;
    
                    // Check for debit
                    if (payment_mode === 1 && item.type_payment && (item.amount || 0) > 0) {
                        debit = item.amount; // Get debit amount only if it's greater than 0
                        newData.push({
                            ...item,
                            _id: data.indexOf(item), // Use a unique ID if available
                            date: moment(item.date).format("DD-MM-YYYY"),
                            debit,
                        });
                    }
                    // Check for credit
                    else if (payment_mode !== 1 && !item.type_payment && (item.amount || 0) > 0) {
                        credit = item.amount; // Get credit amount only if it's greater than 0
                        newData.push({
                            ...item,
                            _id: data.indexOf(item), // Use a unique ID if available
                            date: moment(item.date).format("DD-MM-YYYY"),
                            credit,
                        });
                    }
                }
            } else {
                newData.push({ id: 0 });
            }
    
            return newData.reverse();
        }, [data, payment_mode]); // Add payment_mode to the dependency array
    };

    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );

    return (
        <Fragment>

            <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>
                Payment Report (Credit/Debit)
            </h5>
          
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                {["Credit", "Debit"].map(item => (
                    <div
                        key={item}
                        className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center ${selectedAttendance === item ? "hoverThis_active" : ""}`}
                        style={{ minWidth: "15rem", maxWidth: "15rem" }}
                        onClick={() => setSelectedAttendance(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {selectedAttendance === "Credit" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data, 0)} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}
            {selectedAttendance === "Debit" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data, 1)} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}
        </Fragment>
    );
};

export default AccountReports;
