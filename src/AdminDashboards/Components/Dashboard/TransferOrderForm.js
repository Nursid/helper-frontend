import React, {Fragment, useEffect, useState} from 'react'
import {UseStateManager} from '../../../Context/StateManageContext'
import { Button, Col, Form, FormGroup, Input, Label, Row, TextArea } from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../../../config'
import SelectBox from '../../Elements/SelectBox';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const TransferOrderForm = ({orderNo,prop,GetAllOrders, role}) => {

	console.log(role)

	let remark;

if (role === 'super') {
    remark = 'sueadmin_remark'; // Assuming sueadmin_remark is defined somewhere
} else if (role === 'admin') {
    remark = 'admin_remark'; // Assuming admin_remark is defined somewhere
} else if (role === 'office') {
    remark = 'bakof_remark'; // Assuming bakof_remark is defined somewhere
}

	const [order_no, setOrderNo]=useState(orderNo);
	const [admin_remark, setAdminRemark]=useState('');
	const [time, setTime]= useState('');
	const [date, setDate]=useState('');
	const dispatch = useDispatch()
const onsubmitDate =() => {

    const data={
        [remark]: admin_remark,
        booktime:time,
        bookdate:date,
        order_no:order_no
    }

    const apiUrl = `${API_URL}/order/assign/${order_no}`;
		axios.put(apiUrl, data)
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					prop();
					Swal.fire(
						'Successfully!',
						'Your Order has been Transfer!',
						'success'
					)
				} else {
					Swal.fire({
						title: 'failed to add try again',
						icon: "error",
					})
				}
				dispatch(GetAllOrders());
			})
			.catch(error => {
				console.error('Error:', error);	
			});
}


return(
<Fragment>
				<Row>
        
                    <Col md={6}>
						<FormGroup>
							<Label>Date</Label>
							<Input type="date" onChange={
								(e) => setDate(e.target.value)
							}
							value={date}/>
						</FormGroup>
					</Col>
                    <Col md={6}>
						<FormGroup>
							<Label>Time</Label>
							<Input
                             type="time"
                            onChange={
								(e) => setTime(e.target.value)
							}
							value={time}/>
						</FormGroup>
					</Col>

                    <Col md={12}>
						<FormGroup>
							<Label>Remark</Label>
                            <Input type='textarea'
                            onChange={(e) => setAdminRemark(e.target.value)}
                            value={admin_remark}
                            />
						</FormGroup>
					</Col>

					<Button className='bg-danger text-white' onClick={onsubmitDate}>Transfer</Button>
				</Row>
		</Fragment>
)
};

export default TransferOrderForm;