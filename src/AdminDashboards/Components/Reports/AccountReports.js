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
import { Input, Button } from 'reactstrap';
import { accountToExcel } from '../../accountToExcel';
import { BiExport } from "react-icons/bi";

const AccountReports = () => {
    const [selectedAttendance, setSelectedAttendance] = useState("All");
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.AccountReducers);
    const { userRole } = useUserRoleContext();
    const { currentUser } = useAuth();
    const [openingBalance, setOpeningBalance] = useState(0);
    const [cash, setCash] = useState(0);
    const [bank, setBank] = useState(0);
    const [expence, setExpence] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [amountId, setAmountId] = useState(false);
    const [adminAprove, setAdminAprove] = useState(false);
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [exportedData, setExportedData] = useState([]);

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
        
            const cashtotalPaidAmt = data?.reduce((acc, item) => {
                if (item.type_payment === false && item.payment_mode === 'Cash') {
                    return acc + (parseInt(item.amount) || 0);
                }
                return acc;
            }, 0);
            
            const OnlinetotalPaidAmt = data?.reduce((acc, item) => {
                if (item.type_payment === false && item.payment_mode === 'Online') {
                    return acc + (parseInt(item.amount) || 0);
                }
                return acc;
            }, 0);
            
            const cashtotalExpenses = data?.reduce((acc, item) => {
                if (item.type_payment === true && item.payment_mode === 'Cash') {
                    return acc + (parseInt(item.amount) || 0);
                }
                return acc;
            }, 0);
            
            const OnlinetotalExpenses = data?.reduce((acc, item) => {
                if (item.type_payment === true && item.payment_mode === 'Online') {
                    return acc + (parseInt(item.amount) || 0);
                }
                return acc;
            }, 0);
    
            const openingBalance = cashtotalPaidAmt + OnlinetotalPaidAmt - OnlinetotalExpenses - cashtotalExpenses;
            const totalCash = cashtotalPaidAmt-cashtotalExpenses;
            const totalBank = OnlinetotalPaidAmt-OnlinetotalExpenses;
            const totalExpenses = OnlinetotalExpenses + cashtotalExpenses;
            setCash(totalCash)
            setBank(totalBank)
            setOpeningBalance(openingBalance);
            setExpence(totalExpenses)
        }, [data]);

    const all_columns = [
        { field: "_id", headerName: "Sr No.", flex: 1, minWidth: 50 },
        // { field: "date", headerName: "Date", flex: 1, minWidth: 50 },
        { field: "person_name", headerName: "Party Name", flex: 1, minWidth: 120 },
        { field: "about_payment", headerName: "Details", flex: 1, minWidth: 250 },
        // { field: "payment_mode", headerName: "Payment Mode", flex: 1, minWidth: 120 },
        { field: "debit_amount", headerName: "Amount Debit", flex: 1, minWidth: 120 },
        { field: "credit_amount", headerName: "Amount Credit", flex: 1, minWidth: 120 },
        { field: "balance_opening", headerName: "Outstanding Balance", flex: 1, minWidth: 120 },
        {
            field: "balance",
            headerName: "Due Amount",
            flex: 1,
            minWidth: 120,
            valueGetter: (params) => params.row.balance ?? 0,
          },
       
    ];

    // const DataWithID = (data, payment_mode) => {
    //     return useMemo(() => {
    //         const newData = [];
    //         let cumulativeBalance = 0;
    
    //         if (data) {
    //             // Reverse data for processing
    //             const reversedData = [...data].reverse();
    
    //             for (let index = 0; index < reversedData.length; index++) {
    //                 const item = reversedData[index];
    
    //                 // Filter based on payment_mode if it's not 'All'
    //                 if (payment_mode === 'All' || item.payment_mode === payment_mode) {
    //                     const credit_amount = item.type_payment ? 0 : (item.amount || 0);
    //                     const debit_amount = item.type_payment ? (item.amount || 0) : 0;
    
    //                     cumulativeBalance += parseInt(credit_amount, 10);
    //                     cumulativeBalance -= parseInt(debit_amount, 10);
    
    //                     newData.push({
    //                         ...item,
    //                         _id: index + 1, // Use the index from reversed order + 1
    //                         date: moment(item.date).format("DD-MM-YYYY"),
    //                         credit_amount,
    //                         debit_amount,
    //                         balance_opening: cumulativeBalance,
    //                     });
    //                 }
    //             }
    //         } else {
    //             newData.push({ id: 0 });
    //         }
    
    //         return newData;
    //     }, [data, payment_mode]); // Add payment_mode to the dependency array
    // };
    
 const DataWithID = (data, payment_mode) => {
        return useMemo(() => {
            const newData = [];
            let cumulativeBalance = 0;
    
            if (data) {
                for (let item of data) {
                    // Filter based on payment_mode if it's not 'All'
                    if (payment_mode === 'All' || item.payment_mode === payment_mode) {
                        const credit_amount = item.type_payment ? 0 : (item.amount || 0);
                        const debit_amount = item.type_payment ? (item.amount || 0) : 0;
    
                        cumulativeBalance += parseInt(credit_amount, 10);
                        cumulativeBalance -= parseInt(debit_amount, 10);
    
                        newData.push({
                            ...item,
                            _id: data.indexOf(item) + 1, // Use a unique ID if available
                            date: moment(item.createdAt).format("DD-MM-YYYY"),
                            credit_amount,
                            debit_amount,
                            balance_opening: cumulativeBalance,
                        });
                    }
                }
            } else {
                newData.push({ id: 0 });
            }
    
            return newData.reverse();
        }, [data, payment_mode]); // Add payment_mode to the dependency array
    };

    const type = ["All", "Cash", "Online"].includes(selectedAttendance)
            ? selectedAttendance
            : "All";
    const exportData = DataWithID(data, type);


    
    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <GridToolbarDensitySelector />
            <Button
            onClick={()=> accountToExcel(all_columns, exportData, from)}
            className="btn btn-primary"
            size="sm"
            >
            <BiExport className="mr-2" />
            Export
            </Button>
        </GridToolbarContainer>
    );


    const FilterData = async () => {
        if(!from){
            return;
        }
        try {
            dispatch(AccountListing(from));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return (
        <Fragment>

            <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>
                Payment Report (Credit/Debit)
            </h5>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-left'>
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
                <StackBox
                    title="Cash"
                    amount={cash}
                    rupee={true}
                    style={{
                        background: "linear-gradient(to right bottom, var(--yellow), var(--yellow))",
                        gridArea: "one",
                    }}
                    hidden='d-none'
                />
                <StackBox
                    title="Bank"
                    amount={bank}
                    rupee={true}
                    style={{
                        background: "linear-gradient(to right bottom, var(--yellow), var(--yellow))",
                        gridArea: "one",
                    }}
                    hidden='d-none'
                />

                <StackBox
                    title="Expense"
                    amount={expence}
                    rupee={true}
                    style={{
                        background: "linear-gradient(to right bottom, var(--yellow), var(--yellow))",
                        gridArea: "one",
                    }}
                    hidden='d-none'
                />
            </div>
          
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3  justify-content-left'>
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

            <div className="flex flex-col justify-between w-full mb-3 ">
                <div className="flex justify-between gap-6 items-center">
                <div className="ml-4">
                    <label htmlFor="startDate" className="text-light">Date:</label>
                    <Input id="startDate" type="date" className="ml-2 mr-2" onChange={(e)=>setFrom(e.target.value)}/>
            </div>
                    {/* <div className="ml-4">
                    <label htmlFor="endDate"  className="text-light mr-2" >To:</label>
                    <Input id="endDate" type="date" onChange={(e)=>setTo(e.target.value)}/>
            </div> */}
                    <div className="ml-4" style={{marginTop: '32px'}}>
                    <Button className="btn btn-primary" size="small" variant="contained" onClick={FilterData}>
                    Search
                    </Button>
                </div>
            </div>
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

export default AccountReports;
