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


const UpdateCustomerForm = ({prop,updateData}) => {
	const dispatch = useDispatch()
  
	const [name, setName] = useState(updateData.name || '');
    const [gender, setGender] = useState(updateData.gender || '');
    const [age, setAge] = useState(updateData.age || '');
    const [memberId, setMemberId] = useState(updateData.member_id || '');
    const [address, setAddress] = useState(updateData.address || '');
    const [landmark, setLandmark] = useState(updateData.land_mark || '');
    const [email, setEmail] = useState(updateData.email || ''); 
    const [location, setLocation] = useState(updateData.location || '');
    const [mobileNo, setMobileNo] = useState(updateData.mobile || '');
    const [telNo, setTelNo] = useState(updateData.tel_no || '');
    const [officeNo, setOfficeNo] = useState(updateData.office_no || '');
    const [alternateNo, setAlternateNo] = useState(updateData.alternate_no || '');
    const [aadhaarNumber, setAadharNumber] = useState(updateData.aadhar_no || '');
    const [occupation, setOccupation] = useState(updateData.occupation || '');
    const [designation, setDesignation] = useState(updateData.designation || '');
    const [house, setHouse] = useState(updateData.own_house || '');
    const [imageFile, setImageFile] = useState(updateData.image || null);
    const [spouseName, setSpouseName] = useState(updateData.spouseName || '');
    const [spouseName1, setSpouseName1] = useState(updateData.spouseName1 || '');
    const [spouseName2, setSpouseName2] = useState(updateData.spouseName2 || '');
    const [dob, setDob] = useState(updateData.dob || '');
    const [doa, setDoa] = useState(updateData.doa || '');
    const [membership, setMembership] = useState(updateData.membership || '');
    const [familyMember, setFamilyMember] = useState(updateData.familyMember || '');
    const [refrence, setRefrence]  = useState(updateData.reference || '');
    const [payment, setPayment] = useState(updateData.payment || '');
    const [discountAmount, setDiscountAmount] = useState(updateData.discount_amount || '');
    const [receivedAmount, setReceivedAmount] = useState(updateData.recieved_amount || '');
    const [balanceAmount, setBalanceAmount] = useState(updateData.balance_amount || '');
    const [paymentMethod, setPaymentMethod] = useState(updateData.payment_method || '');
    const [freeServices1, setFreeServices1] = useState(updateData.service || '');
    const [freeServices2, setFreeServices2] = useState(updateData.service1 || '');


	console.log("membership----",membership)


	
	// "referanceby": "madhu sir ",
	// "family_member":" sujeet yadav",
	// "payment": "Debit Card",
	// "discountAmount": 20,
	// "receivedAmount": 700,
	// "balanceAmount": 480,
	// "paymentMethod": "Online Transfer",
	// "freeServices": [
	//     "Service 1",
	//     "Service 3"
	// ]

	const payment_options = [
		{
			value: 'online_mode',
			label: 'Online Mode'
		}, {
			value: 'offline_mode',
			label: 'Offline Mode'
		},
		{
			value: 'Cash',
			label: 'Cash'
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
			value: "yes",
			label: 'Own House'
		}, {
			value: "no",
			label: 'Rented House'
		},
	];

	const UpdateCustomer = () => {
      
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
		// formData.append('image', imageFile); // Assuming imageFile is a file object
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
		let formDataObject = {};

		formData.forEach((value, key) => {
			formDataObject[key] = value;
		});


		const apiUrl = `${API_URL}/customer/getupdate/${updateData.user_id}`;

		// Make a POST request using Axios

		axios.put(apiUrl, formDataObject)
			.then(response => {

				if (response.status === 200) {
					prop();
					Swal.fire(
						'Updated!',
						'Your Customer has been Updated.',
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
		// Now formDataObject contains the data in JSON format
		// Console log the FormData to see the appended values
		// console.log([...formData.entries()]);
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
							onKeyPress={handleKeyPress}
							value={name}
							placeholder='Name'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="gender">Gender</Label>
						<SelectBox options={gender_option} setSelcted={setGender} initialValue={gender}/>
						
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="age">Age</Label>
						<Input name='age'
							type='number'
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
								(e) => setMobileNo(e.target.value)
							}
							value={mobileNo}
							name='mobno'
							placeholder='Mobile No.'/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="telno">Tel No.</Label>
						<Input type='number'
							onChange={
								(e) => setTelNo(e.target.value)
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
								(e) => setOfficeNo(e.target.value)
							}
							value={officeNo}/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="alternateno">Alternate No</Label>
						<Input type='number'
							onChange={
								(e) => setAlternateNo(e.target.value)
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
								(e) => setAadharNumber(e.target.value)
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
						<SelectBox options={house_options} setSelcted={setHouse} initialValue={house}/>
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
							// onChange={handleImageChange}
						/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="sdob">Spouse Name-1</Label>
						<Input type='text'
							onChange={
								(e) => setSpouseName(e.target.value)
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
						<SelectBox options={membershipOptions} setSelcted={setMembership} initialValue={membership}/>
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
						<SelectBox options={payment_options}  setSelcted={setPaymentMethod} initialValue={paymentMethod}/>
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
					onClick={UpdateCustomer}>
					Update</Button>
			</Row>

		</Fragment>
	)
}

export default UpdateCustomerForm
