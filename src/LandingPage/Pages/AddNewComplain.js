import React, {Fragment, useEffect, useState} from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Alert,
	Row,
	Col,
	Input,
	CardBody,
	CardHeader,
	Card,
	Label,
	FormGroup
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import axios from "axios";
import SelectBox from "../../AdminDashboards/Elements/SelectBox";
import GetAllOrders from "../../Store/Actions/Dashboard/Orders/OrderAction";
export const AddNewComplain = ({complainModalOpen, complainModalOpenfunction, mobileNo, UserID}) => {

	const [getAllService, setAllservices] = useState([])
	const dispatch = useDispatch();

	const [customerName, setCustomerName] = useState('');
	const [type, setType] = useState('');
	const [time, setTime] = useState('');
	const [mobileNumber, setMobileNumber] = useState(mobileNo || '');
	const [memberShipId, setMemberShipId] = useState('');
	const [service, setService] = useState('')
	const [date, setDate] = useState('');
	const [address, setAddress] = useState('');
	const [sericeAddress, setServiceAddress] = useState('');
	const [landMark, setLandMark] = useState('');
	const [location, setLocation] = useState('');
	const [problemDescription, setProblemDescription] = useState('')
	const [status, setStatus] = useState('Pending');


	const [errformData, setErrformData] = useState({
		mobile: '',
		name: '',
		time: '',
		data: ''
		})


	useEffect(() => {
		getAllServices();
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service/getall')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.serviceName, value: item.serviceName}));
			setAllservices(transformedData);
		}
	}

	const getAllType = [
		{
			label: "Booking",
			value: "Booking"
		}, {
			label: "Urgent",
			value: "Urgent"
		}, {
			label: "Regular",
			value: "Regular"
		}
	]

	const onsubmitDate = () => {
		
		if (!mobileNumber) {
			setErrformData(prevState => ({ ...prevState, mobile: "Please Fill Mobile No." }));
		} else {
			setErrformData(prevState => ({ ...prevState, mobile: "" }));
		}
		
		if (!customerName) {
			setErrformData(prevState => ({ ...prevState, name: "Please Fill Name" }));
		} else {
			setErrformData(prevState => ({ ...prevState, name: "" }));
		}

		if (!time) {
			setErrformData(prevState => ({ ...prevState, time: "Please Fill Time" }));
		} else {
			setErrformData(prevState => ({ ...prevState, time: "" }));
		}

		if (!date) {
			setErrformData(prevState => ({ ...prevState, date: "Please Fill Time" }));
		} else {
			setErrformData(prevState => ({ ...prevState, date: "" }));
		}
		
		const formData = {
			service_name: service.value,
			user_type: type.value,
			booktime: time,
			bookdate: date,
			name: customerName,
			mobile: mobileNumber,
			address: address,
			service_address: sericeAddress,
			land_mark: landMark,
			city: location,
			problem_des: problemDescription,
			cust_id: UserID
		};

		//
		const apiUrl = `${API_URL}/order/add-complain`;
		// Make a POST request using Axios
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				setErrformData('');
				complainModalOpenfunction();
				Swal.fire('Successfully!', 'Your Order has been Added.', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders(UserID));
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={complainModalOpen}
			toggle={complainModalOpenfunction}>
			<ModalHeader toggle={complainModalOpenfunction}>
				Add New Complain
			</ModalHeader>
			<ModalBody>
				<Fragment>
					<Row>
						<Col md={4}>
							<FormGroup>
								<Label>Choose Service *</Label>
								<SelectBox options={getAllService}
									setSelcted={setService}
									selectOption={service}/>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Type *</Label>
								<SelectBox options={getAllType}
									setSelcted={setType}
									selectOption={type}/>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Time</Label>
								<Input onChange={
										(e) => setTime(e.target.value)
									}
									value={time}
									placeholder=''
									type='time'/>
									<span style={{color: 'red', marginLeft: '5px'}}>{errformData.time}</span>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Date</Label>
								<Input onChange={
										(e) => setDate(e.target.value)
									}
									value={date}
									placeholder=''
									type='date'/>
									<span style={{color: 'red', marginLeft: '5px'}}>{errformData.date}</span>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Customer Name *</Label>
								<Input onChange={
										(e) => setCustomerName(e.target.value)
									}
									value={customerName}
									placeholder='Name'/>
									<span style={{color: 'red', marginLeft: '5px'}}>{errformData.name}</span>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Mobile Number *</Label>
								<Input onChange={
										(e) => setMobileNumber(e.target.value)
									}
									value={mobileNumber}
									placeholder='Mobile No'/>
									<span style={{color: 'red', marginLeft: '5px'}}>{errformData.mobile}</span>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Address</Label>
								<Input onChange={
										(e) => setAddress(e.target.value)
									}
									value={address}
									placeholder='Enter Your Address'/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Service Address
								</Label>
								<Input onChange={
										(e) => setServiceAddress(e.target.value)
									}
									value={sericeAddress}
									placeholder='Service Address'/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label>Land Mark
								</Label>
								<Input onChange={
										(e) => setLandMark(e.target.value)
									}
									value={landMark}
									placeholder='Land Mark'/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label>Location
								</Label>
								<Input onChange={
										(e) => setLocation(e.target.value)
									}
									value={location}
									placeholder='Location'/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Problem Description
								</Label>
								<Input onChange={
										(e) => setProblemDescription(e.target.value)
									}
									type="textarea"
									value={problemDescription}
									placeholder='Problem Description'/>
							</FormGroup>
						</Col>


						{/* <Col md={6}>
						<FormGroup>
							<Label>MemberShip Id</Label>
							<Input onChange={
								(e) => setMemberShipId(e.target.value)
							}
							value={memberShipId} placeholder='Enter Your MemberShip'/>
						</FormGroup>
					</Col> */}


						<Button className='bg-success'
							onClick={onsubmitDate}>Proceed Now
						</Button>
					</Row>
				</Fragment>


			</ModalBody>
		</Modal>
	);
};