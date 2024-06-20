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
import SelectBox from '../../../Elements/SelectBox';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
// import GetAllServicesReducer from '../../../../Store/Reducers/Dashboard/GetAllServicesReducer';
import {GetAllServices} from '../../../../Store/Actions/Dashboard/servicesAction';
import {ImageUploadAction} from '../../../../Store/Actions/ImageUploadAction';
import ImageUploadReducer from '../../../../Store/Reducers/ImageUploadReducers';
import {GetServiceProviderSignupAction} from '../../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import {WaitLoader} from '../../../Elements/WaitLoader';
import {useStateManager} from 'react-select';
import {useAuth} from '../../../../Context/userAuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../../config';
import { GetAllMonthlyServiceAction } from '../../../../Store/Actions/Dashboard/EmployeeActions/GetAllMonthlyServices';

const AddMonthlyServices = ({toggleModal,data}) => {

	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
        cust_name: data.cust_name || "",
        mobile_no: data.mobile_no || "",
        monthlyServices: data.monthlyServices || "",
        serviceType: data.serviceType || "",
        serviceServeType: data.serviceServeType || "",
        selectedTimeSlot: data.selectedTimeSlot || "",
        serviceFees: data.serviceFees || "",
        feesPaidDateTime: data.feesPaidDateTime || "",
        specialInterest: data.specialInterest || ""
    });

	const formattedDateTime = formData.feesPaidDateTime ? new Date(formData.feesPaidDateTime).toISOString().slice(0, 16) : "";

	// Simulated data for monthly services and hourly time slots
	const allMonthlyServices = ['Service A', 'Service B', 'Service C'];
	const allHourlyTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',"2:00 PM","3:00 PM","4:00 PM"];
	

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

	const onsubmit=() => {
		var apiUrl =""
		if(data.id!=null){
			 apiUrl = `${API_URL}/monthly-service/update/${data.id}`;
		}else{
			apiUrl = `${API_URL}/monthly-service/add`;
		}

		axios.post(apiUrl, formData)
			.then(response => {

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
		if (!/^[a-zA-Z\s]+$/.test(charStr)) {
			e.preventDefault();
		}
	};

	return (
		<Fragment>

            <Form>
                <Row>

				<Col md={6}>
								<FormGroup>
									<Label for="cust_name">Customer Name </Label>
									<Input 
									onKeyPress={handleKeyPress}
									name="cust_name"
										onChange={(e) => handleChange(e, 50)}
										id="cust_name"
										value={formData?.cust_name}
										placeholder="Enter Customer Name "/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="mobile_no">Mobile No</Label>
									<Input type="number" name="mobile_no"
										onChange={(e) => handleChange(e, 10)}
										value={formData?.mobile_no}
										id="mobile_no"
										placeholder="Enter Mobile No"/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="monthlyServices">Monthly Services</Label>
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
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="serviceType">Service Type</Label>
									<Input type="text" name="serviceType"
										onChange={(e) => handleChange(e, 50)}
										id="serviceType"
										placeholder="Enter Service Type"
										value={formData.serviceType}
										onKeyPress={handleKeyPress}
										/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="serviceServeType">Service Serve Type</Label>
									<Input type="select" name="serviceServeType"
										onChange={(e) => handleChange(e, 50)}
										id="serviceServeType" value={formData.serviceServeType}>
										<option value="">Select Serve Type</option>
										<option value="After">After</option>
										<option value="Daily">Daily</option>
									</Input>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="selectedTimeSlot">Hourly Time Slots</Label>
									<Input type="select" name="selectedTimeSlot"
										onChange={(e) => handleChange(e, 50)}
										id="selectedTimeSlot" value={formData.selectedTimeSlot}>
										<option value="">Select Time Slot</option>
										{
										allHourlyTimeSlots.map((timeSlot, index) => (
											<option key={index}
												value={timeSlot}>
												{timeSlot} </option>
										))
									} </Input>
								</FormGroup>
							</Col>
                            <Col md={6}>
								<FormGroup>
									<Label for="serviceFees">Service Fees</Label>
									<Input type="number" name="serviceFees"
										onChange={(e) => handleChange(e, 10)}
										id="serviceFees"
										placeholder="Enter service fees"
										value={formData.serviceFees}
										/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="feesPaidDateTime">Fees Paid Date & Time</Label>
									<Input type="datetime-local" name="feesPaidDateTime"
										onChange={(e) => handleChange(e, 50)}
										id="feesPaidDateTime"
										value={formattedDateTime}
										/>
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

							
                            <Button onClick={onsubmit} className='bg-primary text-white'>  {data ? "Update" : "Submit"} </Button>
                        </Row>
				</Form>
		</Fragment>
	)
}
export default AddMonthlyServices;
