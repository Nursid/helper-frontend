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
import {UseStateManager} from "../Context/StateManageContext";
import Logo from "../assets/svg/we_logo.png";
import {Formik} from "formik";
import {GetCustomerLogIn, GetLogIn} from "../Store/Actions/LandingPage/AuthAction";
import GetLogInReducers from "../Store/Reducers/LandingPage/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {MenuItem, Select} from "@mui/material";
import {GetAllServices} from "../Store/Actions/Dashboard/servicesAction";
import {ClockLoader} from "react-spinners";
import {useAuth} from "../Context/userAuthContext";
import {API_URL} from "../config";
import axios from "axios";
import { GetAvailability } from "../Store/Actions/Dashboard/AvailabilityAction";
import SelectBox from "../AdminDashboards/Elements/SelectBox";
import moment from "moment";

export const LoginModal = () => {
	const [mobileNo, setMobileNo] = useState("");
	const [otp, setOpt] = useState("");
	// const [otpId, setOptId] = useState("");
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();

	const users = {
		Admin: "Admin",
		vendor: "vendor",
		Office: "Office",
		Customer: "Customer"
	};
	const {LoginOpen, setLoginOpen} = UseStateManager();

	const [loginPerson, setLoginPerson] = useState(users.Customer);

	const LoginResult = useSelector((pre) => pre.GetLogInReducers);
	const [isTimerComplete, setIsTimerComplete] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(60);
	const {sendOtp, otpid, setOtpId} = useAuth();

	const loginForm = {
		email: "",
		password: ""
	};

	const handleOtpSend = async (otp) => {
		setLoader(true);
		await sendOtp(otp);
		setTimeRemaining(60);
		setLoader(false);
	};

	const handleSubmit = async (number, otp, otpid) => {
		setLoader(true);
		await dispatch(GetCustomerLogIn(number, otp, otpid)).then(() => {
			setLoader(false);
		});
	};

	useEffect(() => {
		let timer;

		// Start the timer when the component mounts
		timer = setInterval(() => {
			setTimeRemaining((prevTime) => {
				if (prevTime === 1) {
					setIsTimerComplete(true);
					clearInterval(timer);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
		// Update the time remaining every 1 second (1000 milliseconds)

		// Clean up the timer when the component unmounts
		return() => {
			clearInterval(timer);
		};
	}, []);

	const HandleResendBtn = async (number) => {
		await handleOtpSend(number);
		setTimeRemaining(60);
	};

	return (
		<Modal className="modal-dialog-centered "
			isOpen={LoginOpen}
			toggle={
				() => setLoginOpen(!LoginOpen)
		}>
			<ModalHeader className="modal_header"
				toggle={
					() => setLoginOpen(!LoginOpen)
			}>
				{" "}
				Login
			</ModalHeader>
			<ModalBody className="LoginBgMain relative">
				{
				otpid && <h6 className="absolute top-2 right-2">
					{timeRemaining}</h6>
			}
				<div className="w-100 d-flex loginmain">
					<div className="text-center rounded">
						<img src={Logo}
							alt="MainLogo"/>
						<div className="text-center">
							<h4 className="text-blue fw-bold">Welcome To Helper</h4>
							<p className="py-2 text-secondary">
								Please Enter your details to Login
							</p>
						</div>

						<form>
							<FormGroup className="d-flex flex-column  align-items-start ">
								<Label for="mobileNo">Enter Mobile Number :</Label>
								<Input type="tel" name="mobileNo" id="mobileNo"
									value={mobileNo}
									disabled={
										otpid !== null
									}
									placeholder="992XXXXXXX"
									onChange={
										(e) => setMobileNo(e.target.value)
									}/>
							</FormGroup>
							{
							otpid ? (
								<FormGroup className="d-flex align-items-center gap-2 ">
									<Label for="mobileNo text-nowrap w-25">Enter Otp :</Label>
									<Input type="text" name="mobileNo" id="mobileNo"
										maxLength={4}
										value={otp}
										placeholder="XXXX"
										className="w-25"
										onChange={
											(e) => setOpt(e.target.value)
										}/>
								</FormGroup>
							) : null
						}
							<Button type="button" className="ml-3 bg-blue w-25">
								Cancel
							</Button>
							{
							otpid ? (
								<>
									<Button type="button" className="ml-3 bg-blue w-25"
										onClick={
											() => handleSubmit(mobileNo, otp, otpid)
									}>
										Login
										<ClockLoader size={16}
											className="ml-2 "
											color="#fff"
											loading={loader}/>
									</Button>
									<Button type="button"
										disabled={
											timeRemaining >= 5
										}
										className="ml-3 bg-blue w-25"
										onClick={
											() => HandleResendBtn(mobileNo)
									}>
										Resend
										<ClockLoader size={16}
											className="ml-2 "
											color="#fff"
											loading={loader}/>
									</Button>
								</>
							) : (
								<Button type="button" className="ml-3 bg-blue w-25"
									onClick={
										() => handleOtpSend(mobileNo)
								}>
									Verify
									<ClockLoader size={16}
										className="ml-2 "
										color="#fff"
										loading={loader}/>
								</Button>
							)
						} </form>

						{/* <Formik
              initialValues={loginForm}
              onSubmit={(values, { resetForm }) => {
                dispatch(GetLogIn(values, loginPerson));
                resetForm();
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form className="p-2" onSubmit={handleSubmit} method="post">
                  <div className="form-group">
                    <label for="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter your password."
                      required
                    />
                  </div>
                  <div className="form-group text-right">
                    <Button type="submit">Log In </Button>
                  </div>
                </form>
              )}
            </Formik> */} </div>
				</div>
			</ModalBody>
		</Modal>
	);
};
export const SingupModal = () => {
	const {SingUp, setSingUp} = UseStateManager();
	return (
		<Modal className="modal-dialog-centered"
			isOpen={SingUp}
			toggle={
				() => setSingUp(!SingUp)
		}>
			<ModalHeader toggle={
				() => setSingUp(!SingUp)
			}>
				Sign Up</ModalHeader>
			<ModalBody>
				<div className="text-center bgColour rounded">
					<img src={Logo}
						alt="MainLogo"/>
					<div className="text-center">
						<h4>Welcome To Helper</h4>
						<p className="py-2">Please Enter your details to Sign Up</p>
						<Button style={
								{background: "#142572"}
							}
							active={true}
							outline>
							Customer
						</Button>
						<Button outline className="ml-2">
							Vendor
						</Button>
					</div>
					<form className="p-2" action="#" method="post">
						<div className="form-group">
							<label for="name">Full Name:</label>
							<input type="text" id="name" name="name" placeholder="Enter Your Full Name" required/>
						</div>
						<div className="form-group">
							<label for="email">Email:</label>
							<input type="email" id="email" name="email" placeholder="Enter Your Email" required/>
						</div>
						<div className="form-group">
							<label for="email">Password :</label>
							<input type="email" id="email" name="email" placeholder="Enter your password." required/>
						</div>
						<div className="form-group">
							<label for="email">Confirm Password :</label>
							<input type="email" id="email" name="email" placeholder="Confirm your password." required/>
						</div>
						<div className="form-group text-right">
							<input onClick={
									() => setSingUp(!SingUp)
								}
								type="submit"
								value="Register"/>
						</div>
					</form>
				</div>
			</ModalBody>
		</Modal>
	);
};

export const ServeiceRequestModal = ({serveRequestModalOpen, serveRequestModalOpenfunction}) => {
	const [formData, setFormData] = useState({
		service_name: "",
		user_type: "",
		booktime: "",
		bookdate: "",
		name: "",
		mobile: "",
		address: "",
		land_mark: "",
		location: "",
		problem_des: ""
	});

	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (event, maxLength) => {
		const {name, value} = event.target;
		if (value.length <= maxLength) {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	}
	};

	const dispatch = useDispatch();

	const {data} = useSelector((state) => state.GetAllServicesReducer);

	useEffect(() => {
		dispatch(GetAllServices());
	}, []);

	const handleSubmit = (e) => {

		e.preventDefault();
		setIsLoading(true)
        let errors = {};

		if (!formData.name) {
            errors.name = "Name is required";
        }
		if (!formData.mobile) {
			errors.mobile = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			errors.mobile = "Mobile number should be 10 digits";
		}
		if (!formData.address) {
            errors.address = "address  is required";
        }
		if (!formData.service_name) {
            errors.service_name = "service name  is required";
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

		const apiUrl = `${API_URL}/order/add-complain`;
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				serveRequestModalOpenfunction();
				Swal.fire('Successfully!', 'Your Order has been Added.', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
		}).catch(error => {
			console.error('Error:', error);
		});

	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={serveRequestModalOpen}
			toggle={serveRequestModalOpenfunction}>
			<ModalHeader toggle={serveRequestModalOpenfunction}>
				Service Request Form
			</ModalHeader>
			<ModalBody>
				<div>
					<Row>
						<Col xs={12}
							lg={7}>
							<form onSubmit={handleSubmit}>
								<Row>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="stateSelect">
												Service Name <span style={{color: "red"}}>*</span>
											</label>
											<Select style={
													{maxHeight: "159px"}
												}
												id="stateSelect"
												name="service_name"
												className="form-control"
												value={
													formData.service_name
												}
												onChange={(e) => handleInputChange(e, 50)}>
												{
												data.data && data.data.map((item, index) => (
													<MenuItem key={index}
														value={
															item.serviceName
													}>
														{
														item.serviceName
													} </MenuItem>
												))
											} </Select>
											
										</div>
										{errors?.service_name && (
							<span className='validationError'>
								{errors?.service_name}
							</span>
						)}
									</Col>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="stateSelect">
												User Type 
											</label>
											<Select id="stateSelect" name="user_type" className="form-control"
												value={
													formData.user_type
												}
												onChange={(e) => handleInputChange(e, 10)}>
												<MenuItem value="booking">Booking</MenuItem>
												<MenuItem value="urgent">Urgent</MenuItem>
												<MenuItem value="regular">Regular</MenuItem>
											</Select>
										</div>
									</Col>
								</Row>
								<Row>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceName">
												Service Time 
											</label>
											<Input type="time" name="booktime" className="form-control"
												value={
													formData.booktime
												}
												onChange={(e) => handleInputChange(e, 50)}/>
										</div>
									</Col>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceType">
												Service Date 
											</label>
											<Input type="date" name="bookdate" className="form-control"
												value={
													formData.bookdate
												}
												
												onChange={(e) => handleInputChange(e, 50)}/>
										</div>
									</Col>
								</Row>
								<Row>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceName">
												Name <span style={{color: "red"}}>*</span>
											</label>
											<Input type="text" name="name" className="form-control"
												value={
													formData.name
												}
												placeholder="Enter Your Name"
												onChange={(e) => handleInputChange(e, 50)}/>
												
										</div>
										{errors?.name && (
							<span className='validationError'>
								{errors?.name}
							</span>
						)}
									</Col>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceType">
												Mobile No. <span style={{color: "red"}}>*</span>
											</label>
											<Input type="number" name="mobile" className="form-control"
												value={
													formData.mobile
												}
												placeholder="Enter Your Mobile"
												onChange={(e) => handleInputChange(e, 10)}/>
												
										</div>
										{errors?.mobile && (
							<span className='validationError'>
								{errors?.mobile}
							</span>
						)}
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceType">
												Address <span style={{color: "red"}}>*</span>
											</label>
											<Input type="text" name="address" className="form-control"
												value={
													formData.address
												}
												placeholder="Enter your address"
												onChange={(e) => handleInputChange(e, 200)}/>
												
										</div>
										{errors?.address && (
							<span className='validationError'>
								{errors?.address}
							</span>
						)}
									</Col>
								</Row>
								<Row>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceName">
												Landmark 
											</label>
											<Input type="text" name="land_mark" className="form-control"
												value={
													formData.land_mark
												}
												placeholder="Enter your land mark"
												onChange={(e) => handleInputChange(e, 100)}/>
										</div>
									</Col>
									<Col xs={12}
										lg={6}
										xl={6}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceType">
												Location 
											</label>
											<Input type="text" name="location" className="form-control"
												value={
													formData.location
												}
												placeholder="Enter your location"
												onChange={(e) => handleInputChange(e, 100)}/>
										</div>
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceName">
												Problem Description 
											</label>
											<Input type="textarea" name="problem_des" className="form-control"
												value={
													formData.problem_des
												}
												onChange={(e) => handleInputChange(e, 200)}
												rows="4"
												cols="50"
												placeholder="Enter Problem Description"
												/>
										</div>
									</Col>
								</Row>
								<Button color="primary" className="btn-block"
									disabled={isLoading}
									onClick={handleSubmit}>
									Submit
								</Button>
							</form>
						</Col>
						<Col xs={12}
							lg={5}>
							<Card>
								<div className="p-2 bg-warning">
									<p>
										<b>Terms and Conditions</b>
									</p>
								</div>
								<CardBody>
									<ul>
										<li>Every Free Services for one & half hour.</li>
										<li>After that it will paid by Member.</li>
										<li>Material Cost paid by Member.</li>
										<li>
											Associated service provider will responsibile for three
											                      quality.
										</li>
										<li>
											Additional Charges will be paid by member as per the norms
											                      of the quality.
										</li>
										<li>
											Beside Emergency Services other will be available form
											                      8:00 am to 6:00 pm.
										</li>
									</ul>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</ModalBody>
		</Modal>
	);
};

export const CustomerRemarkModal = ({customerRemarkModalOpen, customerRemarkModalfunction,orderNo, GetAllOrders,registerId}) => {
	const [formData, setFormData] = useState({cust_remark: ""});

	const dispatch = useDispatch();
	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};
	const handleSubmit = () => {
		const apiUrl = `${API_URL}/order/assign/${orderNo}`;
		
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				customerRemarkModalfunction();
				dispatch(GetAllOrders(registerId));
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			 
		}).catch(error => {
			console.error('Error:', error);
		});
		


	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={customerRemarkModalOpen}
			toggle={customerRemarkModalfunction}>
			<ModalHeader toggle={customerRemarkModalfunction}>
				Service Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Service Remark
							</label>
							<Input type="textarea" name="cust_remark" className="w-100"
								value={
									formData.serviceRemark
								}
								onChange={handleInputChange}
								rows="6"
								// Increase the number of rows
								cols="50"
								// Adjust the number of columns if needed
							/>
						</div>
						<div className="d-flex justify-content-evenly">
							<Button color="primary"
								onClick={handleSubmit}>
								Submit
							</Button>
							<Button color="primary" outline
								onClick={customerRemarkModalfunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};


export const CustomerCancelOrderModal = ({
	customerCancelOrderModalOpen,
	customerCancelModalfunction,
	registerId,
	orderNo,
	GetAllOrders
}) => {

	const [registered_id, setRegisterId] = useState(registerId)
	const [order_no, setOrderNo] = useState(orderNo);
	const [cancelReason, setCancelReason] = useState('');
	const dispatch = useDispatch()


	const handleSubmit = () => {
		const data = {
			cancle_reson: cancelReason,
			pending: 5
		}

		const apiUrl = `${API_URL}/order/cancel/${order_no}/${registerId}`;
		axios.post(apiUrl, data).then(response => {
			console.log(response)
			if (response.status === 200) {
				customerCancelModalfunction();
				Swal.fire('Successfully!', 'Your Order has been Cancelled.', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders(registered_id));
		}).catch(error => {
			console.error('Error:', error);
		});
		// Close the modal after submission
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={customerCancelOrderModalOpen}
			toggle={customerCancelModalfunction}>
			<ModalHeader toggle={customerCancelModalfunction}>
				Service Remark
			</ModalHeader>
			<ModalBody>

				<Fragment>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label>Register Id</Label>
								<Input onChange={
										(e) => setRegisterId(e.target.value)
									}
									value={registered_id}
									type='text'
									placeholder='Enter Your Register Id'/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label>Order ID</Label>
								<Input onChange={
										(e) => setOrderNo(e.target.value)
									}
									value={order_no}
									type='text'
									placeholder='Status'/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Cancel Reason</Label>
								<Input type='textarea'
									onChange={
										(e) => setCancelReason(e.target.value)
									}
									value={cancelReason}/>
							</FormGroup>
						</Col>

						<Button className='bg-danger text-white'
							onClick={handleSubmit}>Cancel</Button>
					</Row>
				</Fragment>


				{/* <Row>
          <Col xs={12}>
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="serviceRemark">
                Service Remark
              </label>
              <Input
                type="textarea"
                name="serviceRemark"
                className="w-100"
                value={formData.serviceRemark}
                onChange={handleInputChange}
                rows="6" // Increase the number of rows
                cols="50" // Adjust the number of columns if needed
              />
            </div>
            <div className="d-flex justify-content-evenly">
              <Button color="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                color="primary"
                outline
                onClick={customerCancelModalfunction}
              >
                Close
              </Button>
            </div>
          </Col>
        </Row> */} </ModalBody>
		</Modal>
	);
};


export const AddComplainModal = ({complainModalOpen, complainModalOpenfunction, mobileNo, GetAllOrders, role , currentUser}) => {

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
			value: "booking"
		}, {
			label: "Urgent",
			value: "urgent"
		}, {
			label: "Regular",
			value: "regular"
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

	
		if(!errformData.mobile || !errformData.name || !errformData.date || errformData.time){
			return;
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
			problem_des: problemDescription
		};
		const apiUrl = `${API_URL}/order/add-complain`;
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				setErrformData('');
				complainModalOpenfunction();
				Swal.fire('Successfully!', 'Your Order has been Added.', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser, role));
              } else {
                dispatch(GetAllOrders());
              }
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


export const AssignSupervisorModal = ({supervisorModalOpen, supervisorModalOpenFunction, OrderNo, GetAllOrders}) => {

	const [GetAllSupervisor, setAllSupervisor] = useState([])
	const [supervisor, setSupervisor] = useState('')

	const dispatch = useDispatch();
	useEffect(() => {
		getAllServices();
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/employee/getall/supervisor')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.name, value: item.name}));
			setAllSupervisor(transformedData);
		}
	}

	const handleSubmit = () => {

		const formData = {
			suprvisor_id: supervisor.value
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				supervisorModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});


	};

	return (
		<Modal className="modal-dialog-centered"
			isOpen={supervisorModalOpen}
			toggle={supervisorModalOpenFunction}>
			<ModalHeader toggle={supervisorModalOpenFunction}>
				Choose The Supervisor
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<FormGroup>
							<label className="form-label" htmlFor="serviceRemark">
								Choose Supervisor
							</label>


							<SelectBox options={GetAllSupervisor}
								setSelcted={setSupervisor}
								selectOption={supervisor}/>
						</FormGroup>
					</Col>
					<div className="d-flex justify-content-end ">
						<Button color="success"
							onClick={handleSubmit}
							style={
								{marginRight: '10px'}
						}>
							Save
						</Button>
						<Button color="danger"
							onClick={supervisorModalOpenFunction}>
							Close
						</Button>
					</div>

				</Row>
			</ModalBody>
		</Modal>
	);
};

export const AssignServiceProviderModal = ({serviceProviderModalOpen, serviceProviderModalOpenFunction, OrderNo, GetAllOrders, role, currentUser}) => {

	const [GetAllServiceProvider, setAllServiceProvider] = useState([]);
	const [serviceProvider, setServiceProvider] = useState('');

	const dispatch = useDispatch();
	useEffect(() => {
		getAllServices();
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service-provider/getall')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.name, value: item.name}));
			setAllServiceProvider(transformedData);
		}
	}

	const handleSubmit = () => {
		const formData = {
			servicep_id: serviceProvider.value
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				serviceProviderModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} 

			if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser, role));
              } else {
                dispatch(GetAllOrders());
              }
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered"
			isOpen={serviceProviderModalOpen}
			toggle={serviceProviderModalOpenFunction}>
			<ModalHeader toggle={serviceProviderModalOpenFunction}>
				Choose The Service Provider
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<FormGroup>
							<label className="form-label" htmlFor="serviceRemark">
								Choose Service Provider
							</label>
							<SelectBox options={GetAllServiceProvider}
								setSelcted={setServiceProvider}
								selectOption={serviceProvider}/>
						</FormGroup>
					</Col>
					<div className="d-flex justify-content-end ">
						<Button color="success"
							onClick={handleSubmit}
							style={
								{marginRight: '10px'}
						}>
							Save
						</Button>
						<Button color="danger"
							onClick={serviceProviderModalOpenFunction}>
							Close
						</Button>
					</div>
				</Row>
			</ModalBody>
		</Modal>
	);
};

