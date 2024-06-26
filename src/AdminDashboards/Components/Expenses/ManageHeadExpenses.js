import React, { Fragment, useEffect, useState } from 'react'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddExpensesForm from './Forms/AddExpensesForm';
import ModalComponent from '../../Elements/ModalComponent';
import AdminDataTable from '../../Elements/AdminDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllHeadExp, GetDeleteHeadExp } from '../../../Store/Actions/Dashboard/expenseActions';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

const ManageHeadExpenses = () => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const allHeadExpenses = useSelector(state => state.GetAllHeadExpReducer)

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

    const DeleteById = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                dispatch(GetDeleteHeadExp(id)).then(() => {
                    dispatch(GetAllHeadExp())
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    setLoading(false)
                })
            }
        })

    }


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

    const column = [
        { field: "_id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "name", flex: 1, headerName: "Name", minWidth: 50, editable: true },
        {
            field: "status",
            minWidth: 150,
            headerName: "Status",
            renderCell: (params) => (
                <Button className="text-white bg-green">Approved</Button>
            ),
        },
        {
            field: "action ", flex: 1, headerName: "Action", minWidth: 50, renderCell: (params) => (
                <div className='d-flex align-items-center gap-2 justify-content-start'>
                    <Button variant='contained' color='primary' onClick={(e)=>{toggleEditMode(params.row)}}
                        style={{minWidth: "40px", maxWidth: "40px"}}
                        ><BorderColorIcon /></Button>
                    <Button variant="contained" color="error" onClick={() => { DeleteById(params.row.id) }} 
                        style={{minWidth: "40px", maxWidth: "40px"}}
                        ><DeleteForeverIcon /></Button>
                </div>
            )
        },
    ]




    // add Expense head MOdal Controller 
    const [addExpenses, setAddExpenses] = useState(false)
    const ToggleExpenses = () => setAddExpenses(!addExpenses)


    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData,setEditData]=useState([])
    const toggleModal = () => {
        setShowModal(!showModal);
        setEditMode(false); // Reset edit mode when modal is toggled
        setEditData('')
    };

    const toggleEditMode = (data) => {
       
        setShowModal(true); // Always show modal when editing
        setEditMode(true);
        setEditData(data)
    };


    // get all expenses 
    useEffect(() => {
        dispatch(GetAllHeadExp())
    }, [])
    return (
        <Fragment>
            <ModalComponent  data={<AddExpensesForm toggleModal={toggleModal} data={editData} />}
                modalTitle={editMode ? "Edit Expense Head" : "Add Expence Head"}
                modal={showModal}
                toggle={toggleModal}
            />

            {/* <DashHeader /> */}
        

        <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> Expense Head List</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
                Add Expense Head
                </div>
            </div>
            </div>





            <div className='p-4'>
                <AdminDataTable rows={DataWithID(allHeadExpenses.data)} columns={column} CustomToolbar={CustomToolbar} loading={loading} />
            </div>
        </Fragment>
    )
}

export default ManageHeadExpenses