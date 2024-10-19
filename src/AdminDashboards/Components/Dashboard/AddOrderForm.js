import React, {Fragment, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
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
import { GetAllTimeSlot } from '../../../Store/Actions/Dashboard/Orders/OrderAction'
const AddOrderForm = ({prop, GetAllOrders, role, currentUser, mobileNo, setModalTitle}) => {
	const {rows, setRows, Show, setShow} = UseStateManager()
	const [getAllService, setAllservices] = useState([])
	const [getAlltimeSlot, setGetAlltimeSlot] = useState([])
	const [getAllServiceProvider, setGetAllServiceProvider] = useState([])
	const [getAllSupervisor, setGetAllSupervisor] = useState([])
	const [timeslot, setTimeslot] = useState(null)
	const [supervisor, setSupervisor] = useState(null)
	const [serviceProvider, setServiceProvider] = useState(null)
	const dispatch = useDispatch()
	const [errors, setErrors]= useState([]);
	const [isLoadings, setIsLoading] = useState(false)
	const { data, isLoading } = useSelector(state => state.GetAllTimeSlotReducer);

	const DataWithID = (data) => {
		const transformedData = data?.map(item => ({label: item.time_range, value: item.time_range}));
		setGetAlltimeSlot(transformedData);
	}

	useEffect(() => {
		dispatch(GetAllTimeSlot())
	}, []);

	useEffect(() => {
		if(!isLoading && data?.data){
			DataWithID(data?.data);
		}
	}, [isLoading, data?.data]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		user_type: '',
		age: '',
		mobile: mobileNo || '',
		problem_des: '',
		approx_duration: '',
		lst_serv_date: '',
		lst_serv_type: '',
		service_address: '',
		member_id: '',
		city: '',
		cust_id: '',
		servicep_id: '',
		suprvisor_id: '',
		serviceDateTime: '',
		allot_time_range: '',
		alterno: ''
	  });

	  useEffect(()=>{
		if(formData.serviceDateTime && timeslot?.value){
			const assignData = formData.serviceDateTime.split('T')[0];
            const filterData = {
				date: assignData,
				time_range: timeslot.value
			}
			getAllServicesProvider(filterData)
			GetAllSupervisor(filterData)
		  }
	  }, [formData.serviceDateTime, timeslot?.value])
	  

	const UserTypes =[
	{
		label: 'Regular',
		value: 'Regular',
	},
	{
		label: 'Urgent',
		value: 'Urgent',
	},
	{
		label: 'Booking',
		value: 'Booking',
	}
	]

	const [service, setService] = useState('')
	const [userType, setUsertype] = useState('')

	useEffect(() => {
		if (formData?.mobile && formData.mobile.length === 10) {
			fetchData();
		}
	}, []);

	const fetchData = async () => {
		if (!formData.mobile || formData.mobile.length !== 10) {
			return;
		}
		try {
			const response = await axios.get(API_URL + '/get/customerByMobile/' + formData.mobile);
			
			let item = response.data.data
			if (item?.recentOrder) {
				setModalTitle(
					<>
						Add Order (<span style={{ color: 'red' }}>Member</span>)
					</>
				);
				let lastService = item.recentOrder[item.recentOrder.length - 1];
				setFormData(prevFormData => ({
					...prevFormData,
					name: item?.customerData?.NewCustomer?.name,
					email: item?.customerData?.NewCustomer?.email,
					age: item?.customerData?.age,
					member_id: item?.customerData?.member_id,
					service_address: item?.customerData?.address,
					city: item?.customerData?.location,
					cust_id: item?.customerData?.NewCustomer?.id,
					lst_serv_date: lastService ? new Date(lastService.createdAt).toISOString().split('T')[0] : '',
					lst_serv_type: lastService?.service_name || '',
				}));
			} else {
				setModalTitle(
					<>
						Add Order (<span style={{ color: 'red' }}>Not Member</span>)
					</>
				);
				setFormData(prevFormData => ({
					
					...prevFormData,
					name: item?.customerData?.NewCustomer?.name,
					email: item?.customerData?.NewCustomer?.email,
					age: item?.customerData?.age,
					member_id: item?.customerData?.member_id,
					service_address: item?.customerData?.address,
					city: item?.customerData?.location,
					cust_id: item?.customerData?.NewCustomer?.id,
					lst_serv_date: '',
					lst_serv_type: '',
				}));
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getAllServices()
		
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
		if (!formData?.name) {
            errors.name = "Name is required";
        }
		if (!formData?.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			errors.mobile = "Mobile number should be 10 digits";
		}
		if (!formData?.service_address) {
            errors.service_address = "address  is required";
        }
		if (!service?.value) {
            errors.service = "service  is required";
        }
		if (!formData?.serviceDateTime) {
            errors.serviceDateTime = "serviceDateTime  is required";
        }
		if (!timeslot?.value) {
            errors.timeslot = "timeslot  is required";
        }
		// if (!serviceProvider?.value) {
        //     errors.serviceProvider = "service Provider  is required";
        // }
		// if (!supervisor?.value) {
        //     errors.supervisor = "supervisor  is required";
        // }
		


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
			user_type: userType.value,
			servicep_id: serviceProvider?.value,
			suprvisor_id: supervisor?.value,
			allot_time_range: timeslot.value
		}
		const apiUrl = `${API_URL}/order/add`;
		// Make a POST request using Axios
		axios.post(apiUrl, data).then(response => {
			if (response.data.status === true) {
				prop();
				Swal.fire('Successfully!', 'Order Placed Successfully' , 'success')
			} else {
				Swal.fire({title: response.data.message, icon: "error"})
			}
			if (role === "service" || role === "supervisor") {
				const status = undefined;
				dispatch(GetAllOrders(status, currentUser, role));
			  } else {
				dispatch(GetAllOrders());
			  }
			  setIsLoading(false)
		}).catch(error => {
			Swal.fire({title: error, icon: "error"})
			console.error('Error:', error);
			setIsLoading(false)
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

	const getAllServicesProvider = async (filterData) => {
		try {
		  const queryParams = new URLSearchParams(filterData).toString()
		  const response = await axios.get(`${API_URL}/service-provider/getall?${queryParams}`);
		  if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({ label: item.name, value: item.name }));
			setGetAllServiceProvider(transformedData);
		  }
		} catch (error) {
		  console.error("Error fetching service providers:", error);
		}
	}

	const GetAllSupervisor = async (filterData) => {
		const queryParams = new URLSearchParams(filterData).toString()
		const response = await axios.get(API_URL + `/employee/getall?${queryParams}`)
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.name, value: item.name}));
			setGetAllSupervisor(transformedData);
		}
	}

	const currentDate = new Date().toISOString().slice(0, 16);

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
							readOnly={!!formData?.cust_id}
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
							readOnly={!!formData?.cust_id}
							/>
							 {errors?.name && (
							<span className='validationError'>
								{errors?.name}
							</span>
						)}
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="firstname">Alternate Number</Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							name='alterno'
							type='number'
							value={formData?.alterno}
							placeholder='Enter Your Alternate Number'/>
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
							readOnly={!!formData?.cust_id}
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
							readOnly={!!formData?.cust_id}
							placeholder='Enter Your Age'/>
					</FormGroup>
				</Col>
				{formData?.cust_id && 
				<Col md={6}>
					<FormGroup>
						<Label>MemberShip Id</Label>
						<Input 
						onChange={(e) => handleChange(e, 10)}
							value={formData?.member_id}
							name='member_id'
							readOnly={!!formData?.cust_id}
							placeholder='Enter Your member Id'/>
					</FormGroup>
				</Col>
				}
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
							value={formData?.problem_des}
							name='problem_des'
							placeholder='Enter Your Service Description'/>
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
							type='datetime-local'
							min={currentDate} // Disable previous dates
							/>
							{errors?.serviceDateTime && (
							<span className='validationError'>
								{errors?.serviceDateTime}
							</span>
						)}
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
						<Label>Time Slot <span style={{color: "red"}}>*</span></Label>
						<SelectBox 
							setSelcted={setTimeslot}
							initialValue={timeslot}
							options={getAlltimeSlot}
							/>
							{errors?.timeslot && (
							<span className='validationError'>
								{errors?.timeslot}
							</span>
						)}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Service Provider <span style={{color: "red"}}>*</span></Label>
						<SelectBox 
						options={getAllServiceProvider}
						initialValue={serviceProvider}
						setSelcted={setServiceProvider}
						/>
						{errors?.serviceProvider && (
							<span className='validationError'>
								{errors?.serviceProvider}
							</span>
						)}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Supervisor Name <span style={{color: "red"}}>*</span></Label>
						<SelectBox 
						options={getAllSupervisor}
						initialValue={supervisor}
						setSelcted={setSupervisor}
						/>
						{errors?.supervisor && (
							<span className='validationError'>
								{errors?.supervisor}
							</span>
						)}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label>Last Date Service</Label>
						<Input 
						onChange={(e) => handleChange(e, 20)}
							value={formData?.lst_serv_date}
							placeholder=''
							readOnly={!!formData?.cust_id}
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
							readOnly={!!formData?.cust_id}
							placeholder='Enter Last Service Type'
							name='lst_serv_type'
							/>
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
						<Label>Address <span style={{color: "red"}}>*</span></Label>
						<Input 
						onChange={(e) => handleChange(e, 200)}
							value={formData?.service_address}
							name='service_address'
							type='textarea'
							placeholder='Enter Your Address'/>
							{errors?.service_address && (
							<span className='validationError'>
								{errors?.service_address}
							</span>
						)}
					</FormGroup>
				</Col>
				<Button className='bg-primary text-white'
					onClick={onsubmitDate} disabled={isLoadings}>Submit</Button>
			</Row>
		</Fragment>
	)
}

export default AddOrderForm
