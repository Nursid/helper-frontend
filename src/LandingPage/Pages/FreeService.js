import React, { useState,useEffect,Fragment } from 'react'
import { Container } from '@mui/material'
import { Col, Row,Card ,Button} from 'reactstrap'
import { GetAllOrdersByID } from '../../Store/Actions/Dashboard/Orders/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllServices } from '../../Store/Actions/Dashboard/servicesAction';
import PlumberService from '../../assets/img/Travel&Driver.png';
import { IMG_URL } from '../../config';
import AdminDataTable from '../../AdminDashboards/Elements/AdminDataTable';
const FreeService = ({registerId}) => {


    const dispatch = useDispatch()

      useEffect(() => {
        dispatch(GetAllServices())
    }, []);


    const { data } = useSelector(pre => pre.GetAllServicesReducer)
    // service reducere
    // const DeletResult = useSelector(pre => pre.DeleterTheServiceReducer)

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

      const columns = [
        {
            field: "_id",         // Assuming "_id" is the unique identifier in your data
            headerName: "Sr No",
            minWidth: 50,
        },
        { field: "date", headerName: "Date", minWidth: 160 },
        { field: "serviceName", headerName: "Service Name", minWidth: 200, editable: true },
        {
            field: "icon", headerName: "Icon", minWidth: 120, renderCell: (params) => (
                <div className='w-80 h-80 rounded-circle'>
           <img src={PlumberService} alt='icon' style={{ width: "60px", height: "50px" }} />;
           </div>
            )
        },
        {
            field: "image", headerName: "Image", minWidth: 120, renderCell: (params) => (
                <div className='w-80 h-80 rounded-circle'>
                   <img src={IMG_URL+params.row.image} alt="Image" style={{ width: "64px", height: "64px" }} />
                </div>
            )
        },
        {
            field: "details", headerName: 'Service Details', minWidth: 400, innerHeight: 200
        }
      ]
     


    return (
        <Fragment>
        <h4 className='p-3 px-4 mt-3 bg-transparent headingBelowBorder justify-content-start' style={{ maxWidth: "18rem", minWidth: "18rem" }}> All Services List</h4>

        <div className='p-4'>
            <AdminDataTable rows={DataWithID(data.data)} columns={columns}/>
        </div>
    </Fragment>
    )
}

export default FreeService