export const AddAmount = ({AmountModalOpen, AmountModalOpenFunction, OrderNo, GetAllOrders,role, currentUser}) => {

	const GetAllPayMethod = [
		{
			label: "Cash In Hand",
			value: "Cash"
		}, {
			label: "Online",
			value: "Online"
		}, {
			label: "Cheque",
			value: "Cheque"
		}
	]
	const [paymethod, setPaymethod] = useState('');
	const [billAmount, setBillAmount] = useState(0)
	const [paidAmount, setPaidAmount] = useState(0);
	const [balanceAmount, setBalanceAmount] = useState(0);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			totalamt: balanceAmount,
			piadamt: paidAmount,
			netpayamt: billAmount,
			paymethod: paymethod.value
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				AmountModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser, role));
              } else {
                dispatch(GetAllOrders());
              }

		}).catch(error => {
			console.error('Error:', error);
		});
	};

	const handleBillChange = (e) => {
		const value = e.target.value;
		setBillAmount(value);
		calculateBalanceAmount(value, paidAmount);
	};

	const handlePaidChange = (e) => {
		const value = e.target.value;
		setPaidAmount(value);
		calculateBalanceAmount(billAmount, value);
	};

	const calculateBalanceAmount = (bill, paid) => {
		const billValue = bill ? parseFloat(bill) : 0;
		const paidValue = paid ? parseFloat(paid) : 0;
		setBalanceAmount(billValue - paidValue);
	};

	return (
		<Modal className="modal-dialog-centered"
			isOpen={AmountModalOpen}
			toggle={AmountModalOpenFunction}>
			<ModalHeader toggle={AmountModalOpenFunction}>
				Billing Details
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<FormGroup>
							<label className="form-label" htmlFor="serviceRemark">
								Payment Method
							</label>
							<SelectBox options={GetAllPayMethod}
								setSelcted={setPaymethod}
								selectOption={paymethod}/>
						</FormGroup>
					</Col>


					<Col md={12}>
						<FormGroup>
							<Label>Bill Amount</Label>
							<Input onChange={handleBillChange}
								value={billAmount}
								placeholder='Bill Amount'
								type='number'/>
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Label>Paid Amount</Label>
							<Input onChange={handlePaidChange}
								type='number'
								value={paidAmount}
								placeholder='Paid Amount'/>
						</FormGroup>
					</Col>

					<Col md={12}>
						<FormGroup>
							<Label>Balance Amount</Label>
							<Input value={balanceAmount}
								placeholder='Balance Amount'
								type='number'
								readOnly/>
						</FormGroup>
					</Col>

					<div className="d-flex justify-content-end ">
						<Button color="success"
							onClick={handleSubmit}
							style={
								{marginRight: '10px'}
						}>
							Save
						</Button>
						<Button color="danger"
							onClick={AmountModalOpenFunction}>
							Close
						</Button>
					</div>
				</Row>
			</ModalBody>
		</Modal>
	);
};


