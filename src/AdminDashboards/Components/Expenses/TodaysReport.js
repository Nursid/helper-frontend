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

const TodaysReport = () => {
    const [selectedAttendance, setSelectedAttendance] = useState("All");
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
        { field: "_id", headerName: "ID", flex: 1, minWidth: 50 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 50 },
        // { field: "order_no", headerName: "Order No", flex: 1, minWidth: 120 },
        { field: "person_name", headerName: "Party Name", flex: 1, minWidth: 120 },
        { field: "about_payment", headerName: "Particular (Service Desc.)", flex: 1, minWidth: 250 },
        { field: "payment_mode", headerName: "Payment Mode", flex: 1, minWidth: 120 },
        { field: "debit", headerName: "Amount Debit", flex: 1, minWidth: 120 },
        { field: "credit", headerName: "Amount Credit", flex: 1, minWidth: 120 },
        { field: "balance", headerName: "Balance", flex: 1, minWidth: 120 },
        { field: "approve", headerName: "Approve", flex: 1, minWidth: 120,
            renderCell: (params) => {
            
                return (
                  <Switch
                    checked={params.row.approve}
                    onChange={(event) => {
                      toggleApprove(params.row.id, !params.row.approve)             
                    }}
                    color="primary"
                    size="small"
                  />
                )
        }
    },

        { field: "remark", headerName: "Remark", flex: 1, minWidth: 120 },
    ];

    const DataWithID = (data, payment_mode) => {
        return useMemo(() => {
            const newData = [];
            let cumulativeBalance = 0;
    
            if (data) {
                for (let item of data) {
                    // Filter based on payment_mode if it's not 'All'
                    if (payment_mode === 'All' || item.payment_mode === payment_mode) {
                        const credit = item.type_payment ? 0 : (item.amount || 0);
                        const debit = item.type_payment ? (item.amount || 0) : 0;
    
                        cumulativeBalance += parseInt(credit, 10);
                        cumulativeBalance -= parseInt(debit, 10);
    
                        newData.push({
                            ...item,
                            _id: data.indexOf(item), // Use a unique ID if available
                            date: moment(item.date).format("DD-MM-YYYY"),
                            credit,
                            debit,
                            balance: cumulativeBalance,
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

          {modalOpen &&  <ApprovePaymentRemarkModal
            modalOpen={modalOpen}
            toggleModal= {toggleModal}
            id={amountId}
            adminAprove={adminAprove}
            AccountListing={AccountListing}
            />
          }
            <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>
                Payment Summary (Bank/Cash)
            </h5>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <StackBox
                    title="Opening Balance"
                    amount={openingBalance}
                    rupee={true}
                    style={{
                        background: "linear-gradient(to right bottom, var(--yellow), var(--yellow))",
                        gridArea: "one",
                    }}
                    hidden='d-none'
                />
            </div>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                {["All", "Bank", "Cash"].map(item => (
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
            {selectedAttendance === "All" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data, "All")} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}
            {selectedAttendance === "Cash" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data, "Cash")} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}
            {selectedAttendance === "Bank" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data, "Online")} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}
        </Fragment>
    );
};

export default TodaysReport;
