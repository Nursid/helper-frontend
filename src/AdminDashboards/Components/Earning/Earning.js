import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AdminDataTable from '../../Elements/AdminDataTable';
import axios from 'axios'; // Import axios for making HTTP requests
import { API_URL } from '../../../config';
import { Input } from "reactstrap";
import { Button } from '@mui/material';

const Earning = () => {
    const [earningsData, setEarningsData] = useState([]);
    const [fromDate, setFromDate] = useState(''); // State for from date
    const [toDate, setToDate] = useState(''); // State for to date
    const dispatch = useDispatch();

    const fetchEarningsData = async () => {
        try {
            const response = await axios.post(`${API_URL}/order/getEarningByServices`, { from: fromDate, to: toDate });
            if (response.status === 200) {
                const data = response.data.data;
                const formattedData = Object.entries(data).map(([name, { total_service, total_amount }], index) => ({
                    id: index,
                    name,
                    total_service,
                    total_amount
                }));
                setEarningsData(formattedData);
            }
        } catch (error) {
            console.error('Error fetching earnings data:', error);
        }
    };

    const column = [
        { field: "id", headerName: "ID", minWidth: 50, editable: false },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "total_service", headerName: "Total Services", minWidth: 150, editable: true },
        { field: "total_amount", headerName: "Total Amount", minWidth: 150, editable: true }
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

    return (
        <Fragment>
            <div className='flex ' style={{ justifyContent: 'flex-start' }}>
                <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "15rem", minWidth: "15rem" }}> Earning </h4>
            </div>

            <div className="flex flex-col justify-between w-full mb-3 ">
            <div className="flex justify-between gap-6 items-center">
              <div className="ml-4">
                <label htmlFor="startDate" className="text-light">From Date</label>
                <Input id="fromDate" type="date" className="px-3" 
                         onChange={(e) => setFromDate(e.target.value)}
                         value={fromDate}
                        />
          </div>
               {/*  <div className="ml-4">
                <label htmlFor="endDate"  className="text-light mr-2" >To:</label>
                <Input id="endDate" type="date" onChange={(e)=>setTo(e.target.value)}/>
          </div> */}
              <div className="ml-4" style={{width: '12rem'}}>
							<label className="form-label text-light ml-2 mr-2" htmlFor="serviceRemark">
								 To Date
							</label>
                            <Input id="toDate" type="date" className="px-3" 
                         onChange={(e) => setToDate(e.target.value)}
                         value={toDate}
                        />
                </div>
                <div className="ml-4" style={{marginTop: '32px'}}>
                <Button className="btn btn-primary" size="small" variant="contained" onClick={fetchEarningsData}>
                  Search
                </Button>
              </div>
            </div>
        </div>  



            <div className='p-4'>
                <AdminDataTable rows={earningsData} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    );
};

export default Earning;