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


import axios from 'axios';
import {API_URL} from '../../../../config';

import Swal from 'sweetalert2';

import ImageUploadReducer from '../../../../Store/Reducers/ImageUploadReducers';
import {ImageUploadAction} from '../../../../Store/Actions/ImageUploadAction';
import {BounceLoader} from 'react-spinners';
import zIndex from '@mui/material/styles/zIndex';
import {useAuth} from '../../../../Context/userAuthContext';


const AddNewCustomerForm = ({prop}) => {


	const dispatch = useDispatch()
  
	const [name, setName] = useState('')
	const [gender, setGender] = useState('')
	const [age, setAge] = useState('')
	const [memberId, setMemberId] = useState('');
	const [address, setAddress] = useState('')
	const [landmark, setLandmark] = useState('')
	const [email, setEmail] = useState('')
	const [location, setLocation] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [telNo, setTelNo] = useState('')
	const [officeNo, setOfficeNo] = useState('');
	const [alternateNo, setAlternateNo] = useState('')
	const [aadhaarNumber, setAadharNumber] = useState('')
	const [occupation, setOccupation] = useState('')
	const [designation, setDesignation] = useState('')
	const [house, setHouse] = useState('')
	const [image, setImage] = useState(null)
	const [spouseName, setSpouseNames] = useState('')
	const [spouseName1, setSpouseName1] = useState('')
	const [spouseName2, setSpouseName2] = useState('')
	const [dob, setDob] = useState('')
	const [doa, setDoa] = useState('')
	const [membership, setMembership] = useState('')
	const [familyMember, setFamilyMember] = useState('')
	const [refrence, setRefrence] = useState('')
	const [payment, setPayment] = useState(1000)
	const [discountAmount, setDiscountAmount] = useState('')
	const [receivedAmount, setReceivedAmount] = useState('')
	const [balanceAmount, setBalanceAmount] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('')
	const [freeServices1, setFreeServices1] = useState('')
	const [freeServices2, setFreeServices2] = useState('')


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

	const payment_options = [
		{
			value: 'online_mode',
			label: 'Online Mode'
		}, {
			value: 'offline_mode',
			label: 'Offline Mode'
		},
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
			value: "own_house",
			label: 'Own House'
		}, {
			value: "rented_house",
			label: 'Rented House'
		},
	];


	// const handleFileChange = (e,fileName) => {
    //     const selectedFile = e.target.files[0];
	// 	setImage(selectedFile)
    //   }

	const createCustomer = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('gender', gender.value);
		formData.append('age', age);
		formData.append('member_id', memberId);
		formData.append('address', address);
		formData.append('land_mark', landmark);
		formData.append('email', email);
		formData.append('location', location);
		formData.append('mobile', mobileNo);
		formData.append('tel_no', telNo);
		formData.append('office_no', officeNo);
		formData.append('alternate_no', alternateNo);
		formData.append('aadhar_no', aadhaarNumber);
		formData.append('occupation', occupation);
		formData.append('designation', designation);
		formData.append('image',image);
		formData.append('own_house', house.value); // Assuming imageFile is a file object
		formData.append('spouse_name', spouseName); 
		formData.append('spouse_name1', spouseName1); 
		formData.append('spouse_name2', spouseName2); 
		formData.append('dob', dob);
		formData.append('doa', doa);
		formData.append('membership', membership.value);
		formData.append('familyMember', familyMember);
		formData.append('refrence', refrence);
		formData.append('payment', payment);
		formData.append('discount_amount', discountAmount);
		formData.append('received_amount', receivedAmount);
		formData.append('balance_amount', balanceAmount);
		formData.append('payment_method', paymentMethod.value);
		formData.append('service', freeServices1);
		formData.append('service1', freeServices2);
		
	

		

		const apiUrl = `${API_URL}/customer/signup`;

		// Make a POST request using Axios
		axios.post(apiUrl, formData)
			.then(response => {

				if (response.status === 200) {
					prop();
					Swal.fire(
						'Successfully!',
						'Your Customer has been Added.',
						'success'
					)
					dispatch(GetAllCustomers())
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
	};

	const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z]+$/.test(charStr)) {
            e.preventDefault();
            }
        };


	return (
		<Fragment>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input name='name'
							onChange={
								(e) => setName(e.target.value)
							}
							value={name}
							placeholder='Name'
							onKeyPress={handleKeyPress}
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="gender">Gender</Label>
						<SelectBox options={gender_option} setSelcted={setGender} selectOption={gender}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="age">Age</Label>
						<Input
						type='number'
						name='age'
							onChange={
								(e) => setAge(e.target.value)
							}
							value={age}
							placeholder='Enter Customer Age'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="memeber">Member Id</Label>
						<Input name='memberid' placeholder='Member Id'
							onChange={
								(e) => setMemberId(e.target.value)
							}
							value={memberId}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input type='textarea'
							onChange={
								(e) => setAddress(e.target.value)
							}
							value={address}
							name='address'
							placeholder='Address'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="landmark">Land Mark</Label>
						<Input type='type'
							onChange={
								(e) => setLandmark(e.target.value)
							}
							value={landmark}
							name='landmark'
							placeholder='Landmark'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type='email'
							onChange={
								(e) => setEmail(e.target.value)
							}
							value={email}
							name='email'
							placeholder='Email'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="location">Location</Label>
						<Input type='text'
							onChange={
								(e) => setLocation(e.target.value)
							}
							value={location}
							name='location'
							placeholder='Location'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="mobno">Mobile No.</Label>
						<Input type='number'
							onChange={
								(e) => setMobileNo(e.target.value.slice(0, 10))
							}
							value={mobileNo}
							name='mobno'
							placeholder='Mobile No.'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="telno">Tel No.</Label>
						<Input type='tel'
							onChange={
								(e) => setTelNo(e.target.value.slice(0, 10))
							}
							value={telNo}
							name='telno'
							placeholder='Tel No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="officeno">Office No</Label>
						<Input type='number' name='officeno' placeholder='Office No'
							onChange={
								(e) => setOfficeNo(e.target.value.slice(0, 10))
							}
							value={officeNo}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="alternateno">Alternate No</Label>
						<Input type='tel'
							onChange={
								(e) => setAlternateNo(e.target.value.slice(0, 10))
							}
							value={alternateNo}
							name='alternateno'
							placeholder='Alternate No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="aadharno">Aadhar No</Label>
						<Input type='number'
							onChange={
								(e) => setAadharNumber(e.target.value.slice(0,12))
							}
							value={aadhaarNumber}
							name='aadharno'
							placeholder='Aadhar No'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="occupation">Occupation</Label>
						<Input type='text'
							onChange={
								(e) => setOccupation(e.target.value)
							}
							value={occupation}
							name='occupation'
							placeholder='Occupation'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Designation</Label>
						<Input type='text'
							onChange={
								(e) => setDesignation(e.target.value)
							}
							value={designation}
							name='designation'
							placeholder='Designation Name'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="designation">Own house / Rented</Label>
						<SelectBox options={house_options} setSelcted={setHouse}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="dob">Date of Birth</Label>
						<Input onChange={
								(e) => setDob(e.target.value)
							}
							value={dob}
							type="date"/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="doa">DOA</Label>
						<Input type="date"
							onChange={
								(e) => setDoa(e.target.value)
							}
							value={doa}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="image">Image (Image jpg , jpeg , png , only)</Label>
						<Input type="file" name="image" id="image"
							onChange={
								(e)=>(handleImageChange(e))
							}
						/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-1</Label>
						<Input type='text'
							onChange={
								(e) => setSpouseNames(e.target.value)
							}
							value={spouseName}
							name='sdob'
							placeholder='Spouse Name -1'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="fom">Family Member</Label>
						<Input type='text'
							onChange={
								(e) => setFamilyMember(e.target.value)
							}
							value={familyMember}
							name='family_member'
							placeholder='Family Member '/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-2</Label>
						<Input type='text' name='sdob'
						
						onChange={
							(e) => setSpouseName1(e.target.value)
						}
						value={spouseName1}
						placeholder='Spouse Name -2'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="ref">Reference By</Label>
						<Input type='text'
							onChange={
								(e) => setRefrence(e.target.value)
							}
							value={refrence}
							name='referanceby'
							placeholder='Referance By '/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-3</Label>
						<Input type='text' name='sdob'
						
						onChange={
							(e) => setSpouseName2(e.target.value)
						}
						value={spouseName2}
						placeholder='Spouse Name - 3'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="membership">Type of Membership</Label>
						{/* <Input type='date' name='tom' placeholder='Type of Membership ' /> */}
						<SelectBox options={membershipOptions} setSelcted={setMembership}/>
					</FormGroup>
				</Col>
				<h6 className='fs-5 fw-bold py-3 px-3'>For Payment Section</h6>
				<Col md={6}>
					<FormGroup>
						<Label for="payment">Payment</Label>
						<Input type='number'
							onChange={
								(e) => setPayment(e.target.value)
							}
							value={payment}
							name='payment'
							placeholder='1000'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="damount">Discount Amount</Label>
						<Input type='number'
							onChange={
								(e) => setDiscountAmount(e.target.value)
							}
							value={discountAmount}
							name='damount'
							placeholder='Please Enter Discount Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="ramount">Received Amount</Label>
						<Input type='number'
							onChange={
								(e) => setReceivedAmount(e.target.value)
							}
							value={receivedAmount}
							name='ramount'
							placeholder='Please Enter Received Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="bamount">Blanace Amount</Label>
						<Input type='number'
							onChange={
								(e) => setBalanceAmount(e.target.value)
							}
							value={balanceAmount}
							name='bamount'
							placeholder='Please Enter Balance Amount'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="pamount">Payment Method</Label>
						<SelectBox options={payment_options}  setSelcted={setPaymentMethod}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="freeService1">Free Service - 1</Label>
						<Input type="text" id="freeService1"
							
							onChange={
								(e) => setFreeServices1(e.target.value)
							}
							value={freeServices1}
							/>
					</FormGroup>
				</Col>

				<Col md={6}>
					<FormGroup>
						<Label for="freeService2">Free Service - 2</Label>
						<Input type="text" id="freeService2"
							onChange={
								(e) => setFreeServices2(e.target.value)
							}
							value={freeServices2}
							
							/>
					</FormGroup>
				</Col>
				<Button className='bg-primary h-fit text-blue'
					onClick={createCustomer}>
					Submit</Button>
			</Row>

		</Fragment>
	)
}

export default AddNewCustomerForm
