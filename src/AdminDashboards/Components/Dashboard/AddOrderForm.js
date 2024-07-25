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
	const [errors, setErrors]= useState([]);
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		user_type: '',
		age: '',
		mobile: '',
		membership: '',
		services: '',
		service_des: '',
		approx_duration: '',
		supervisor_name: '',
		lst_serv_date: '',
		lst_serv_type: '',
		serviceDateTime: '',
		address: '',
		city: '',
		zip_code: '',
		registered_id: '',
	  });

	  const UserTypes =[
		{
			label: 'regular',
			value: 'Regular',
		},
		{
			label: 'Urgent',
			value: 'urgent',
		},
		{
			label: 'Booking',
			value: 'booking',
		}
	]

	  const [service, setService] = useState('')
	  const [userType, setUsertype] = useState('')

	  useEffect(() => {
		if (formData?.mobile && formData.mobile.length === 10) {
		  fetchData();
		}
	  }, [formData?.mobile]);

	const fetchData = async () => {
		try {
			const response = await axios.get(API_URL + '/get/customerByMobile/' + formData?.mobile);
			
			let item = response.data.data
			let lastService = item?.recentOrder[item?.recentOrder.length - 1];
			console.log("lastService---",lastService)
				setFormData(prevFormData => ({
				  ...prevFormData,
				  name: item?.customerData?.NewCustomer?.name,
				  email: item?.customerData?.NewCustomer?.email,
				  age: item?.customerData?.age,
				  membership: item.member_id,
				  address: item?.customerData?.address,
				  city: item?.customerData?.location,
				  registered_id: item?.customerData?.NewCustomer?.id,
				  lst_serv_date: new Date(lastService?.createdAt).toISOString().split('T')[0],
				  lst_serv_type: lastService?.service_name,
				}));

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

	const onsubmitDate = (e) => {

		e.preventDefault();
        let errors = {};
		setIsLoading(true)
		if (!formData.name) {
            errors.name = "Name is required";
        }
		if (!formData.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			errors.mobile = "Mobile number should be 10 digits";
		}
		if (!formData.address) {
            errors.address = "address  is required";
        }
		if (!service.value) {
            errors.service = "service  is required";
        }
		if (!formData.serviceDateTime) {
            errors.serviceDateTime = "serviceDateTime  is required";
        }
		


        if (errors && Object.keys(errors).length === 0) {
			// Form is valid, handle form submission here
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			setIsLoading(false)
			return false;
		  }
		
		const data ={
			...formData,
			service_name: service.value,
			services: service.value,
			user_type: userType.value
		}

		const apiUrl = `${API_URL}/order/add/${formData?.registered_id}`;
		// Make a POST request using Axios
		axios.post(apiUrl, data).then(response => {
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



	const handleChange = (e, maxLength) => {
        const { name, value } = e.target;

        if (value.length <= maxLength) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        }
    };

	const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
        }
    };

	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
					
						<Label for="firstname">Mobile Number <span style={{color: "red"}}>*</span></Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							name='mobile'
							type='number'
							value={formData?.mobile}
							placeholder='Enter Your Mobile Number'/>
					</FormGroup>
					{errors?.mobile && (
							<span className='validationError'>
								{errors?.mobile}
							</span>
						)}
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="firstname">Customer Name <span style={{color: "red"}}>*</span></Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
							onKeyPress={handleKeyPress}
							value={formData?.name}
							placeholder='Enter Your Name'
							name='name'
							/>
							 {errors?.name && (
							<span className='validationError'>
								{errors?.name}
							</span>
						)}
					</FormGroup>
				</Col>
				<Col md={6}>
				<Label for="firstname">User Type </Label>
				<SelectBox options={UserTypes}
							setSelcted={setUsertype}
							selectOption={userType}/>
									</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Email</Label>
						<Input type='email'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.email}
							name='email'
							placeholder='Enter Your Email'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Age</Label>
						<Input 
						onChange={(e) => handleChange(e, 2)}
							type='number'
							value={formData?.age}
							name='age'
							placeholder='Enter Your Age'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>MemberShip Id</Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							value={formData?.membership}
							name='membership'
							placeholder='Enter Your MemberShip'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Service Type <span style={{color: "red"}}>*</span></Label>
						<SelectBox options={getAllService}
							setSelcted={setService}
							selectOption={service}/>
							{errors?.service && (
							<span className='validationError'>
								{errors?.service}
							</span>
						)}
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Service Description</Label>
						<Input 
						onChange={(e) => handleChange(e, 100)}
							value={formData?.service_des}
							name='service_des'
							placeholder='Enter Your Service Description'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Approx Duration</Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							value={formData?.approx_duration}
							name='approx_duration'
							placeholder='Enter Your Approx Duration'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Supervisor Name</Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
							onKeyPress={handleKeyPress}
							value={formData?.supervisor_name}
							name='supervisor_name'
							placeholder='Enter Your Supervisor Name'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Last Date Service</Label>
						<Input 
						onChange={(e) => handleChange(e, 20)}
							value={formData?.lst_serv_date}
							placeholder=''
							name='lst_serv_date'
							type='date'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Last Service Type</Label>
						<Input 
							onChange={(e) => handleChange(e, 20)}
							onKeyPress={handleKeyPress}
							value={formData?.lst_serv_type}
							placeholder='Enter Last Service Type'
							name='lst_serv_type'
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>
							Service Date & Time <span style={{color: "red"}}>*</span></Label>
						<Input 
							onChange={(e) => handleChange(e, 20)}
							value={formData?.serviceDateTime}
							name='serviceDateTime'
							type='datetime-local'/>
							{errors?.serviceDateTime && (
							<span className='validationError'>
								{errors?.serviceDateTime}
							</span>
						)}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Address</Label>
						<Input 
						onChange={(e) => handleChange(e, 20)}
							value={formData?.address}
							name='address'
							placeholder='Enter Your Address'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>City</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.city}
							name='city'
							placeholder='Enter Your City'/>
					</FormGroup>
				</Col>

				{/* <Col md={6}>
					<FormGroup>
						
						<Label for="firstname">ZipCode</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.zip_code}
							name='zip_code'
							placeholder='Enter Your ZipCode'/>
					</FormGroup>
					{errors?.zip_code && (
							<span className='validationError'>
								{errors?.zip_code}
							</span>
						)}
				</Col> */}

				<Col md={6}>
					<FormGroup>
						<Label>Register Id</Label>
						<Input 
							onChange={(e) => handleChange(e, 20)}
							value={formData?.registered_id}
							type='number'
							name='registered_id'
							placeholder='Enter Your Register Id'/>
					</FormGroup>
				</Col>
				<Button className='bg-primary text-white'
					onClick={onsubmitDate} disabled={isLoading}>Submit</Button>
			</Row>
		</Fragment>
	)
}

export default AddOrderForm
