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

	const [formData, setFormData] = useState({
		name: '',
		email: '',
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
		registered_id: ''
	  });

	  const [service, setService] = useState('')

	  useEffect(() => {
		if (formData?.mobile && formData.mobile.length === 10) {
		  fetchData();
		}
	  }, [formData?.mobile]);

	const fetchData = async () => {
		try {
			const response = await axios.get(API_URL + '/get/customerByMobile/' + formData?.mobile);
			response.data.data.forEach(item => {
				setFormData(prevFormData => ({
				  ...prevFormData,
				  name: item.NewCustomer.name,
				  email: item.NewCustomer.email,
				  age: item.age,
				  membership: item.member_id,
				  address: item.address,
				  city: item.location,
				  registered_id: item.user_id
				}));
			  });

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
		
		const data ={
			...formData,
			service_name: service.value,
			services: service.value
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
						<Label>Mobile Number</Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							name='mobile'
							type='number'
							value={formData?.mobile}
							placeholder='Enter Your Mobile Number'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label>Customer Name</Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
							onKeyPress={handleKeyPress}
							value={formData?.name}
							placeholder='Enter Your Name'
							name='name'
							/>
					</FormGroup>
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
						<Label>Service Type</Label>
						<SelectBox options={getAllService}
							setSelcted={setService}
							selectOption={service}/>
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
							Service Date & Time</Label>
						<Input 
							onChange={(e) => handleChange(e, 20)}
							value={formData?.serviceDateTime}
							name='serviceDateTime'
							type='datetime-local'/>
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

				<Col md={6}>
					<FormGroup>
						<Label>ZipCode</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.zip_code}
							name='zip_code'
							placeholder='Enter Your ZipCode'/>
					</FormGroup>
				</Col>

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
					onClick={onsubmitDate}>Submit</Button>
			</Row>
		</Fragment>
	)
}

export default AddOrderForm
