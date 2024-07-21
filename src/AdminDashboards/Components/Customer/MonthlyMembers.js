
import { Box } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useState } from 'react'
import { Button } from 'reactstrap';

import { mockDataContacts } from '../../data/mockData';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';
import AddMonthlyMembers from './Froms/AddEnquiryForm';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';

import { useDispatch, useSelector } from 'react-redux';
import { GetAllMembers } from '../../../Store/Actions/Dashboard/Customer/CustomerActions';

const MonthlyMembers = () => {



    
    const [Block, setBlock] = useState(false)
    const { data, isLoading } = useSelector(state => state.GetAllMembersReducer)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(GetAllMembers())
    }, [])

    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                let newCustomer = item.NewCustomer;
                let mergedItem = {...item, ...newCustomer};
                NewData.push({ ...mergedItem, _id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })

            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }






    const column = [
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "name", headerName: "Customer Name ", minWidth: 120, editable: true },
        { field: "service", headerName: "Service", minWidth: 120, editable: true },
        { field: "service_type", headerName: "T.Service", minWidth: 400, editable: true },
        { field: "bill", headerName: "This Month Bill", minWidth: 120, editable: true },
        { field: "last_pay_date", headerName: "Last Paid On", minWidth: 120, editable: true },
        { field: "remark", headerName: "Remark", minWidth: 120, editable: true },
        // { field: "email", headerName: "Email", minWidth: 120, editable: true },
        // { field: "address", headerName: "Address", minWidth: 250, editable: true },
        // { field: "username", headerName: "User Name", minWidth: 250, editable: true },
        // { field: "password", headerName: "password", minWidth: 250, editable: true },
        // { field: "zipCode", headerName: "Password", minWidth: 120, editable: true },
        // {
        //     field: "status",
        //     minWidth: 150,
        //     headerName: "Admin Approved",
        //     renderCell: (params) => (
        //         <Button className="text-white bg-green">Approved</Button>
        //     ),
        // },
        {
            field: "action",
            headerName: "Action",
            minWidth: 250,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button className="text-white bg-blue">Edit / Update</Button>
                    <Button className="text-white bg-blue" onClick={() => GetDeleteByID(params.row.id)}>Delete</Button>
                    {/* <Button className="text-white bg-red">Delete</Button> */}
                </div>
            ),
        },
        // {
        //     field: "block",
        //     headerName: "Block",
        //     minWidth: 250,
        //     renderCell: (params) => (
        //         <div className="d-flex gap-2">
        //             {Block ?
        //                 <Button className="text-white bg-warning border-warning" onClick={() => setBlock(false)}>Un-Block</Button>
        //                 :
        //                 <Button className="text-white bg-red" onClick={() => setBlock(true)}>Block Service</Button>
        //             }
        //         </div>
        //     ),
        // },
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
    };


    // /delete/customer/:id

    const GetDeleteByID = (id) => {

        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         const response = await axios.get(API_URL + '/customer/delete/' + id)
        //         if (response.status === 200) {
        //             Swal.fire(
        //                 'Deleted!',
        //                 'Your file has been deleted.',
        //                 'success'
        //             )
        //             dispatch(GetAllMembers())
        //         } else {
        //             Swal.fire({
        //                 title: 'failed to delete try again',
        //                 icon: "error",
        //             })
        //         }
        //     }
        // })
    }

    const [masterAddService, setMasterAddServices] = useState(false)
    const ToggleMasterAddService = () => setMasterAddServices(!masterAddService)


    return (
        <Fragment>
            <ModalComponent modal={masterAddService} toggle={ToggleMasterAddService} data={<AddMonthlyMembers />} modalTitle={"Add Monthly Member"} />
            <h4 className='p-3 px-4 mt-3 bg-transparent headingBelowBorder text-white' style={{ maxWidth: "fit-content" }}>Monthly Members</h4>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={ToggleMasterAddService}>
                    Add Monthly Members
                </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data.data)} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}
export default MonthlyMembers