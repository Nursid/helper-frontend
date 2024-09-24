import React, { Fragment, useState, useMemo } from 'react'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import { Box } from '@mui/material';
import { mockDataContacts } from '../../data/mockData';
import AdminDataTable from '../../Elements/AdminDataTable';
import { GetALLExpenses } from '../../../Store/Actions/Dashboard/expenseActions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetAllCollection } from '../../../Store/Actions/Dashboard/expenseActions';
import StackBox from '../../Elements/StackBox';
import GetAllOrders from '../../../Store/Actions/Dashboard/Orders/OrderAction';
import { useUserRoleContext } from '../../../Context/RolesContext';
import { useAuth } from '../../../Context/userAuthContext';
import { AccountListing } from '../../../Store/Actions/Dashboard/AccountAction';

const TodaysReport = () => {

    const [selctedAttendence, setSelectedAttendence] = useState("All")
    const {  data: orders, isLoading: isOrderLoading} = useSelector(state => state.GetAllOrderReducer);
    const { data } = useSelector(state => state.AccountReducers)

    const [openingbalance, setOpeningBalance] = useState(0)
    // const { data, isLoading } = useSelector(state => state.GetAllExpenseReducers);

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
    const dispatch = useDispatch()

    const { userRole } = useUserRoleContext();
    const { currentUser, setCurrentUser } = useAuth();
    const [role, setRole] = useState(userRole.role || '');

    // useEffect(() => {
    //     dispatch(GetALLExpenses())
    // }, [GetALLExpenses, data]);

    useEffect(() => {
        dispatch(AccountListing())
    }, [data]);

   

    // useEffect(() => {
    //     dispatch(GetAllOrders(3, currentUser.id, role))
    // }, [orders, GetAllOrders]);

 


    const all_columns = [
        { field: "date", headerName: "Date", flex: 1, minWidth: 50, editable: true },
        { field: "person_name",flex: 1, headerName: "Customer Name", minWidth: 120, editable: true },
        { field: "about_service",flex: 1, headerName: "Particular (Service Desc.)", minWidth: 250, editable: true },
        { field: "payment_mode",flex: 1, headerName: "Payment Mode", minWidth: 120, editable: true },
        { field: "debit",flex: 1, headerName: "Amount Debit", minWidth: 120, editable: true },
        { field: "credit", flex: 1, headerName: "Amount Credit", minWidth: 120, editable: true },
        { field: "balance", flex: 1, headerName: "Balance", minWidth: 120, editable: true },
        { field: "approve",flex: 1, headerName: "Approve", minWidth: 120, editable: true },
        { field: "remark",flex: 1, headerName: "Remark", minWidth: 120, editable: true },
    ]
    
    const DataWithID = (data) => {
        return useMemo(() => {
            const NewData = [];
            if (data !== undefined) {
                let cumulativeBalance = 0; // Initialize cumulative balance
                
                for (let item of data) {
                    let credit = 0;  
                    let debit = 0;   
    
                    // Determine credit and debit based on payment mode and type
                    if (item.type_payment) {
                        if (item.payment_mode === "Cash") {
                            debit = item.cash || 0; 
                        } else if (item.payment_mode === "Online") {
                            debit = item.upi || 0;  
                        }
                    } else {
                        if (item.payment_mode === "Cash") {
                            credit = item.cash || 0; 
                        } else if (item.payment_mode === "Online") {
                            credit = item.upi || 0;  
                        }
                    }
    
                    // Update cumulative balance
                    cumulativeBalance += parseInt(credit); // Add credit
                    cumulativeBalance -= parseInt(debit); // Subtract debit
    
                    // Push the new item with updated balance
                    NewData.push({ 
                        ...item, 
                        id: data.indexOf(item), 
                        date: moment(item.createdAt).format("DD-MM-YYYY"), 
                        credit: credit, 
                        debit: debit,
                        balance: cumulativeBalance // Set the cumulative balance
                    });
                }
            } else {
                NewData.push({ id: 0 });
            }
            
            return NewData.reverse();
        }, [data]);
    }
    
    


    // useEffect(() => {
    //     const totalPaidAmt = orders?.data?.reduce((acc, item) => {
    //         return acc + (Number(item?.piadamt) || 0); // Ensure piadamt is a number
    //     }, 0);
    
    //     const TotalExpenses = data?.reduce((acc, item) => {
    //         return acc + (Number(item?.amount) || 0); // Ensure amount is a number
    //     }, 0);
    
    //     const OpeningBalance = totalPaidAmt - TotalExpenses;
    
    //     setOpeningBalance(OpeningBalance);
    
    // }, [orders, data]);
    

  

    const DataWithIDExpense = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                NewData.push({ ...item, id: data.indexOf(item)
                 })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    const NewExpenseFormate = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {

                NewData.push({ ...item, id: data.indexOf(item), date: moment(item.createdAt).format("DD-MM-YYYY"),
                    expense_amount: item?.amount, amount: null, service_name: item?.headExp?.name
                 })
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

    const UpdatedData = [...(NewExpenseFormate(data)), ...(DataWithID(orders?.data))]

    const Cash = () => {
    const DataWithIDCash = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {

                if (item.paymentMethod === 'Cash') {
                    NewData.push({ ...item })
                    }
               
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }
      
        return (
            <div className='p-4'>
                <AdminDataTable rows={DataWithIDCash(UpdatedData)} columns={all_columns} CustomToolbar={CustomToolbar} />
           </div>
        );

        
      };

      const Bank = () => {
      
        const DataWithBank = (data) => {
            const NewData = []
            if (data !== undefined) {
                for (let item of data) {
                    if (item.paymentMethod === 'Online') {
                    NewData.push({ ...item })
                    }
                }
            } else {
                NewData.push({ id: 0 })
            }
            return NewData
        }
        
        return (
            <div className='p-4'>
            <AdminDataTable rows={DataWithBank(UpdatedData)} columns={all_columns} CustomToolbar={CustomToolbar} />
        </div>
        );
      };




    return (
        <Fragment>
            {/* <DashHeader /> */}
            <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>Payment Summary (Bank/Cash )</h5>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div>
            <StackBox
                        title="Opening Balance"
                        amount={openingbalance}
                        rupee={true}
                        style={{
                            background:
                            "linear-gradient(to right bottom ,var(--yellow) , var(--yellow))",
                            gridArea: "one",
                        }}
                        hidden='d-none'
                        />
                </div>
            </div>     
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                {["All", "Bank", "Cash"].map((item, index) => (
                    <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center  ${selctedAttendence === item ? "hoverThis_active" : ""}`} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={() => { setSelectedAttendence(item) }}>
                        {item}
                    </div>
                ))}
            </div>

            {selctedAttendence === "All" && (
                <div className='p-4'>
                    <AdminDataTable rows={DataWithID(data)} columns={all_columns} CustomToolbar={CustomToolbar} />
                </div>
            )}

            {selctedAttendence === "Cash" && (
                <Cash/>
            )}
            {selctedAttendence === "Bank" && (
              
               <Bank/>
            )} 



        </Fragment>
    )
}

export default TodaysReport