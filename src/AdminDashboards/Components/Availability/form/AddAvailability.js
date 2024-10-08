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
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { GetAvailability } from '../../../../Store/Actions/Dashboard/AvailabilityAction';
import { API_URL } from '../../../../config';
import SelectBox from '../../../Elements/SelectBox';
import { GetAllServiceProvider } from '../../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import axios from 'axios';

const AddAvailability = ({ prop}) => {

	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isServiceProvider, setIsServiceProvider] = useState();
	const [leaveDay, setLeaveDay] = useState('');
	const [half, sethalf] = useState('');
	const [inputValue, setInputValue] = useState();
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
	const { data } = useSelector(state => state.GetAllServiceProviderReducer);
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllServiceProvider())
    }, []);

	const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
				if(item.block_id !==1){
					NewData.push({
						label: item.name,
						value: item.id
					})
				}
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

	const handleChange = (e)=>{
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]:value})
    }

	const onsubmit = async (e) => {
		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

		if (!inputValue.date) {
            errors.date = "Date is required";
        }

        if (!isServiceProvider.value) {
            errors.isServiceProvider = "Service Provider is required";
        }
        if (!leaveDay?.value) {
            errors.leaveDay = "LeaveDay is required";
        }

		if (leaveDay && leaveDay?.value === '2' && !half?.value) {
			errors.half = 'Half Day is required';
		}

		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
		  } else {
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }

		  const formdata = {
			...inputValue,
			emp_id: isServiceProvider?.value,
			leaveDay: leaveDay?.value,
			half: half ? half?.value : null,
		  }

		  const response = await axios.post(`${API_URL}/api/add-leave`, formdata)

          if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500
              });
            setErrors([]);
            setTimeout(() => SetIsLoading(false), 5000);
            prop();
            dispatch(GetAvailability({date: inputValue.date}))
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

	const DayLeave = [
		{ label: 'Full day', value: '1' },
		{ label: 'Half Day', value: '2'}
	  ]

	const HalfLeave = [
		{ label: 'First Half', value: '1' },
		{ label: 'Second Half', value: '2'}
	]

	return (
		<Fragment>
			<Form>
				<Row>
					<Col md={12}>
						<FormGroup>
                    <Label>Service Provider<span style={{color: "red"}}>*</span></Label>
							<SelectBox
								options={DataWithID(data)}
								initialValue={isServiceProvider}
								setSelcted={setIsServiceProvider}
								/>
							{errors?.isServiceProvider && (
								<span className='validationError'>
									{errors?.isServiceProvider}
								</span>
							)}
						</FormGroup>
					</Col>
					
					<Col md={12}>
						<FormGroup>
							<Label>Date<span style={{color: "red"}}>*</span></Label>
							<Input type='date' name='date' onChange={handleChange}
                          defaultValue={inputValue?.date} />
							{errors?.date && (
								<span className='validationError'>
									{errors?.date}
								</span>
							)}
						</FormGroup>
					</Col>

					<Col md={12}>
						<FormGroup>
                    <Label>Leave Type<span style={{color: "red"}}>*</span></Label>
							<SelectBox
								options={DayLeave}
								initialValue={leaveDay}
								setSelcted={setLeaveDay}
								/>
							{errors?.leaveDay && (
								<span className='validationError'>
									{errors?.leaveDay}
								</span>
							)}
						</FormGroup>
					</Col>

					{leaveDay.value === '2' && ( // Conditionally render this section
						<Col md={12}>
							<FormGroup>
							<Label>
								Half Day Type<span style={{ color: 'red' }}>*</span>
							</Label>
							<SelectBox
								options={HalfLeave}
								initialValue={half}
								setSelcted={sethalf}
							/>
							{errors?.half && (
								<span className="validationError">{errors?.half}</span>
							)}
							</FormGroup>
						</Col>
						)}

					<Button className='bg-primary text-white' onClick={onsubmit} disabled={isLoading}>
						Submit
					</Button>
				</Row>
			</Form>
		</Fragment>
	)
}

export default AddAvailability;
