import React, { Fragment, useState } from 'react'
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

const TodaysReport = () => {

    const [selctedAttendence, setSelectedAttendence] = useState("All")
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

    useEffect(() => {
        dispatch(GetALLExpenses())
    }, []);

    useEffect(() => {
        dispatch(GetAllCollection())
    }, []);

    const all_columns = [
        { field: "id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "orderNo", flex: 1, headerName: "Order No", minWidth: 120, editable: true },
        { field: "personName", flex: 1, headerName: "Customer Name", minWidth: 120, editable: true },
        { field: "remark", flex: 1, headerName: "Remark", minWidth: 120, editable: true },
        { field: "amount", flex: 1, headerName: "Collection", minWidth: 120, editable: true },
        { field: "expenseType", flex: 1, headerName: "Expenses", minWidth: 120, editable: true },
       
    ]

    const expense_columns = [
        { field: "id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "date", flex: 1, headerName: "Date", minWidth: 120, editable: true },
        { field: "name", flex: 1, headerName: "Head", minWidth: 120, editable: true },
        { field: "personName", flex: 1, headerName: "Customer Name", minWidth: 120, editable: true },
        { field: "remark", flex: 1, headerName: "Remark", minWidth: 120, editable: true },
        { field: "amount", flex: 1, headerName: "Amount", minWidth: 120, editable: true },
    ]
    const collectable_columns = [
        { field: "id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "date", flex: 1, headerName: "Date", minWidth: 120, editable: true },
        { field: "orderNo", flex: 1, headerName: "Order No.", minWidth: 120, editable: true },
        { field: "personName", flex: 1, headerName: "Customer Name", minWidth: 120, editable: true },
        { field: "remark", flex: 1, headerName: "Remark", minWidth: 120, editable: true },
        { field: "expenseType", flex: 1, headerName: "Expenses", minWidth: 120, editable: true },
        { field: "amount", flex: 1, headerName: "Collection", minWidth: 120, editable: true },
    ]

    const { data, isLoading } = useSelector(state => state.GetAllCollectionReducers);
        
    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {

                NewData.push({ ...item, id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })

            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }


    const ExpensesComponent = () => {
        const { data, isLoading } = useSelector(state => state.GetAllExpenseReducers);
   
    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {

                let headExp = item.headExp;
                let mergedItem = {...item, ...headExp};
                NewData.push({ ...mergedItem, id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })

            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }
      
        return (
            <div className='p-4'>
            <AdminDataTable rows={DataWithID(data)} columns={expense_columns} CustomToolbar={CustomToolbar} />
        </div>
        );
      };

      const CollectionsComponent = () => {
        const { data, isLoading } = useSelector(state => state.GetAllCollectionReducers);
        
        const DataWithID = (data) => {
            const NewData = []
            if (data !== undefined) {
                for (let item of data) {
    
                    NewData.push({ ...item, id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })
    
                }
            } else {
                NewData.push({ id: 0 })
            }
            return NewData
        }
        // Your component logic here
      
        return (
            <div className='p-4'>
            <AdminDataTable rows={DataWithID(data)} columns={collectable_columns} CustomToolbar={CustomToolbar} />
        </div>
        );
      };




    return (
        <Fragment>
            {/* <DashHeader /> */}
            <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>Transaction Report </h5>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                {["All", "Expenses", "Collectable"].map((item, index) => (
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

            {selctedAttendence === "Expenses" && (
               <ExpensesComponent/>
            )}
            {selctedAttendence === "Collectable" && (
               <CollectionsComponent/>
            )}



        </Fragment>
    )
}

export default TodaysReport