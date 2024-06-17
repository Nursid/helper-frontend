import React, {Fragment, useEffect, useState} from 'react'
import {UseStateManager} from '../../../Context/StateManageContext'
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row
} from 'reactstrap'
import axios from 'axios'
import {API_URL} from '../../../config'
import SelectBox from '../../Elements/SelectBox';
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'
const AddOrderForm = ({prop, GetAllOrders, role, currentUser}) => {
	const {rows, setRows, Show, setShow} = UseStateManager()
	const [getAllService, setAllservices] = useState([])
	const dispatch = useDispatch()
	const [customerName, setCustomerName] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [memberShipId, setMemberShipId] = useState('');
	const [service, setService] = useState('')
	const [serviceDescription, setServiceDescription] = useState('');
	const [approxDuration, setApproxDuration] = useState('');
	const [supervisorName, setSupervisorName] = useState('');
	const [lastDateService, setLastDateService] = useState('');
	const [lastServiceType, setLastServiceType] = useState('');
	const [serviceDateTime, setServiceDateTime] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [registerId, setRegisterId] = useState('');
	const [status, setStatus] = useState('Pending');

	useEffect(() => {
		if (mobileNumber.length === 10) {
			fetchData();
		}
	}, [mobileNumber]);

	const fetchData = async () => {
		try {
			const response = await axios.get(API_URL + '/get/customerByMobile/' + mobileNumber);
			response.data.data.map((item) => {
				setCustomerName(item.NewCustomer.name)
				setEmail(item.NewCustomer.email)
				setAge(item.age)
				setMemberShipId(item.member_id)
				setAddress(item.address)
				setCity(item.location)
				setRegisterId(item.user_id)
			})
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getAllServices();
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service/getall')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.serviceName, value: item.serviceName}));
			setAllservices(transformedData);
		}
	}

	const onsubmitDate = () => {

		const formData = {
			name: customerName,
			email: email,
			age: age,
			mobile: mobileNumber,
			membership: memberShipId,
			services: service.value,
			service_des: serviceDescription,
			approx_duration: approxDuration,
			supervisor_name: supervisorName,
			lst_serv_date: lastDateService,
			lst_serv_type: lastServiceType,
			serviceDateTime: serviceDateTime,
			address: address,
			city: city,
			zip_code: zipCode,
			registered_id: registerId
		};

		const apiUrl = `${API_URL}/order/add/${registerId}`;
		// Make a POST request using Axios
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				prop();
				Swal.fire('Successfully!', 'Your Order has been Added.', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			if (role === "service" || role === "supervisor") {
				const status = undefined;
				dispatch(GetAllOrders(status, currentUser, role));
			  } else {
				dispatch(GetAllOrders());
			  }
		}).catch(error => {
			console.error('Error:', error);
		});
	};


	const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z]+$/.test(charStr)) {
            e.preventDefault();
        }
    };

	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label>Mobile Number</Label>
						<Input onChange={
								(e) => setMobileNumber(e.target.value)
							}
							type='number'
							value={mobileNumber}
							placeholder='Enter Your Mobile Number'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Customer Name</Label>
						<Input onChange={
								(e) => setCustomerName(e.target.value)
							}
							onKeyPress={handleKeyPress}
							value={customerName}
							placeholder='Enter Your Name'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Email</Label>
						<Input type='email'
							onChange={
								(e) => setEmail(e.target.value)
							}
							value={email}
							placeholder='Enter Your Email'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Age</Label>
						<Input onChange={
								(e) => setAge(e.target.value)
							}
							type='number'
							value={age}
							placeholder='Enter Your Age'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>MemberShip Id</Label>
						<Input onChange={
								(e) => setMemberShipId(e.target.value)
							}
							value={memberShipId}
							placeholder='Enter Your MemberShip'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Service Type</Label>
						<SelectBox options={getAllService}
							setSelcted={setService}
							selectOption={service}/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Service Description</Label>
						<Input onChange={
								(e) => setServiceDescription(e.target.value)
							}
							value={serviceDescription}
							placeholder='Enter Your Service Description'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Approx Duration</Label>
						<Input onChange={
								(e) => setApproxDuration(e.target.value)
							}
							value={approxDuration}
							placeholder='Enter Your Approx Duration'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Supervisor Name</Label>
						<Input onChange={
								(e) => setSupervisorName(e.target.value)
							}
							onKeyPress={handleKeyPress}
							value={supervisorName}
							placeholder='Enter Your Supervisor Name'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Last Date Service</Label>
						<Input onChange={
								(e) => setLastDateService(e.target.value)
							}
							value={lastDateService}
							placeholder=''
							type='date'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Last Service Type</Label>
						<Input onChange={
								(e) => setLastServiceType(e.target.value)
							}
							onKeyPress={handleKeyPress}
							value={lastServiceType}
							placeholder='Enter Last Service Type'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>
							Service Date & Time</Label>
						<Input onChange={
								(e) => setServiceDateTime(e.target.value)
							}
							value={serviceDateTime}
							type='datetime-local'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Address</Label>
						<Input onChange={
								(e) => setAddress(e.target.value)
							}
							value={address}
							placeholder='Enter Your Address'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>City</Label>
						<Input type='text'
							onChange={
								(e) => setCity(e.target.value)
							}
							value={city}
							placeholder='Enter Your City'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>ZipCode</Label>
						<Input type='number'
							onChange={
								(e) => setZipCode(e.target.value)
							}
							value={zipCode}
							placeholder='Enter Your ZipCode'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Register Id</Label>
						<Input onChange={
								(e) => setRegisterId(e.target.value)
							}
							value={registerId}
							type='number'
							placeholder='Enter Your Register Id'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Status</Label>
						<Input onChange={
								(e) => setStatus(e.target.value)
							}
							value={status}
							type='text'
							placeholder='Status'/>
					</FormGroup>
				</Col>
				<Button className='bg-primary text-white'
					onClick={onsubmitDate}>Submit</Button>
			</Row>
		</Fragment>
	)
}

export default AddOrderForm
