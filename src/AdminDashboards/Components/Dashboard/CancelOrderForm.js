import React, {Fragment, useEffect, useState} from 'react'
import {UseStateManager} from '../../../Context/StateManageContext'
import { Button, Col, Form, FormGroup, Input, Label, Row, TextArea } from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../../../config'
import SelectBox from '../../Elements/SelectBox';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const CancelOrderForm = ({orderNo,prop,GetAllOrders, role, currentUser}) => {

const [order_no, setOrderNo]=useState(orderNo);
const [cancelReason,setCancelReason]=useState('');
const dispatch = useDispatch()
const onsubmitDate =() => {

    const data={
        cancle_reson: cancelReason,
        pending:5
    }

    const apiUrl = `${API_URL}/order/assign/${order_no}`;
		axios.put(apiUrl, data)
			.then(response => {
			
				if (response.status === 200) {
					prop();
					Swal.fire(
						'Successfully!',
						'Your Order has been Cancelled.',
						'success'
					)
				} else {
					Swal.fire({
						title: 'failed to add try again',
						icon: "error",
					})
				}
				if (role === "service" || role === "supervisor") {
					const status = undefined;
					dispatch(GetAllOrders(status, currentUser, role));
				  } else {
					dispatch(GetAllOrders());
				  }
			})
			.catch(error => {
				console.error('Error:', error);	
			}); 
}


return(
<Fragment>
				<Row>
                    <Col md={12}>
						<FormGroup>
							<Label>Cancel Reason</Label>
                            <Input type='textarea'
                            onChange={(e) => setCancelReason(e.target.value)}
                            value={cancelReason}
                            />
						</FormGroup>
					</Col>

					<Button className='bg-danger text-white' onClick={onsubmitDate}>Cancel</Button>
				</Row>
		</Fragment>
)
};

export default CancelOrderForm;