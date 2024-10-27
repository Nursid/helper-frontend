import React, { Fragment, useEffect, useState } from 'react'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter} from '@mui/x-data-grid';

import StackBox from '../../Elements/StackBox';

// import {
//     DataGrid,
//     gridPaginatedVisibleSortedGridRowIdsSelector,
//     gridSortedRowIdsSelector,
//     gridExpandedSortedRowIdsSelector,
//     useGridApiContext,
//   } from '@mui/x-data-grid';
import { API_URL } from '../../../config';

import AdminDataTable from '../../Elements/AdminDataTable';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AccountListing } from '../../../Store/Actions/Dashboard/AccountAction';
import { useDispatch, useSelector } from 'react-redux'
import ModalComponent from '../../Elements/ModalComponent';
import AdminTransactionForm from './Forms/AdminTransactionForm';
import { Col , Row} from 'reactstrap';




const Cashbook = () => {

    const { data } = useSelector(state => state.AccountReducers)
    const dispatch = useDispatch();
    const [totalCash, setTotalCash]= useState('');
    const [totalUpi, setTotalUpi] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("1");
    const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
              // if(!item.type_payment){
                NewData.push({ ...item, _id: data.indexOf(item)})
              // }
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData.reverse()
    }

    // const getRowsFromCurrentPage = ({ apiRef }) =>
    //     gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

    

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

    // const apiRef = useGridApiContext();

    // const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
        color: 'primary',
        size: 'small',
        startIcon: <GridToolbarExport />,
      };


    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarQuickFilter />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                {/* <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
      >
        Current page rows
      </Button> */}
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    };

    const column = [
      { field: "person_name", headerName: "Party Name", flex: 1, minWidth: 120 },
        { field: "date",headerName: "Date", minWidth: 150, flex:1},
        { field: "payment_mode",headerName: "Payment Mode", flex:1},
        { field: "transection_id",headerName: "Transaction Id", flex:1},
        { field: "amount",headerName: "Amount", flex: 1},
        // {
        //     field: "status",
        //     minWidth: 150,
        //     headerName: "Status",
        //     renderCell: (params) => (
        //         <Button className="text-white bg-green">Approved</Button>
        //     ),
        // },
        {
            field: "action ", flex: 1, headerName: "Action", minWidth: 50, renderCell: (params) => (
                <div className='d-flex align-items-center gap-2 justify-content-start'>
                    <Button variant='contained' color='primary' onClick={(e)=>{toggleEditMode(params.row)}}
                      style={{minWidth: "40px", maxWidth: "40px"}}
                      ><BorderColorIcon /></Button>
                    {/* <Button variant="contained" color="error" onClick={() => { DeleteById(params.row.id) }} ><DeleteForeverIcon /></Button> */}
                </div>
            )
        },
    ];

   
        const TotalBalance = async () => {
          try {
            const response = await fetch(API_URL + `/api/total-amount?date=${selectedFilter}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const total_balance_data = await response.json();
            setTotalCash(total_balance_data.data[0].total_cash);
            setTotalUpi(total_balance_data.data[0].total_online);
          } catch (error) {
            console.log(error)
          }
        };

        const handleFilterChange = (filterValue) => {
            setSelectedFilter(filterValue);
            TotalBalance();
        };


        useEffect(() => {
          dispatch(AccountListing());
          TotalBalance();
      }, [selectedFilter]);

    

    return (
        <Fragment>
            <ModalComponent
                data={<AdminTransactionForm 
                data={editData} toggleModal={toggleModal} AccountListing={AccountListing} TotalBalance={TotalBalance}  />}
                modalTitle={editMode ? "Edit Cashbook" : "Add Cashbook"}
                modal={showModal}
                toggle={toggleModal}
                size={"lg"}
                />
                <div className='mt-5'>
                <Row>
                    <Col md={12}>
                    <div className="DashboardAnalytics">
                        <StackBox
                        title="Total Balance"
                        amount={parseFloat(totalCash+totalUpi)}
                        rupee={true}
                        style={{
                            background:
                            "linear-gradient(to right bottom ,var(--yellow) , var(--yellow))",
                            gridArea: "one",
                        }}
                        handleFilterChange={handleFilterChange}
                        selectedFilterData={selectedFilter}
                        />

                <StackBox
                    title={"Total Cash"}
                    amount={totalCash}
                    rupee={true}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,yellow , goldenrod)",
                      gridArea: "two",
                    }}
                    handleFilterChange={handleFilterChange}
                    selectedFilterData={selectedFilter}
                  />
                  <StackBox
                    title={"Total Bank Amount"}
                    amount={totalUpi}
                    rupee={false}
                    style={{
                      background:
                        "linear-gradient(to right bottom ,lightgreen , skyblue",
                      gridArea: "three",
                    }}
                    handleFilterChange={handleFilterChange}
                    selectedFilterData={selectedFilter}
                  />
                    </div>
                    </Col>
                  </Row>
                  </div>

            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> Cashbook</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={toggleModal} >
                Add Transaction
                </div>
            </div>
            </div>
            
            <div className='p-4'>
                <AdminDataTable rows={DataWithID(data)} columns={column} CustomToolbar={CustomToolbar} pageSizeOptions={[10]} />
            </div>

        </Fragment>
    )
}

export default Cashbook