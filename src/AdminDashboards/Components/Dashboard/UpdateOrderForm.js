import React, {Fragment, useEffect, useState} from 'react'
import {UseStateManager} from '../../../Context/StateManageContext'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../../../config'
import SelectBox from '../../Elements/SelectBox';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import moment from 'moment'

const UpdateOrderForm = ({orderData,prop,GetAllOrders, role, currentUser}) =>{

	const dispatch = useDispatch()

		const dateTime = new Date(orderData.serviceDateTime || '');

		const formattedDateTime = `${dateTime.getUTCFullYear()}-${String(dateTime.getUTCMonth() + 1).padStart(2, '0')}-${String(dateTime.getUTCDate()).padStart(2, '0')} ${String(dateTime.getUTCHours()).padStart(2, '0')}:${String(dateTime.getUTCMinutes()).padStart(2, '0')}:${String(dateTime.getUTCSeconds()).padStart(2, '0')}`;

    const [getAllService, setAllservices]=useState([])
    const [userType, setuserType]=useState(orderData?.user_type || '');
    const [name, SetName]=useState(orderData?.orderProcess?.name || '');
    const [email, setEmail]=useState(orderData?.orderProcess?.email || '');
    const [age,setAge]=useState(orderData?.age || '');
    const [service, setService]=useState(orderData?.service_name || '')
    const [mobileno, setMobileNumber] = useState( orderData?.orderProcess?.mobile ||'');
    const [serviceDescription, setServiceDescription] = useState(orderData?.service_des || '');
    // const [approxDuration, setApproxDuration] = useState('');
    const [supervisorName, setSupervisorName] = useState(orderData?.supervisor_name || '');
    const [serviceDateTime, setServiceDateTime] = useState( formattedDateTime || '');
    const [address, setAddress] = useState(orderData?.address || '');
    const [city, setCity] = useState(orderData?.city || '');
    const [zipCode, setZipCode] = useState(orderData?.pincode  || '');
    const [status, setStatus] = useState(orderData?.pending || 'Pending');
	const [time, setTime]=useState(orderData?.booktime ||  '')
	const [date, setDate]=useState( moment(orderData?.bookdate).format("YYYY-MM-DD") || '');

	
    const getAllServices = async () =>{
		const response = await axios.get(API_URL + '/service/getall')
		if (response.status === 200) {
			  const transformedData = response.data.data.map(item => ({
				label: item.serviceName,
				value: item.serviceName 
			}));
			setAllservices(transformedData);
		}
	}

	const userType_options = [
		{
		label: "Regular",
		value: "Regular"
		}, 
		{
			label: "Booking",
			value: "Booking"
		},
		{
			label: "Paid Service",
			value: "Paid Service"
		},
		{
			label: "Urgent",
			value: "Urgent"
		},
		]

    useEffect(()=>{
        getAllServices();
    },[]);

    const onsubmitDate = async () =>{
       
		const formData={
			name:name,
			email:email,
			user_type: userType.value,
			service_name: service.value,
			suprvisor_id : supervisorName,
			city: city,
			location: address,
			pincode: zipCode,
			booktime:time,
			bookdate:date
		}

		const apiUrl = API_URL + '/order/update/'+orderData.order_no;

		axios.patch(apiUrl, formData)
			.then(response => {

				if (response.status === 200) {
					prop();
					Swal.fire(
						'Updated!',
						'Your Customer has been Updated.',
						'success'
					)
					if (role === "service" || role === "supervisor") {
						const status = undefined;
						dispatch(GetAllOrders(status, currentUser, role));
					  } else {
						dispatch(GetAllOrders());
					  }
				} else {
					Swal.fire({
						title: 'failed to add try again',
						icon: "error",
					})
				}
			
			})
			.catch(error => {
				console.error('Error:', error);
			});

		}

		const handleKeyPress = (e) => {
			const charCode = e.which || e.keyCode;
			const charStr = String.fromCharCode(charCode);
			if (!/^[a-zA-Z]+$/.test(charStr)) {
				e.preventDefault();
			}
		};

    return(
        <Fragment>
				<Row>
                <Col md={6}>
						<FormGroup>
							<Label>Mobile No</Label>
							<Input onChange={
								(e) => setMobileNumber(e.target.value)
							}

							value={mobileno} readOnly/>
						</FormGroup>
					</Col>
				<Col md={6}>
						<FormGroup>
							<Label>User Type</Label>
<SelectBox options={userType_options} setSelcted={setuserType} initialValue={userType}/>
						</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Customer Name</Label>
						<Input onChange={
							(e) => SetName(e.target.value)
						}
						onKeyPress={handleKeyPress}
						value={name} placeholder='Enter Your Name'/>
					</FormGroup>
				</Col>

					<Col md={6}>
						<FormGroup>
							<Label>Email</Label>
							<Input onChange={
								(e) => setEmail(e.target.value)
							}
							type='email'
							value={email} placeholder='Enter Your Email'/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							<Label>Time</Label>
							<Input onChange={
								(e) => setTime(e.target.value)
							}
							value={time} type='time'/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Date</Label>
							<Input onChange={
								(e) => setDate(e.target.value)
							}
							value={date} type='date'/>
						</FormGroup>
					</Col>

          <Col md={6}>
						<FormGroup>
							<Label>Service Type</Label>
							<SelectBox options={getAllService} setSelcted={setService} initialValue={service}/>
						</FormGroup>
					</Col>
{/* 
          <Col md={6}>
						<FormGroup>
							<Label>Service Description</Label>
							<Input 
							onChange={
								(e) => setServiceDescription(e.target.value)
							}
							value={serviceDescription}
							placeholder='Enter Your Service Description'/>
						</FormGroup>
					</Col> */}

          {/* <Col md={6}>
						<FormGroup>
							<Label>Approx Duration</Label>
							<Input onChange={
								(e) => setApproxDuration(e.target.value)
							}
							value={approxDuration} placeholder='Enter Your Approx Duration'/>
						</FormGroup>
					</Col> */}

          <Col md={6}>
						<FormGroup>
							<Label>Supervisor Name</Label>
							<Input onChange={
								(e) => setSupervisorName(e.target.value)
							}
							onKeyPress={handleKeyPress}
							value={supervisorName} placeholder='Enter Your Supervisor Name'/>
						</FormGroup>
					</Col>


          <Col md={6}>
						<FormGroup>
							<Label> Service Date & Time</Label>
							<Input onChange={
								(e) => setServiceDateTime(e.target.value)
							}
							value={serviceDateTime} type='datetime-local'/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							<Label>Address</Label>
							<Input  onChange={
								(e) => setAddress(e.target.value)
							}
							value={address} placeholder='Enter Your Address'/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>City</Label>
							<Input type='text' onChange={
								(e) => setCity(e.target.value)
							}
							value={city} placeholder='Enter Your City'/>
						</FormGroup>
					</Col>

                        <Col md={6}>
						<FormGroup>
							<Label>ZipCode</Label>
							<Input type='text' onChange={
								(e) => setZipCode(e.target.value)
							}
							value={zipCode} placeholder='Enter Your ZipCode'/>
						</FormGroup>
					</Col>

					<Button className='bg-primary text-white' onClick={onsubmitDate}>Update</Button>
				</Row>
		</Fragment>
    )
}


export default UpdateOrderForm;