export const SuperAdminRemarkModal = ({superAdminRemarkModalOpen, superAdminRemarkModalfunction, OrderNo, GetAllOrders}) => {

	const [sueadminRemark, SetsueadminRemark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			sueadmin_remark: sueadminRemark
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				superAdminRemarkModalfunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});

		// Close the modal after submission
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={superAdminRemarkModalOpen}
			toggle={superAdminRemarkModalfunction}>
			<ModalHeader toggle={superAdminRemarkModalfunction}>
				Super Admin Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Super Admin Remark
							</label>
							<Input type="textarea"
								onChange={
									(e) => SetsueadminRemark(e.target.value)
								}
								className="w-100"
								rows="6"
								// Increase the number of rows
								cols="50"
								// Adjust the number of columns if needed
								placeholder="Super Admin Remark"
							/>
						</div>


						<div className="d-flex justify-content-end ">
							<Button color="success"
								onClick={handleSubmit}
								style={
									{marginRight: '10px'}
							}>
								Save
							</Button>
							<Button color="danger"
								onClick={superAdminRemarkModalfunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};


export const AdminRemarkModal = ({adminRemarkModalOpen, adminRemarkModalfunction, OrderNo, GetAllOrders}) => {

	const [adminRemark, SetadminRemark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			admin_remark: adminRemark
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				adminRemarkModalfunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={adminRemarkModalOpen}
			toggle={adminRemarkModalfunction}>
			<ModalHeader toggle={adminRemarkModalfunction}>
				Admin Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Admin Remark
							</label>
							<Input type="textarea"
								onChange={
									(e) => SetadminRemark(e.target.value)
								}
								className="w-100"
								rows="6"
								cols="50"
								placeholder="Admin Remark"
							/>
						</div>
						<div className="d-flex justify-content-end">
							<Button color="success"
								onClick={handleSubmit}
								style={
									{marginRight: '10px'}
							}>
								Save
							</Button>
							<Button color="danger"
								onClick={adminRemarkModalfunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};

export const BackOfficeRemarkModal = ({backOfficeRemarkModalOpen, backOfficeRemarkModalfunction, OrderNo, GetAllOrders}) => {

	const [backOfficeRemark, SetbackOfficeRemark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			bakof_remark: backOfficeRemark
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				backOfficeRemarkModalfunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={backOfficeRemarkModalOpen}
			toggle={backOfficeRemarkModalfunction}>
			<ModalHeader toggle={backOfficeRemarkModalfunction}>
				Back Office Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Back Office Remark
							</label>
							<Input type="textarea"
								onChange={
									(e) => SetbackOfficeRemark(e.target.value)
								}
								className="w-100"
								rows="6"
								// Increase the number of rows
								cols="50"
								// Adjust the number of columns if needed
								placeholder="Back Office Remark"
							/>
						</div>
						<div className="d-flex justify-content-end ">
							<Button color="success"
								onClick={handleSubmit}
								style={
									{marginRight: '10px'}
							}>
								Save
							</Button>
							<Button color="danger"
								onClick={backOfficeRemarkModalfunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};

export const AllotItemModal = ({allotItemModalOpen, allotItemModalfunction, inventryData}) => {

	const [allotedTo, SetallotedTo] = useState('');
	const [date, setDate] = useState('');
	const [qty, setQty] = useState('')
	const [remark, SetRemark] = useState('');
	


	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			spname: allotedTo,
			allotdate: date,
			aqty: qty,
			item:inventryData.item
		}
		const apiUrl = `${API_URL}/inventry/allot`;
		// Make a POST request using Axios
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				allotItemModalfunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			// dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={allotItemModalOpen}
			toggle={allotItemModalfunction}>
			<ModalHeader toggle={allotItemModalfunction}>
				Allot Items
			</ModalHeader>
			<ModalBody>
				<Fragment>
					<Row>
						<Col md={4}>
							<FormGroup>
								<Label>Allot To</Label>
								<Input onChange={
										(e) => SetallotedTo(e.target.value)
									}
									value={allotedTo}
									placeholder='Allot To'/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label>Date</Label>
								<Input onChange={
										(e) => setDate(e.target.value)
									}
									type="date"
									value={date}
									placeholder='Mobile Number'/>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Quantity</Label>
								<Input onChange={
										(e) => setQty(e.target.value)
									}
									value={qty}
									placeholder='Quantity'/>
							</FormGroup>
						</Col>

						<Col xs={12}>
							<div className="form-outline mb-2">
								<label className="form-label" htmlFor="serviceRemark">
									Remark
								</label>
								<Input type="textarea"
									onChange={
										(e) => SetRemark(e.target.value)
									}
									className="w-100"
									rows="6"
									cols="50"
									placeholder="Allot Remark"
									value={remark}/>
							</div>
							<div className="d-flex justify-content-end ">
								<Button color="success"
									onClick={handleSubmit}
									style={
										{marginRight: '10px'}
								}>
									Update
								</Button>
								<Button color="danger"
									onClick={allotItemModalfunction}>
									Close
								</Button>
							</div>
						</Col>
					</Row>
				</Fragment>
			</ModalBody>
		</Modal>
	);
};


export const AddInventryModal = ({AddInventryModalOpen, AddInventryModalOpenFunction, data,GetAllInventry}) => {

	const dispatch = useDispatch();
	const [item, setItem] = useState(data.item || '');
	const [qty, setQty] = useState(data.qty || '');
	const handleSubmit = () => {
		const formData = {
			item: item,
			qty: qty
		}
		var apiUrl = '' 
		if(!data.id){
			apiUrl = `${API_URL}/inventry/add`;
		}else{
			apiUrl = `${API_URL}/inventry/update/`+data.id;
		}
		 
		// Make a POST request using Axios
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				AddInventryModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			dispatch(GetAllInventry());
		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={AddInventryModalOpen}
			toggle={AddInventryModalOpenFunction}>
			<ModalHeader toggle={AddInventryModalOpenFunction}>
				{
				(!data) ? "Add Item" : "Update Item"
			} </ModalHeader>
			<ModalBody>
				<Row>

					<Col md={6}>
						<FormGroup>
							<Label>Item *</Label>
							<Input onChange={
									(e) => setItem(e.target.value)
								}
								value={item}
								type='text'
								placeholder='Item'/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							<Label>Quantity *</Label>
							<Input onChange={
									(e) => setQty(e.target.value)
								}
								value={qty}
								type='number'
								placeholder='Quantity'/>
						</FormGroup>
					</Col>

					<div className="d-flex justify-content-end ">
						<Button color="success"
							onClick={handleSubmit}
							style={
								{marginRight: '10px'}
						}>
							{
							(!data) ? "Save" : "Update"
						} </Button>
						<Button color="danger"
							onClick={AddInventryModalOpenFunction}>
							Close
						</Button>
					</div>
				</Row>
			</ModalBody>
		</Modal>
	);
};


export const AssignEmployeeAvailability = ({EmployeeAvailabilityModalOpen, EmployeeAvailabilityModalfunction, field, mobile_no, date}) => {

	const [AvailabilityRemark, setAvailabilityRemark] = useState(false)
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		const formData = {
			[field]: AvailabilityRemark,
		}

		const response = await fetch(API_URL + "/api/assign-availability/"+parseInt(mobile_no)+"/"+date, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const IsAvailable = await response.json();

          if (IsAvailable.status === true) {
            Swal.fire({
                icon: "success",
                title: IsAvailable.message,
                showConfirmButton: false,
                timer: 1500
              });
           
            setTimeout(() => setIsLoading(false), 5000);
            EmployeeAvailabilityModalfunction();
            dispatch(GetAvailability({date:date}))
		  } else{
			Swal.fire({
                icon: "error",
                title: IsAvailable.message,
                showConfirmButton: false,
                timer: 1500
              });
		  }
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={EmployeeAvailabilityModalOpen}
			toggle={EmployeeAvailabilityModalfunction}>
			<ModalHeader toggle={EmployeeAvailabilityModalfunction}>
			Employee Assign Availability - {field}
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Employee Assign Remark <span style={{color: "red"}}>*</span>
							</label>
							<Input type="textarea"
								onChange={
									(e) => setAvailabilityRemark(e.target.value)
								}
								className="w-100"
								rows="6"
								cols="50"
								placeholder="Employee Assign Remark"
							/>
						</div>
						<div className="d-flex justify-content-end ">
							<Button color="success"
								onClick={handleSubmit}
								style={
									{marginRight: '10px'}
									
							} disabled={isLoading}>
								Save
							</Button>
							<Button color="danger"
								onClick={EmployeeAvailabilityModalfunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};



export const ForgetPasswordModal = ({ForgetPasswordModalOpen, ForgetPasswordModalOpenFunction}) => {

	const [otp, setOpt] = useState('');
	
	const [otpid, setOtpid] = useState(false);
	const [isPasswordOpen, setIsPasswordOpen] = useState(true);
	const [email, setEmail] = useState('');
	const [loader, setLoader] = useState(false);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	
	const handleSubmit = () => {
		const formData = {
			otp: otp,
			otpid: otp+email
		}
		axios.post(API_URL+"/admin/password-verify", formData).then(response => {
			if (response.data.status === true) {
				// ForgetPasswordModalOpenFunction();
				setIsPasswordOpen(false)
				// Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				// Swal.fire({title: 'failed to add try again', icon: "error"})
			}
			
		}).catch(error => {
			console.error('Error:', error);
		});
	};


	const handleOtpSend = (email) =>{
		setLoader(true)
		axios.post(API_URL+"/admin/forget", {
			email: email
		}).then(response => {
			if(response.data.status ===true){
				setOtpid(true)
				setLoader(false)
			}
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	const onsubmitPassword = () => {
		setLoader(true);
	
		// Check if password and confirmPassword are provided
		if (!password || !confirmPassword) {
			Swal.fire({title: 'Please enter both password and confirm password', icon: "error"});
			setLoader(false);
			return;
		}
	
		// Check if password and confirmPassword match
		if (password !== confirmPassword) {
			Swal.fire({title: 'Password and Confirm password should be the same', icon: "error"});
			setLoader(false);
			return;
		}
	
		const formData = {
			email: email, // Correcting the email field
			password: password
		};
	
		axios.post(`${API_URL}/admin/password-reset`, formData)
			.then(response => {
				setLoader(false);

				if (response.data.status === true) {
					setIsPasswordOpen(true)
					setEmail('')
					setOpt(false);
					setOpt('');
					ForgetPasswordModalOpenFunction()
					Swal.fire({title: 'Password reset successfully', icon: "success"});
				} else {
					Swal.fire({title: 'Failed to reset password', icon: "error"});
				}
			})
			.catch(error => {
				console.error('Error:', error);
				Swal.fire({title: 'An error occurred while resetting the password', icon: "error"});
				setLoader(false);
			});
	};


	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={ForgetPasswordModalOpen}
			toggle={ForgetPasswordModalOpenFunction}>
			<ModalHeader toggle={ForgetPasswordModalOpenFunction}>
				Forget Password
				</ModalHeader>
			<ModalBody>
				<div className="w-100 d-flex loginmain">
					<div className="text-center rounded">
						<img src={Logo}
							alt="MainLogo"/>
						<div className="text-center">
							<h4 className="text-blue fw-bold">Welcome To Helper</h4>
							<p className="py-2 text-secondary">
								Please Enter your details to Login
							</p>
						</div>

						<form>

							{isPasswordOpen ? ( <>
							<FormGroup className="d-flex flex-column  align-items-start ">
								<Label for="mobileNo"> Email <span style={{color: "red"}}> * </span> </Label>
								<Input type="tel" name="mobileNo" id="mobileNo"
									value={email}
									// disabled={otpid !== null}
									placeholder="Email"
									onChange={
										(e) => setEmail(e.target.value)
									}/>
							</FormGroup>
							{
							otpid ? (
								<FormGroup className="d-flex align-items-center gap-2 ">
									<Label for="mobileNo text-nowrap w-25">Enter Otp :</Label>
									<Input type="number" name="otp" id="otp"
										maxLength={6}
										value={otp}
										placeholder="XXXX"
										className="w-25"
										onChange={
											(e) => setOpt(e.target.value)
										}/>
								</FormGroup>
							) : null
						}
							<Button type="button" className="ml-3 bg-blue w-25">
								Cancel
							</Button>
							{
							otp ? (
								<>
									<Button type="button" className="ml-3 bg-blue w-25"
										onClick={handleSubmit}>
										Login
										<ClockLoader size={16}
											className="ml-2 "
											color="#fff"
											loading={loader}/>
									</Button>
									<Button type="button"
										// disabled={
										// 	timeRemaining >= 5
										// }
										className="ml-3 bg-blue w-25"
									// 	onClick={
									// 		() => HandleResendBtn(mobileNo)
									// }
									>
										Resend
										<ClockLoader size={16}
											className="ml-2 "
											color="#fff"
											loading={loader}/>
									</Button>
								</>
							) : (
								<Button type="button" className="ml-3 bg-blue w-25"
									onClick={
										() => handleOtpSend(email)
								}
								>
									Verify
									<ClockLoader size={16}
										className="ml-2 "
										color="#fff"
										loading={loader}/>
								</Button>
							)
						} 
					</> ) : 
					
					<>
					<FormGroup className="d-flex flex-column  align-items-start ">
								<Label for="mobileNo"> Password <span style={{color: "red"}}> * </span> </Label>
								<Input type="password" name="mobileNo" id="mobileNo"
									value={password}
									placeholder="password"
									onChange={
										(e) => setPassword(e.target.value)
									}/>
							</FormGroup>

							<FormGroup className="d-flex flex-column  align-items-start ">
								<Label for="mobileNo"> Confirm Password <span style={{color: "red"}}> * </span> </Label>
								<Input type="password" name="mobileNo" id="mobileNo"
									value={confirmPassword}
									placeholder="Confirm password"
									onChange={
										(e) => setConfirmPassword(e.target.value)
									}/>
							</FormGroup>

					<Button type="button" className="ml-3 bg-blue w-25"
									onClick={onsubmitPassword}
								>
									Change Password
									<ClockLoader size={16}
										className="ml-2 "
										color="#fff"
										loading={loader}/>
								</Button>
					</>
					
					}
						</form>
			</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export const ServiceProviderRemarkModal = ({superProviderRemarkModalOpen, superProviderRemarkModalOpenFunction, OrderNo, GetAllOrders , role, currentUser}) => {

	const [superProviderRemark, setSuperProviderRemark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			servp_remark: superProviderRemark
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				superProviderRemarkModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} 

			if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser, role));
            } else {
                dispatch(GetAllOrders());
            }

		}).catch(error => {
			console.error('Error:', error);
		});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg"
			isOpen={superProviderRemarkModalOpen}
			toggle={superProviderRemarkModalOpenFunction}>
			<ModalHeader toggle={superProviderRemarkModalOpenFunction}>
				Service Provider Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
								Service Provider Remark
							</label>
							<Input type="textarea"
								onChange={
									(e) => setSuperProviderRemark(e.target.value)
								}
								className="w-100"
								rows="6"
								cols="50"
								placeholder="Admin Remark"
							/>
						</div>
						<div className="d-flex justify-content-end">
							<Button color="success"
								onClick={handleSubmit}
								style={
									{marginRight: '10px'}
							}>
								Save
							</Button>
							<Button color="danger"
								onClick={superProviderRemarkModalOpenFunction}>
								Close
							</Button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};