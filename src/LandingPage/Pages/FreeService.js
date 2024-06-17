import React, { useState,useEffect } from 'react'
import { Container } from '@mui/material'
import { Col, Row,Card ,Button} from 'reactstrap'
import { GetAllOrdersByID } from '../../Store/Actions/Dashboard/Orders/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
const FreeService = ({registerId}) => {


    const status = [
        { id: 0, name: "Pending" },
        { id: 1, name: "Hold" },
        { id: 2, name: "Due" },
        { id: 3, name: "Completed" },
        { id: 4, name: "Running" },
        { id: 5, name: "Cancel" }
    ];

    const [userId, setUserId] = useState(registerId);
    const dispatch = useDispatch()
    const { data, isLoading } = useSelector(state => state.GetAllOrderByIdReducer)
   
    useEffect(() => {
        dispatch(GetAllOrdersByID(userId))
      }, [userId]);

      const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                let orderProcess = item.orderProcess;
                let mergedItem = {...item, ...orderProcess};
                NewData.push({ ...mergedItem, id: data.indexOf(item), date: moment(item.createdAt).format("D / M / Y") })
  
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
      }

      const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerCenter: true },
        { field: 'service_name', headerName: 'Service Name', width: 180, headerCenter: true },
        {
            field: 'pending',
            headerCenter: true,
            width: 200,
            headerName: 'Order Status',
            renderCell: (params) => (
            <Button 
            
            color={
                params.row.pending === 0 ? "warning" :
                params.row.pending === 1 ? "secondary" :
                params.row.pending === 2 ? "secondary" :
                params.row.pending === 3 ? "success" :
                params.row.pending === 4 ? "info" :
                "danger"
            }
                variant='contained' >{status.find(item => item.id === params.row.pending)?.name}</Button>)
        }
      ]

    return (
        <div>

            <Container maxWidth='sm' className='w-100 p-1'>
            <Row className='py-2'>
                <Col xs={12}>
                    {/* Map over serviceData and create a table */}
                    <Card>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={DataWithID(data.data)}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default FreeService