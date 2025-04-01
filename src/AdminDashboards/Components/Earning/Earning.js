import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useEffect, useState } from 'react'
import AdminDataTable from '../../Elements/AdminDataTable';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllServiceProvider } from '../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';

const Earning = () => {
 
    const { data } = useSelector(pre => pre.GetAllServiceProviderReducer);
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(GetAllServiceProvider())
    }, []);

    const DataWithID = (data) => {
            const NewData = []
            if (data !== undefined) {
                for (let item of data) {
                    NewData.push({ ...item, _id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })
                }
            } else {
                NewData.push({ id: 0 })
            }
            return NewData
    }
    

    const column = [
        { field: "_id", headerName: "Sr No", minWidth: 50, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true }        
    ];


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
    }
    return (
        <Fragment>
            <div className='flex ' style={{ justifyContent: 'flex-start' }}>
                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}> Earning </h4>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default Earning