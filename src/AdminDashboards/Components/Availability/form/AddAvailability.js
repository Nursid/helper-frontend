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
import { GetAllEmployeeAction } from '../../../../Store/Actions/Dashboard/EmployeeActions/GetAllEmployee';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { GetAvailability } from '../../../../Store/Actions/Dashboard/AvailabilityAction';
import { API_URL } from '../../../../config';

const AddAvailability = ({ prop}) => {

	const [selectedOptions, setSelectedOptions] = useState([]);
	const [inputValue, setInputValue] = useState([]);
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
	const { data } = useSelector(state => state.GetAllEmployeeDataReducer);
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllEmployeeAction())
    }, []);


	const DataWithID = (data) => {
        const NewData = []
        if (data !== undefined) {
            for (let item of data) {
                NewData.push({
					label: item.name,
					value: item.mobile_no
				})
            }
        } else {
            NewData.push({ id: 0 })
        }
        return NewData
    }

	const handleChangeservices = (selected) => {
		setSelectedOptions(selected);
		const employeeNames = selected.map(option => option.value);
        setInputValue({...inputValue, employees: employeeNames})
		
	};

	const handleChange = (e)=>{
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]:value})
    }

	const onsubmit = async (e) =>{
		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

		

		if (!inputValue.date) {
            errors.date = "Date is required";
        }

        if (!selectedOptions) {
            errors.employees = "Employee is required";
        }

		if (errors && Object.keys(errors).length === 0) {
			// Form is valid, handle form submission here
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }


		  const response = await fetch(API_URL + "/api/add-availability", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValue),
          });
          const IsAvailable = await response.json();
      
          if (IsAvailable.status === true) {
            Swal.fire({
                icon: "success",
                title: IsAvailable.message,
                showConfirmButton: false,
                timer: 1500
              });
            setErrors([]);
            setTimeout(() => SetIsLoading(false), 5000);
            prop();
            dispatch(GetAvailability({date: inputValue.date}))
		  }else{
			Swal.fire({
                icon: "error",
                title: IsAvailable.message,
                showConfirmButton: false,
                timer: 1500
              });
		  }

	}


	const today = new Date().toISOString().split('T')[0];

	return (
		<Fragment>
			<Form>
				<Row>
					<Col md={12}>
						<FormGroup>
							<Label>Date  <span style={{color: "red"}}>*</span></Label>
							<Input type='date' name='date' onChange={handleChange}
                          defaultValue={inputValue?.date}  min={today} />

					{errors?.date && (
                        <span className='validationError'>
                            {errors?.date}
                        </span>
                    )}
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
                        <Label> Employees  <span style={{color: "red"}}>*</span> </Label>
							<Select isMulti
								value={selectedOptions}
								onChange={handleChangeservices}
								options={DataWithID(data)}
								className="basic-multi-select"
								classNamePrefix="select"/>

					{errors?.employees && (
                        <span className='validationError'>
                            {errors?.employees}
                        </span>
                    )}
						</FormGroup>
					</Col>
					<Button className='bg-primary text-white' onClick={onsubmit} disabled={isLoading}>
						Submit
					</Button>
				</Row>
			</Form>
		</Fragment>
	)
}

export default AddAvailability;
