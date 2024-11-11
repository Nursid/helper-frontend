import React, {Fragment, useEffect, useState, useRef} from 'react'

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
import { useReactToPrint } from 'react-to-print';
import Select from 'react-select';


const AddMonthlyServices = ({toggleModal, data}) => {

	const today2 = new Date().toISOString().slice(0, 16); // Format: 'YYYY-MM-DDTHH:mm'


	const [getAllSupervisor, setGetAllSupervisor] = useState([])
	const [supervisor, setSupervisor] = useState(data?.supervisor || '')
	const dispatch = useDispatch();
	const [GetAlltimeSlot , setGetAlltimeSlot] = useState([])
	const [formData, setFormData] = useState({
        cust_name: data.cust_name || "",
        mobile_no: data.mobile_no || "",
        serviceType: data.serviceType || "",
        serviceServeType: data.serviceServeType || "",
        selectedTimeSlot: data.selectedTimeSlot || "",
        feesPaidDateTime: (data?.feesPaidDateTime ? data.feesPaidDateTime.slice(0, 16) : today2),	
        specialInterest: data.specialInterest || "",
		service_provider: data?.service_provider || "",
		kit_no: data?.kit_no || "",
		bike_no: data?.bike_no || "",
		paymethod: data?.paymethod || '',
		netpayamt: data?.netpayamt || '',
		piadamt: data?.piadamt || '',
		totalamt: data?.totalamt || '',
		near_by: data?.near_by || '',
		land_mark: data?.land_mark || '',
		location: data?.location || '',
		mohalla: data?.mohalla || '',
		area: data?.area || '',
		shift: data?.shift || '',
		before_cleaning: null,
    	after_cleaning: null,
		reference2: data?.reference2 || '',
		reference: data?.reference || ''
    });

	

	const [timeslot, setTimeslot] = useState(data.selectedTimeSlot || '')
	const [errors, setErrors] = useState([]);
	const [allservices, setAllservices] = useState([
		{label: "Car Washing", value: "Car Washing"},
		{label: "Car Dustinng", value: "Car Dusting"},
		{label: "Dog Walk", value: "Dog Walk"},
		{label: "Bathroom Cleaning", value: "Bathroom Cleaning"},
		{label: "Monthly Cleaning", value: "Monthly Cleaning"},
		{label: "Miscellaneous", value: "Miscellaneous"},
	]);
	const payMethodOptions = [
		{ label: 'Cash', value: 'Cash' },
		{ label: 'Online', value: 'Online' },
	  ];
	const [serviceType, setServiceType] = useState(data.serviceType || '');
	const [shift, setShift] = useState(data?.shift || '');
	const [isLoadingSubmit, setIsLoading] = useState(false);
	const [getAllServiceProvider, setGetAllServiceProvider] = useState([])
	const [serviceProvider, setServiceProvider] = useState(data?.service_provider || "")

	const { data: timeSLotData, isLoading } = useSelector(state => state.GetAllTimeSlotReducer);

	const DataWithID = (data) => {
		const transformedData = data?.map(item => ({label: item.time_range, value: item.time_range}));
		setGetAlltimeSlot(transformedData);
	}

	useEffect(() => {
		dispatch(GetAllTimeSlot())
		getAllServicesProvider()
		GetAllSupervisor()
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
		  setFormData((prev) => ({ ...prev, [name]: value }));
		  }
		if (name === 'netpayamt' || name === 'piadamt') {
		  const bill = name === 'netpayamt' ? parseFloat(value) : parseFloat(formData.netpayamt);
		  const paid = name === 'piadamt' ? parseFloat(value) : parseFloat(formData.piadamt);
		  setFormData((prev) => ({ ...prev, totalamt: bill - paid }));
		}
    };


	  const getAllServicesProvider = async () => {
		try {
		  const response = await axios.get(`${API_URL}/service-provider/getall`);
		  if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({ label: item.name, value: item.name }));
			setGetAllServiceProvider(transformedData);
		  }
		} catch (error) {
		  console.error("Error fetching service providers:", error);
		}
	  }


	  const GetAllSupervisor = async () => {
		const response = await axios.get(API_URL + `/employee/getall`)
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.name, value: item.name}));
			setGetAllSupervisor(transformedData);
		}
	  }

	const onsubmit= async (e) => {
	e.preventDefault();
    let errors = {};
    setIsLoading(true);

    if (!formData?.cust_name) {
        errors.cust_name = "Name is required";
    }

    if (!formData?.mobile_no) {
        errors.mobile_no = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_no)) {
        errors.mobile_no = "Mobile number should be 10 digits";
    }

    if (!serviceType?.value) {
        errors.serviceType = "Service Name is required";
    }

    if (!timeslot?.value) {
        errors.timeslot = "Timeslot is required";
    }

    if (!formData?.feesPaidDateTime) {
        errors.feesPaidDateTime = "Date is required";
    }

    if (!formData?.serviceServeType) {
        errors.serviceServeType = "Service Serve Type is required";
    }


	if(serviceType?.value === "Car Washing"){
		if (Object.keys(serviceProvider).length === 0) {
			errors.service_provider = "Service provider is required";
		}
	}else{
		if (!serviceProvider?.value) {
			errors.service_provider = "Service provider is required";
		}
	}

   

	if (!supervisor?.value) {
        errors.supervisor = "supervisor is required";
    }

    formData.totalamt = formData.netpayamt - formData.piadamt;

    if (errors && Object.keys(errors).length === 0) {
        // Form is valid, handle form submission here
        console.log("Form submitted successfully!");
    } else {
        // Form is invalid, display validation errors
        console.log("Validation Errors:", errors);
        setErrors(errors);
        setIsLoading(false);
        return false;
    }

	
		const  OriginalData = {
			...formData,
			selectedTimeSlot: timeslot?.value,
			serviceType: serviceType?.value,
			service_provider: (serviceType?.value === "Car Washing") ? serviceProvider.map(option => option.value).join(', ') : serviceProvider?.value,
			shift: shift?.value,
			supervisor: supervisor?.value
		}

		const formData1 = new FormData();

		// Append existing form data
		for (const key in OriginalData) {
			if (OriginalData[key] !== undefined) {
				formData1.append(key, OriginalData[key]);
			}
		}

		// If you want to append files separately, you can check for them here
		if (formData.before_cleaning?.file) {
			formData1.append('before_cleaning', formData.before_cleaning.file);
		}

		if (formData.after_cleaning?.file) {
			formData1.append('after_cleaning', formData.after_cleaning.file);
		}

		const AddAccountAmount1 = {
			payment_mode: formData?.paymethod,
			amount: formData?.piadamt,
			person_name: formData?.cust_name,
			about_payment: data.serviceType,
			balance: formData?.totalamt,
			order_no: data.orderNo,
			type_payment: 0
		}

		var apiUrl =""
		if(data.id!=null){
			 apiUrl = `${API_URL}/monthly-service/update/${data.orderNo}`;
		}else{
			apiUrl = `${API_URL}/monthly-service/add`;
		}

		axios.post(apiUrl, formData1, {'Content-Type': 'multipart/form-data'})
			.then( async (response) => {
				setIsLoading(false)
				if (response.status === 200) {

					if (data.id == null && formData?.piadamt) {
						const AddAccountAmount = {
							payment_mode: formData?.paymethod,
							amount: formData?.piadamt,
							person_name: formData?.cust_name,
							about_payment: serviceType?.value,
							balance: formData?.totalamt,
							order_no: response.data.orderNo,
							type_payment: 0
						};
						const res = await axios.post(`${API_URL}/api/add-balance`, AddAccountAmount);
					}
					
					 else{
						if(formData.piadamt){
							const res = await axios.post(`${API_URL}/api/add-balance`, AddAccountAmount1)
						
						}
					}

					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
					
					toggleModal();
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



	const handleChangeFileUpload = (e) => {
		const { name, files } = e.target;
	
		// Check if a file is selected
		if (files.length > 0) {
			const file = files[0];
	
			// Update state with the file data
			setFormData(prevData => ({
				...prevData,
				[name]: {
					file: file,
				}
			}));
		}
	};

	const handleChangeservices = (selectedOptions) => {
		if (selectedOptions.length <= 2) {
		  setServiceProvider(selectedOptions); 
		}
	  };
	

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
							{serviceType?.value === 'Dog Walk' && (
			<Col md={6}>
			
                <FormGroup>
                    <Label>Shift Time <span style={{ color: "red" }}>*</span></Label>
                    <SelectBox 
                        setSelcted={setShift}
                        initialValue={shift}
                        options={[
                            { label: "Morning", value: "Morning" },
                            { label: "Evening", value: "Evening" },
                            { label: "Both (MOR&EVN)", value: "Both" },
                        ]}
                    />
                </FormGroup>
          
        </Col>
		  )}

		{(serviceType?.value === 'Bathroom Cleaning' || serviceType?.value === 'Monthly Cleaning') && (
    <>
        <Col md={6}>
            <FormGroup>
                <Label>
                    Before Cleaning (Upload photo)
                </Label>
                <Input 
					type='file'
					name='before_cleaning'
					onChange={handleChangeFileUpload}
					id="before_cleaning"
                />
            </FormGroup>
        </Col>

		<Col md={6}>
            <FormGroup>
                <Label>
                    After Cleaning (Upload photo)
                </Label>
                <Input 
					type='file'
					name='after_cleaning'
					onChange={handleChangeFileUpload}
					id="after_cleaning"
                />
            </FormGroup>
        </Col>
    </>
)}



							<Col md={6}>
								<FormGroup>
									<Label for="serviceServeType">Monthly Service Type <span style={{color: "red"}}>*</span></Label>
									<Input type="select" name="serviceServeType"
										onChange={(e) => handleChange(e, 50)}
										id="serviceServeType" value={formData.serviceServeType}>
										<option value="" defaultChecked disabled>Select Serve Type</option>
										<option value="Daily">Daily</option>
										<option value="Alternative">Alternative</option>
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
									<Label for="feesPaidDateTime">  Date  <span style={{color: "red"}}>*</span></Label>
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

				{serviceType?.value === "Car Washing" ? (
        <Col md={6}>
          <FormGroup>
            <Label>Service Provider <span style={{ color: "red" }}>*</span></Label>
            <Select
              isMulti
              value={serviceProvider?.value}
              onChange={handleChangeservices}
              options={getAllServiceProvider}
              className="basic-multi-select"
              classNamePrefix="select"
            />
			 {errors?.service_provider && (
              <span className='validationError'>
                {errors?.service_provider}
              </span>
            )}
          </FormGroup>
        </Col>
      ) : (
        <Col md={6}>
          <FormGroup>
            <Label>Service Provider <span style={{ color: "red" }}>*</span></Label>
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
      )}

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
									<Label for="bike_no">Bike No </Label>
									<Input  name="bike_no"
										onChange={(e) => handleChange(e, 50)}
										id="bike_no"
										placeholder="Enter Bike No."
										value={formData.bike_no}
										/>
										
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="kit_no"> KIT No </Label>
									<Input  name="kit_no"
										onChange={(e) => handleChange(e, 50)}
										id="kit_no"
										placeholder="Enter Kit No."
										value={formData.kit_no}
										/>
										
								</FormGroup>
							</Col>


							<Col md={6}>
								<FormGroup>
									<Label for="mohalla"> Mohalla  </Label>
									<Input  name="mohalla"
										onChange={(e) => handleChange(e, 100)}
										id="mohalla"
										placeholder="Enter Mohalla"
										value={formData.mohalla}
										/>
										
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="area"> Area  </Label>
									<Input  name="area"
										onChange={(e) => handleChange(e, 100)}
										id="area"
										placeholder="Enter Area"
										value={formData.area}
										/>
								</FormGroup>
							</Col>
							
							<Col md={6}>
								<FormGroup>
									<Label for="land_mark"> Land Mark  </Label>
									<Input  name="land_mark"
										onChange={(e) => handleChange(e, 100)}
										id="land_mark"
										placeholder="Enter land mark"
										value={formData.land_mark}
										/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="location"> Location  </Label>
									<Input  name="location"
										onChange={(e) => handleChange(e, 100)}
										id="location"
										placeholder="Enter location"
										value={formData.location}
										/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="near_by"> Near By  </Label>
									<Input  name="near_by"
										onChange={(e) => handleChange(e, 100)}
										id="near_by"
										placeholder="Enter Near by"
										value={formData.near_by}
										/>
								</FormGroup>
							</Col>


							<Col md={6}>
								<FormGroup>
									<Label for="reference"> Reference 1</Label>
									<Input  name="reference"
										onChange={(e) => handleChange(e, 100)}
										id="reference"
										placeholder="Enter reference"
										value={formData.reference}
										/>
										
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label for="reference2"> Reference 2  </Label>
									<Input  name="reference2"
										onChange={(e) => handleChange(e, 100)}
										id="reference2"
										placeholder="Enter reference2"
										value={formData.reference2}
										/>
										
								</FormGroup>
							</Col>

							<h2>Billing Details</h2>


							<Col md={6}>
							<FormGroup>
								<Label>Payment Method</Label>
								<SelectBox options={payMethodOptions} setSelcted={(value) => setFormData((prev) => ({ ...prev, paymethod: value?.value }))} initialValue={formData.paymethod} />
							</FormGroup>
							</Col>
							<Col md={6}>
							<FormGroup>
								<Label>Bill Amount</Label>
								<Input name="netpayamt" type="number" onChange={(e) => handleChange(e, 7)} value={formData.netpayamt} placeholder="Bill Amount" />
								
							</FormGroup>
							</Col>
							<Col md={6}>
							<FormGroup>
								<Label>Paid Amount</Label>
								<Input name="piadamt" type="number" onChange={(e) => handleChange(e, 7)} value={formData.piadamt} placeholder="Paid Amount" />
								
							</FormGroup>
							</Col>
							<Col md={6}>
							<FormGroup>
								<Label>Balance Amount</Label>
								<Input name="totalamt" type="number" value={formData.totalamt} placeholder="Balance Amount" readOnly />
							</FormGroup>
							</Col>

							<Col md={12}>
								<FormGroup>
									<Label for="specialInterest">Special Instructions</Label>
									<Input type="textarea" name="specialInterest"
										onChange={(e) => handleChange(e, 200)}
										id="specialInterest"
										placeholder="Enter special Instructions"
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
