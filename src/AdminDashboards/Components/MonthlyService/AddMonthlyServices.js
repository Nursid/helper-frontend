import React, {Fragment, useEffect, useState} from 'react'

import {
	Form,
	Row,
	Col,
	Card,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import SelectBox from '../../Elements/SelectBox';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config';
import { GetAllMonthlyServiceAction } from '../../../Store/Actions/Dashboard/EmployeeActions/GetAllMonthlyServices';
import { GetAllTimeSlot } from '../../../Store/Actions/Dashboard/Orders/OrderAction';

const AddMonthlyServices = ({toggleModal, data}) => {

	const dispatch = useDispatch();
	const [GetAlltimeSlot , setGetAlltimeSlot] = useState([])
	const [formData, setFormData] = useState({
        cust_name: data.cust_name || "",
        mobile_no: data.mobile_no || "",
        monthlyServices: data.monthlyServices || "",
        serviceType: data.serviceType || "",
        serviceServeType: data.serviceServeType || "",
        selectedTimeSlot: data.selectedTimeSlot || "",
        serviceFees: data.serviceFees || "",
        feesPaidDateTime: data.feesPaidDateTime || "",
        specialInterest: data.specialInterest || "",
		service_provider: data?.service_provider || ""
    });

	

	const [timeslot, setTimeslot] = useState(data.selectedTimeSlot || '')
	const [errors, setErrors] = useState([]);
	const [allservices, setAllservices] = useState([]);
	const [serviceType, setServiceType] = useState(data.serviceType || '');
	const [isLoadingSubmit, setIsLoading] = useState(false);
	const [getAllServiceProvider, setGetAllServiceProvider] = useState([])
	const [serviceProvider, setServiceProvider] = useState(data?.service_provider || "")

	// Simulated data for monthly services and hourly time slots
	const allMonthlyServices = ['Service A', 'Service B', 'Service C'];


	const { data: timeSLotData, isLoading } = useSelector(state => state.GetAllTimeSlotReducer);

	const DataWithID = (data) => {
		const transformedData = data?.map(item => ({label: item.time_range, value: item.time_range}));
		setGetAlltimeSlot(transformedData);
	}

	useEffect(() => {
		dispatch(GetAllTimeSlot())
	}, []);

	useEffect(() => {
		if(!isLoading && timeSLotData?.data){
			DataWithID(timeSLotData?.data);
		}
	}, [isLoading, timeSLotData?.data]);
	

	// Handle change for text inputs and dropdowns
	const handleChange = (e, maxLength) => {
        const { name, value } = e.target;

        if (value.length <= maxLength) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        }
    };

	useEffect(()=>{
		if(formData.feesPaidDateTime && timeslot?.value){
			const assignDate = formData.feesPaidDateTime;
            const filterData = {
				date: assignDate,
				time_range: timeslot.value
			}
			getAllServicesProvider(filterData)
		  }
	  }, [formData.feesPaidDateTime, timeslot?.value])

	  const getAllServicesProvider = async (filterData) => {
		try {
			console.log("filterData---",filterData)
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


	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service/getall')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.serviceName, value: item.serviceName}));
			setAllservices(transformedData);
		}
	}

	useEffect(()=>{
		getAllServices()
	}, [])

	const onsubmit=(e) => {


		e.preventDefault();
        let errors = {};
		setIsLoading(true)

		if (!formData?.cust_name) {
            errors.cust_name = "Name is required";
        }

		if (!formData?.mobile_no) {
			errors.mobile_no = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile_no)) {
			errors.mobile_no = "Mobile number should be 10 digits";
		}
		
		if (!serviceType?.value) {
            errors.serviceType = "service Name is required";
        }
		if (!timeslot?.value) {
            errors.timeslot = "timeslot is required";
        }
		if (!formData?.serviceFees) {
            errors.serviceFees = "serviceFees is required";
        }
		if (!formData?.feesPaidDateTime) {
            errors.feesPaidDateTime = "Date is required";
        }
		if (!formData?.serviceServeType) {
            errors.serviceServeType = "serviceServeType is required";
        }

		if (!serviceProvider?.value) {
            errors.service_provider = "service provider is required";
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

		const  OriginalData = {
			...formData,
			selectedTimeSlot: timeslot?.value,
			serviceType: serviceType?.value,
			service_provider: serviceProvider?.value
		}
		console.log(OriginalData)

		var apiUrl =""
		if(data.id!=null){
			 apiUrl = `${API_URL}/monthly-service/update/${data.id}`;
		}else{
			apiUrl = `${API_URL}/monthly-service/add`;
		}

		axios.post(apiUrl, OriginalData)
			.then(response => {
				setIsLoading(false)
				if (response.status === 200) {
					toggleModal();
					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
					dispatch(GetAllMonthlyServiceAction())
					
				} else {
					Swal.fire({
						title: response?.data.message,
						icon: "error",
					})
				}
			})
			.catch(error => {
				setIsLoading(false)
				console.error('Error:', error);
				Swal.fire({
					title: error,
					icon: "error",
				})
			});
			setIsLoading(false)
		
	}
 
	const handleKeyPress = (e) => {
		const charCode = e.which || e.keyCode;
		const charStr = String.fromCharCode(charCode);
		if (!/^[a-zA-Z\s]+$/.test(charStr)) {
			e.preventDefault();
		}
	};
	const today = new Date().toISOString().split('T')[0];

	return (
		<Fragment>

            <Form>
                <Row>

				<Col md={6}>
								<FormGroup>
									<Label for="cust_name">Customer Name <span style={{color: "red"}}>*</span> </Label>
									<Input 
									onKeyPress={handleKeyPress}
									name="cust_name"
										onChange={(e) => handleChange(e, 50)}
										id="cust_name"
										value={formData?.cust_name}
										placeholder="Enter Customer Name "/>
										{errors?.cust_name && (
										<span className='validationError'>
											{errors?.cust_name}
										</span>
									)}
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="mobile_no">Mobile No <span style={{color: "red"}}>*</span></Label>
									<Input type="number" name="mobile_no"
										onChange={(e) => handleChange(e, 10)}
										value={formData?.mobile_no}
										id="mobile_no"
										placeholder="Enter Mobile No"/>
										{errors?.mobile_no && (
										<span className='validationError'>
											{errors?.mobile_no}
										</span>
									)}
								</FormGroup>
							</Col>
							{/* <Col md={6}>
								<FormGroup>
									<Label for="monthlyServices">Monthly Services </Label>
									<Input 
										type="select" 
										name="monthlyServices"
										onChange={(e) => handleChange(e, 50)}
										id="monthlyServices"
										value={formData?.monthlyServices} 
									>
										<option value="">Select Monthly Service</option>
										{
											allMonthlyServices.map((service, index) => (
												<option 
													key={index}
													value={service}
												>
													{service}
												</option>
											))
										}
									</Input>
								</FormGroup>
							</Col> */}

							<Col md={6}>
								<FormGroup>
									<Label>Service Name <span style={{color: "red"}}>*</span></Label>
									<SelectBox 
										setSelcted={setServiceType}
										initialValue={serviceType}
										options={allservices}
										/>
										{errors?.serviceType && (
										<span className='validationError'>
											{errors?.serviceType}
										</span>
									)}
								</FormGroup>
							</Col>


							<Col md={6}>
								<FormGroup>
									<Label for="serviceServeType">Monthly Service Type <span style={{color: "red"}}>*</span></Label>
									<Input type="select" name="serviceServeType"
										onChange={(e) => handleChange(e, 50)}
										id="serviceServeType" value={formData.serviceServeType}>
										<option value="" defaultChecked disabled>Select Serve Type</option>
										<option value="Daily">Daily</option>
										<option value="Weekly">Weekly</option>
									</Input>
									{errors?.serviceServeType && (
										<span className='validationError'>
											{errors?.serviceServeType}
										</span>
									)}
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="feesPaidDateTime"> Date  <span style={{color: "red"}}>*</span></Label>
									<Input type="date" name="feesPaidDateTime"
										onChange={(e) => handleChange(e, 50)}
										id="feesPaidDateTime"
										value={formData?.feesPaidDateTime}
										min={today}
										/>
										{errors?.feesPaidDateTime && (
							<span className='validationError'>
								{errors?.feesPaidDateTime}
							</span>
						)}
								</FormGroup>
							</Col>

							<Col md={6}>

					<FormGroup>
						<Label>Time Slot <span style={{color: "red"}}>*</span></Label>
						<SelectBox 
							setSelcted={setTimeslot}
							initialValue={timeslot}
							options={GetAlltimeSlot}
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
						{errors?.service_provider && (
							<span className='validationError'>
								{errors?.service_provider}
							</span>
						)}
					</FormGroup>
				</Col>



                            <Col md={6}>
								<FormGroup>
									<Label for="serviceFees">Service Fees <span style={{color: "red"}}>*</span></Label>
									<Input type="number" name="serviceFees"
										onChange={(e) => handleChange(e, 10)}
										id="serviceFees"
										placeholder="Enter service fees"
										value={formData.serviceFees}
										/>
										{errors?.serviceFees && (
							<span className='validationError'>
								{errors?.serviceFees}
							</span>
						)}
								</FormGroup>
							</Col>

							

							<Col md={12}>
								<FormGroup>
									<Label for="specialInterest">Special Interest</Label>
									<Input type="textarea" name="specialInterest"
										onChange={(e) => handleChange(e, 100)}
										id="specialInterest"
										placeholder="Enter special interest description"
										value={formData.specialInterest}
										/>
								</FormGroup>
							</Col>

							
                            <Button onClick={onsubmit} className='bg-primary text-white' disabled={isLoadingSubmit}>  {data ? "Update" : "Submit"} </Button>
                        </Row>
				</Form>
		</Fragment>
	)
}
export default AddMonthlyServices;
