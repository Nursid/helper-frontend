import React, {Fragment, useEffect, useState} from 'react'
import {
	Button,
	Col,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';
import SelectBox from '../../../Elements/SelectBox';
import {Formik} from 'formik';
// import { Label, FormGroup, Input, Button } from "reactstrap";
import * as ALlIcon from "react-icons/fa"
// import SelectBox from '../../../Elements/SelectBox';
import {useDispatch, useSelector} from 'react-redux';
import SeviceAddReducer from '../../../../Store/Reducers/Dashboard/ServiceAddReducer';
// import { GetAllCustomers } from '../../Store/Actions/Dashboard/Customer/CustomerActions';
import { GetAllCustomers } from '../../../../Store/Actions/Dashboard/Customer/CustomerActions';
import moment from 'moment'
import axios from 'axios';
import {API_URL} from '../../../../config';
import Swal from 'sweetalert2';
import ImageUploadReducer from '../../../../Store/Reducers/ImageUploadReducers';
import {ImageUploadAction} from '../../../../Store/Actions/ImageUploadAction';
import {BounceLoader} from 'react-spinners';
import zIndex from '@mui/material/styles/zIndex';
import {useAuth} from '../../../../Context/userAuthContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const UpdateCustomerForm = ({prop,updateData}) => {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		name: updateData?.name || '',
		gender: updateData?.gender || '',
		age: updateData?.age || '',
		member_id: updateData?.member_id || '',
		address: updateData?.address || '',
		land_mark: updateData?.land_mark || '',
		email: updateData?.email || '',
		location: updateData?.location || '',
		mobile: updateData?.mobileno || '',
		tel_no: updateData?.tel_no || '',
		office_no: updateData?.office_no || '',
		alternate_no: updateData?.alternate_no || '',
		aadhar_no: updateData?.aadhar_no || '',
		occupation: updateData?.occupation || '',
		designation: updateData?.designation || '',
		image: updateData?.image || '',
		own_house: updateData?.own_house || '', 
		dob: updateData?.dob ? moment(updateData.dob).format("YYYY-MM-DD") : '',
		doa: updateData?.doa || '',
		membership: updateData?.membership || '',
		familyMember: updateData?.familyMember || '',  
		reference: updateData?.reference || '',
		payment: updateData?.payment || '',
		discount_amount: updateData?.discount_amount || '',
		recieved_amount: updateData?.recieved_amount || '',
		balance_amount: updateData?.balance_amount || '',
		payment_method: updateData?.payment_method || '',
		spouse_name1: updateData?.spouse_name1 || '',
		spouse_name2: updateData?.spouse_name2 || '',
		spouseDob1: updateData?.spouse_dob1 ? moment(updateData.spouse_dob1).format("YYYY-MM-DD") : '',
		spouse_dob2: updateData?.spouse_dob2 ? moment(updateData.spouse_dob2).format("YYYY-MM-DD") : '',
		service1: updateData?.service1 || '',
		service2: updateData?.service2 || '',
		service3: updateData?.service3 || '',
		service4: updateData?.service4 || '',
		service5: updateData?.service5 || '',
	});
	

	  const [isLoading, SetIsLoading]= useState(false)
	  const [errors, setErrors]= useState([]);
	  const [gender, setGender] = useState(updateData?.gender || '');
	  const [house, setHouse] = useState(updateData.own_house || '');
	  const [image, setImage] = useState(updateData.image || '');
	  const [membership, setMembership] = useState(updateData.membership || '');
	  const [paymentMethod, setPaymentMethod] = useState(updateData.payment_method || '');
	  const [isMember, setIsMember] = useState(updateData?.member_id?.startsWith("HM") ? updateData?.member_id : false);


	const payment_options = [
		{
			label: "Cash",
			value: "Cash"
		}, 
		{
			label: "Online",
			value: "Online"
		}, 
		{
			label: "Cheque",
			value: "Cheque"
		}
	];


	const gender_option = [
		{
			value: 'Male',
			label: 'Male'
		}, {
			value: 'Female',
			label: 'Female'
		},
		{
			value: 'other',
			label: 'Other'
		},
	];


	const membershipOptions = [
		{
			value: "already_joined",
			label: 'Existing Member'
		}, {
			value: "new_member",
			label: 'New Member'
		},
	];
	const house_options = [
		{
			value: "Own House",
			label: 'Own House'
		}, {
			value: "Rented House",
			label: 'Rented House'
		},
	];

	const UpdateCustomer = (e) => {


		e.preventDefault();
        SetIsLoading(true)
        let errors = {};

        if (!formData.name) {
			errors.name = "Name is required";
		}

	
		
		if (!formData.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			errors.mobile = "Mobile number should be 10 digits";
		}
	

		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }

		  const data = {
			...formData,
			image: image || '',
			own_house: house?.value || '',
			gender: gender?.value || '',
			membership: membership?.value || '',
			payment_method: paymentMethod?.value || '',
			member_id: (isMember===false) ? '': isMember
		  }  

		  const formData2 = new FormData();

		  for (const key in data) {
			formData2.append(key, data[key]);
		  }

		const apiUrl = `${API_URL}/customer/getupdate/${updateData.user_id}`;
		axios.put(apiUrl, formData2, { 'Content-Type': 'multipart/form-data'})
			.then(response => {
			
				if (response.data.status === true) {
					prop();
					Swal.fire(
						'Updated!',
						response.data.message,
						'success'
					)
					dispatch(GetAllCustomers())
				} else {
					Swal.fire({
						title: response.data.message,
						icon: "error",
					})
				}

			})
			.catch(error => {
				console.error('Error:', error);
			});
			
			SetIsLoading(false);
	};

	const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
            }
        };


		const handleChange = (e, maxLength) => {
			const { name, type, checked, value } = e.target;
	
		// Determine the new value based on input type
		const newValue = type === 'checkbox' ? checked : value;
		if (value.length <= maxLength) {
		// Update the state with the new value
		setFormData((prevState) => ({
		  ...prevState,
		  [name]: newValue
		})); 
	}
	
		};

		const handleImageChange = (event) => {
			const file = event.target.files[0];
			const allowedExtensions = ['.jpg', '.jpeg', '.png'];
			if (file) {
				const fileName = file.name;
				const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
				if (allowedExtensions.includes(fileExtension)) {
	
					setImage(file);
				} else {
					alert("Please select a valid image file (JPG, JPEG, PNG).");
					event.target.value = null;
				}
			}
		  };	

	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label for="name">Name <span style={{color: "red"}}>*</span></Label>
						<Input name='name'
							onChange={(e) => handleChange(e, 50)}
							onKeyPress={handleKeyPress}
							value={formData?.name}
							placeholder='Name'/>

							{errors?.name && (
                        <span className='validationError'>
                            {errors?.name}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="gender">Gender </Label>
						<SelectBox options={gender_option} setSelcted={setGender} initialValue={gender}/>
						
						
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="age">Age </Label>
						<Input name='age'
							type='number'
							onChange={(e) => handleChange(e, 2)}
							value={formData?.age}
							placeholder='Enter Customer Age'/>
							
					</FormGroup>
				</Col>


				{(updateData?.member_id?.startsWith("HM")) ?	<Col md={6}>
					<FormGroup>
						<Label for="memeber">Member Id</Label>
						<Input  placeholder='Member Id'
							
							value={formData?.member_id} readOnly/>
					</FormGroup>
				</Col> : <Col md={6} className='mt-4'>

				<FormGroup>
					<FormControlLabel control={<Checkbox 
					name="member_id"
					checked={isMember}
					onChange={() => setIsMember(!isMember)}
					/>} label="Is Member" labelPlacement='start'/>
					</FormGroup>
					</Col>
			}	

				<Col md={6}>
					<FormGroup>
						<Label for="address">Address </Label>
						<Input type='textarea'
							onChange={(e) => handleChange(e, 200)}
							value={formData?.address}
							name='address'
							placeholder='Address'/>

					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="landmark">Land Mark</Label>
						<Input type='type'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.land_mark}
							name='land_mark'
							placeholder='Landmark'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type='email'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.email}
							name='email'
							placeholder='Email'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="location">Location</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.location}
							name='location'
							placeholder='Location'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="mobile">Mobile No. <span style={{color: "red"}}>*</span></Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.mobile}
							name='mobile'
							placeholder='Mobile No.'/>
							{errors?.mobile && (
                        <span className='validationError'>
                            {errors?.mobile}
                        </span>
                    )}
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="telno">Tel No.</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.tel_no}
							name='tel_no'
							placeholder='Tel No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="officeno">Office No</Label>
						<Input type='number' name='office_no' placeholder='Office No'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.office_no}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="alternateno">Alternate No</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.alternate_no}
							name='alternate_no'
							placeholder='Alternate No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="aadharno">Aadhar No</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 12)}
							value={formData?.aadhar_no}
							name='aadhar_no'
							placeholder='Aadhar No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="occupation">Occupation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.occupation}
							name='occupation'
							placeholder='Occupation'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Designation</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.designation}
							name='designation'
							placeholder='Designation Name'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Own house / Rented</Label>
						<SelectBox options={house_options} setSelcted={setHouse} initialValue={house}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="dob">Date of Birth</Label>
						<Input 
						onChange={(e) => handleChange(e, 50)}
							value={formData?.dob}
							name='dob'
							type="date"/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="doa">DOA</Label>
						<Input type="date"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.doa}
							name='doa'
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="image">Image (Image jpg , jpeg , png , only)</Label>
						<Input type="file" name="image" id="image"
							onChange={handleImageChange}
						/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="membership">Type of Membership</Label>
						<SelectBox options={membershipOptions} setSelcted={setMembership} initialValue={membership}/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-1</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_name1}
							name='spouse_name1'
							placeholder='Spouse Name -1'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse DOB-1</Label>
						<Input type='date'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_dob1}
							name='spouse_dob1'
							placeholder='Spouse spouse_dob1 -1'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-2</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_name2}
							name='spouse_name2'
							placeholder='Spouse Name -1'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse DOB-2</Label>
						<Input type='date'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_dob2}
							name='spouse_dob2'
							placeholder='Spouse spouse_dob 2'/>
					</FormGroup>
				</Col>

				{/* <Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-3</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_name3}
							name='spouse_name3'
							placeholder='Spouse Name -3'/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse DOB-3</Label>
						<Input type='date'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.spouse_dob3}
							name='spouse_dob3'
							placeholder='Spouse spouse_dob3 '/>
					</FormGroup>
				</Col> */}

		
				<Col md={6}>
					<FormGroup>
						<Label for="fom">Family Member</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.familyMember}
							name='familyMember'
							placeholder='Family Member '/>
					</FormGroup>
				</Col>
				
				<Col md={6}>
					<FormGroup>
						<Label for="ref">Reference By</Label>
						<Input type='text'
							onChange={(e) => handleChange(e, 50)}
							value={formData?.reference}
							name='reference'
							placeholder='Referance By '/>
					</FormGroup>
				</Col>
				
				
				<h6 className='fs-5 fw-bold py-3 px-3'>For Payment Section</h6>
				<Col md={6}>
					<FormGroup>
						<Label for="payment">Payment</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.payment}
							name='payment'
							placeholder='1000'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="damount">Discount Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.discount_amount}
							name='discount_amount'
							placeholder='Please Enter Discount Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="ramount">Received Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.recieved_amount}
							name='recieved_amount'
							placeholder='Please Enter Received Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="bamount">Balance Amount</Label>
						<Input type='number'
							onChange={(e) => handleChange(e, 10)}
							value={formData?.balance_amount}
							name='balance_amount'
							placeholder='Balance Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="pamount">Payment Method</Label>
						<SelectBox options={payment_options}  setSelcted={setPaymentMethod} initialValue={paymentMethod}/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="service1">Free Service - 1</Label>
						<Input type="text" id="service1"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.service1}
							name='service1'
							placeholder='Free service 1'
							/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 2</Label>
						<Input type="text" id="freeService2"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.service2}
							name='service2'
							placeholder='Free service 2'
							
							/>
					</FormGroup>
				</Col> 
				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 3</Label>
						<Input type="text" id="freeService3"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.service3}
							name='service3'
							placeholder='Free service 3'
							
							/>
					</FormGroup>
				</Col> 
				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 4</Label>
						<Input type="text" id="freeService4"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.service4}
							name='service4'
							placeholder='Free service 4'
							/>
					</FormGroup>
				</Col> 
				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 5</Label>
						<Input type="text" id="freeService4"
							onChange={(e) => handleChange(e, 50)}
							value={formData?.service5}
							name='service5'
							placeholder='Free service 5'
							/>
					</FormGroup>
				</Col> 

				<Button className='bg-primary h-fit text-blue'
					onClick={UpdateCustomer}
					disabled={isLoading}
					>
					Update</Button>
			</Row>

		</Fragment>
	)
}

export default UpdateCustomerForm
