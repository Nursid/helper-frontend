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
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { GetAvailability } from '../../../../Store/Actions/Dashboard/AvailabilityAction';
import { API_URL } from '../../../../config';
import SelectBox from '../../../Elements/SelectBox';
import { GetAllServiceProvider } from '../../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import { GetAllTimeSlot } from '../../../../Store/Actions/Dashboard/Orders/OrderAction';
import axios from 'axios';
import moment from 'moment';
import { GetSupervisorAvailability } from "../../../../Store/Actions/Dashboard/SupervisorAvailabilityAction";


const TransferSupervisorAvailability = ({ transferData, prop }) => {

	const [getAlltimeSlot, setGetAlltimeSlot] = useState([])
    const [getAllServiceProvider, setGetAllServiceProvider] = useState([])
    const [timeslot, setTimeslot] = useState(null)
    const [toTimeslot, setToTimeslot] = useState(null)
    const [serviceProvider, setServiceProvider] = useState(null)
    const [errors, setErrors]= useState([]);
    const [isLoadingSubmit, SetIsLoading]= useState(false)
	const dispatch = useDispatch();
   

    const [formData, setFormData] = useState(
        {
            fromEmpId: transferData?.emp_id,
            fromDate: moment(transferData?.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            toEmpId: "",
            toDate: "",
            timeRange: "",
            totimeRange: "",
            service_name: ""
        }
    )


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


    useEffect(()=>{
			getAllServicesProvider()
	  }, [])


      const getAllServicesProvider = async () => {
		try {

		  const response = await axios.get(`${API_URL}/employee/getall`);
		  if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({ label: item.name, value: item.emp_id }));
			setGetAllServiceProvider(transformedData);
		  }
		} catch (error) {
		  console.error("Error fetching service providers:", error);
		}
	  }


	const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

	const onsubmit = async (e) => {
		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

		if(!serviceProvider.value){
			errors.serviceProvider = "Supervisor is required";
		}
		if(!timeslot.value){
			errors.timeslot = "time range is required";
		}
		if(!formData?.toDate){
			errors.toDate = "To date is required";
		}

		if(!toTimeslot.value){
			errors.toTimeslot = "time range is required";
		}

		if(!transferData[timeslot?.value]){
			errors.timeslot = "time range is not available";
		}


		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
		  } else {
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }

		  const transferDataSubmit = {
			...formData,
			toEmpId: serviceProvider.value,
            timeRange: timeslot?.value,
            totimeRange: toTimeslot?.value,
            service_name: transferData[timeslot?.value]
		  }

		  const response = await axios.post(`${API_URL}/api/supervisor-transfer-availability`, transferDataSubmit)

          if (response.data.status === true) {
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500
              });
            setErrors([]);
            setTimeout(() => SetIsLoading(false), 5000);
            prop();
            dispatch(GetSupervisorAvailability({date: formData?.toDate}))
		  } 
		else {
			Swal.fire({
                icon: "error",
                title:  response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
		  }
		  SetIsLoading(false)
	}


	return (
		<Fragment>
			<Form>
				<Row>


                <Col md={6}>
					<FormGroup>
						<Label>From Time Slot <span style={{color: "red"}}>*</span></Label>
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
							<Label>To Date<span style={{color: "red"}}>*</span></Label>
							<Input type='date' name='toDate' onChange={handleChange}
                          defaultValue={formData?.toDate} />
							{errors?.date && (
								<span className='validationError'>
									{errors?.toDate}
								</span>
							)}
						</FormGroup>
					</Col>

					<Col md={12}>
					<FormGroup>
						<Label>To Time Slot <span style={{color: "red"}}>*</span></Label>
						<SelectBox 
							setSelcted={setToTimeslot}
							initialValue={toTimeslot}
							options={getAlltimeSlot}
							/>
							{errors?.toTimeslot && (
							<span className='validationError'>
								{errors?.toTimeslot}
							</span>
						)}
					</FormGroup>
				</Col>

					<Col md={12}>
					<FormGroup>
						<Label>Supervisor <span style={{color: "red"}}>*</span></Label>
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


                  
					<Button className='bg-primary text-white' disabled={isLoadingSubmit} onClick={onsubmit}>
						Submit
					</Button>
				</Row>
			</Form>
		</Fragment>
	)
}

export default TransferSupervisorAvailability;
