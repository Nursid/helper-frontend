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
import { UseStateManager } from "../Context/StateManageContext";
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
import { GetAllTimeSlot } from "../Store/Actions/Dashboard/Orders/OrderAction";

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

export const ServeiceRequestModal = ({serveRequestModalOpen, serveRequestModalOpenfunction,Data,GetAllOrders}) => {

	const [formData, setFormData] = useState({
		service_name: "",
		user_type: "",
		booktime: "",
		bookdate: "",
		name: Data?.customerData?.NewCustomer?.name || "",
		mobile: Data?.customerData?.NewCustomer?.mobileno || "",
		service_address: Data?.customerData?.address || "",
		land_mark: Data?.customerData?.land_mark || "",
		location: Data?.customerData?.location || "",
		problem_des: "",
		cust_id: Data?.customerData?.NewCustomer?.id || "",
		pending: 0
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

	const today = new Date();
	const currentDate = today.getFullYear() + '-' + 
                    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(today.getDate()).padStart(2, '0');


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

		if (currentDate !== formData?.bookdate) {
			console.log('--',currentDate, formData?.bookdate)
			formData.pending = 2;
		}

		const apiUrl = `${API_URL}/order/add-customer-order`;
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				dispatch(GetAllOrders(Data?.customerData?.NewCustomer?.id));
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
												<MenuItem value="Booking">Booking</MenuItem>
												<MenuItem value="Urgent">Urgent</MenuItem>
												<MenuItem value="Regular">Regular</MenuItem>
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
											
												<Input
													type="date"
													name="bookdate"
													className="form-control"
													value={formData.bookdate}
													min={currentDate} // Disable previous dates
													onChange={(e) => handleInputChange(e, 50)}
													/>
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
												onChange={(e) => handleInputChange(e, 50)}
												readOnly={!!Data?.customerData?.NewCustomer?.id}
												/>
												
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
												onChange={(e) => handleInputChange(e, 10)}
												readOnly={!!Data?.customerData?.NewCustomer?.id}
												/>
												
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
												onChange={(e) => handleInputChange(e, 200)}
												/>
												
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
												onChange={(e) => handleInputChange(e, 100)}
												readOnly={!!Data?.customerData?.NewCustomer?.id}
												/>
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
												onChange={(e) => handleInputChange(e, 100)}
												readOnly={!!Data?.customerData?.NewCustomer?.id}
												/>
										</div>
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="serviceName">
												Service Description 
											</label>
											<Input type="textarea" name="problem_des" className="form-control"
												value={
													formData.problem_des
												}
												onChange={(e) => handleInputChange(e, 200)}
												rows="4"
												cols="50"
												placeholder="Enter Service Description"
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
				Customer Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
							Customer Remark
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

		const apiUrl = `${API_URL}/order/cancel/${order_no}`;
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
				Cancel Order
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


export const AddComplainModal = ({ complainModalOpen, complainModalOpenfunction, data, fetchData }) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		customerName: data?.customerData?.NewCustomer?.name ?? '',
		type: '',
		time: '',
		mobileNumber: data?.customerData?.NewCustomer?.mobileno ?? '',
		memberShipId: '',
		service: '',
		date: '',
		address: data?.customerData?.address ?? '',
		serviceAddress: '',
		landMark: data?.customerData?.land_mark ?? '',
		location: data?.customerData?.location ?? '',
		problemDescription: '',
		status: 'Pending'
	});
	
	console.log(formData)

	const [getAllService, setAllservices] = useState([]);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		getAllServices()
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service/getall');
		if (response.status === 200) {
			if(!!data?.customerData?.NewCustomer?.id){
				const transformedData = data?.recentOrder?.map(item => ({ label: item.service_name, value: item.order_no }));
				setAllservices(transformedData);
			}else{
				const transformedData = response.data.data.map(item => ({ label: item.serviceName, value: item.serviceName }));
				setAllservices(transformedData);
			}
			
		}
	};

	const getAllType = [
		{ label: "Booking", value: "Booking" },
		{ label: "Urgent", value: "Urgent" },
		{ label: "Regular", value: "Regular" }
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSelectChange = (selectedOption, name) => {
		setFormData({
			...formData,
			[name]: selectedOption
		});
	};

	const onsubmitDate = () => {


		let errors = {};
       
		if (!formData?.mobileNumber) {
			errors.mobileNumber = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData?.mobileNumber)) {
			errors.mobileNumber = "Mobile number should be 10 digits";
		}

		if(!formData?.date){
			errors.date = "Date is required"
		}

		if(!formData?.service?.value){
			errors.service_name = "service is required"
		}
		if(!formData?.time){
			errors.time = "time is required"
		}
		if(!formData?.problemDescription){
			errors.problemDescription = "Problem description is required"
		}

		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
			} else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			return false;
			}

		const payload = {
			service_name: formData.service.label,
			user_type: formData.type.value,
			order_no: (!!data?.customerData?.NewCustomer?.id) ? formData.service?.value : '',
			booktime: formData.time,
			bookdate: formData.date,
			name: formData.customerName,
			mobile: formData.mobileNumber,
			address: formData.address,
			service_address: formData.serviceAddress,
			land_mark: formData.landMark,
			city: formData.location,
			problem_des: formData.problemDescription,
			cust_id: data?.customerData?.NewCustomer?.id,
			pending: 0
		};
		const apiUrl = `${API_URL}/complain/add`;
		axios.post(apiUrl, payload)
			.then(response => {
				if (response.status === 200) {
					complainModalOpenfunction();
					Swal.fire('Successfully!', 'Your Complain has been Added.', 'success');
				} else {
					Swal.fire({ title: 'Failed to add, try again', icon: 'error' });
				}
				fetchData();
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	return (
		<Modal className="modal-dialog-centered modal-lg" isOpen={complainModalOpen} toggle={complainModalOpenfunction}>
			<ModalHeader toggle={complainModalOpenfunction}>Add New Complain</ModalHeader>
			<ModalBody>
				<Fragment>
					<Row>
						<Col md={4}>
							<FormGroup>
								<Label>Choose Service <span style={{ color: 'red' }}>*</span></Label>
								<SelectBox
									options={getAllService}
									setSelcted={(selectedOption) => handleSelectChange(selectedOption, 'service')}
									initialValue={formData?.service}
								/>
								{errors?.service_name && (
                        <span className='validationError'>
                            {errors?.service_name}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Type <span style={{ color: 'red' }}>*</span></Label>
								<SelectBox
									options={getAllType}
									setSelcted={(selectedOption) => handleSelectChange(selectedOption, 'type')}
									initialValue={formData?.type}
								/>
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Time <span style={{color: "red"}}>*</span> </Label>
								<Input
									name="time"
									onChange={handleChange}
									value={formData?.time}
									type="time"
								/>
								{errors?.time && (
                        <span className='validationError'>
                            {errors?.time}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Date <span style={{color: "red"}}>*</span></Label>
								<Input
									name="date"
									onChange={handleChange}
									value={formData?.date}
									type="date"
								/>
								{errors?.date && (
                        <span className='validationError'>
                            {errors?.date}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Customer Name <span style={{ color: 'red' }}>*</span></Label>
								<Input
									name="customerName"
									onChange={handleChange}
									value={formData?.customerName}
									placeholder="Name"
									readOnly={!!data?.customerData?.NewCustomer?.id}
								/>
								{errors?.customerName && (
                        <span className='validationError'>
                            {errors?.customerName}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Col md={4}>
							<FormGroup>
								<Label>Mobile Number <span style={{ color: 'red' }}>*</span></Label>
								<Input
									name="mobileNumber"
									onChange={handleChange}
									value={formData?.mobileNumber}
									placeholder="Mobile No"
									readOnly={!!data?.customerData?.NewCustomer?.id}
								/>
								{errors?.mobileNumber && (
                        <span className='validationError'>
                            {errors?.mobileNumber}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Address</Label>
								<Input
									name="address"
									onChange={handleChange}
									value={formData?.address}
									placeholder="Enter Your Address"
									readOnly={!!data?.customerData?.NewCustomer?.id}
								/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Service Address</Label>
								<Input
									name="serviceAddress"
									onChange={handleChange}
									value={formData?.serviceAddress}
									placeholder="Service Address"
								/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label>Land Mark</Label>
								<Input
									name="landMark"
									onChange={handleChange}
									value={formData?.landMark}
									placeholder="Land Mark"
									readOnly={!!data?.customerData?.NewCustomer?.id}
								/>
							</FormGroup>
						</Col>

						<Col md={6}>
							<FormGroup>
								<Label>Location</Label>
								<Input
									name="location"
									onChange={handleChange}
									value={formData?.location}
									placeholder="Location"
									readOnly={!!data?.customerData?.NewCustomer?.id}
								/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<FormGroup>
								<Label>Problem Description <span style={{color: "red"}}>*</span></Label>
								<Input
									name="problemDescription"
									type="textarea"
									onChange={handleChange}
									value={formData?.problemDescription}
									placeholder="Problem Description"
								/>
								{errors?.problemDescription && (
                        <span className='validationError'>
                            {errors?.problemDescription}
                        </span>
                    )}
							</FormGroup>
						</Col>

						<Button className="bg-success" onClick={onsubmitDate}>Complain Now</Button>
					</Row>
				</Fragment>
			</ModalBody>
		</Modal>
	);
};


export const AssignSupervisorModal = ({supervisorModalOpen, supervisorModalOpenFunction, assignSupervisorData, GetAllOrders}) => {

	const [GetAllSupervisor, setAllSupervisor] = useState([])
	const [supervisor, setSupervisor] = useState('')

	const dispatch = useDispatch();
	useEffect(() => {
		const filterData = {
			date: moment(assignSupervisorData.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
			time_range: assignSupervisorData.time_range
		}
		getAllSupervisor(filterData);
	}, []);


	const getAllSupervisor = async (filterData) => {
		const queryParams = new URLSearchParams(filterData).toString()
		const response = await axios.get(API_URL + `/employee/getall?${queryParams}`)
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.name, value: item.name}));
			setAllSupervisor(transformedData);
		}
	}

	const handleSubmit = () => {


		if(!supervisor.value) {
			alert('Please Select Supervisor')
			return;
		}

		const formData = {
			suprvisor_id: supervisor.value,
			pending: 0,
			date: moment(assignSupervisorData.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
			time_range: assignSupervisorData.time_range,
			service_name: assignSupervisorData.service_name
		}
		const apiUrl = `${API_URL}/order/assign-supervisor/${assignSupervisorData.order_no}`;
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

export const AssignSupervisorForComplainModal = ({supervisorModalOpen, supervisorModalOpenFunction, OrderNo, fetchData}) => {

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
		const apiUrl = `${API_URL}/complain/assing/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				fetchData()
				supervisorModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} 

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

export const AssignServiceProviderModal = ({serviceProviderModalOpen, serviceProviderModalOpenFunction, OrderNo, GetAllOrders, role, currentUser, date}) => {

	const [GetAllServiceProvider, setAllServiceProvider] = useState([]);
	const [serviceProvider, setServiceProvider] = useState('');
	const [getAlltimeSlot, setGetAlltimeSlot] = useState([])
	const [timeslot, setTimeslot] = useState([])
	const { data, isLoading } = useSelector(state => state.GetAllTimeSlotReducer);
	const dispatch = useDispatch();
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
		if(date && timeslot?.value){
            const filterData = {
				date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
				time_range: timeslot.value
			}
			getAllServicesProvider(filterData)
		  }
	  }, [date, timeslot?.value])



	const getAllServicesProvider = async (filterData) => {
		try {
		  const queryParams = new URLSearchParams(filterData).toString()
		  const response = await axios.get(`${API_URL}/service-provider/getall?${queryParams}`);
		  if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({ label: item.name, value: item.name }));
			setAllServiceProvider(transformedData);
		  }
		} catch (error) {
		  console.error("Error fetching service providers:", error);
		}
	  }



	const handleSubmit = () => {
		const formData = {
			servicep_id: serviceProvider.value,
			allot_time_range: timeslot.value
		}
		const apiUrl = `${API_URL}/order/assign-service-provider/${OrderNo}`;
		// Make a POST request using Axios
		axios.post(apiUrl, formData).then(response => {
			if (response.status === 200) {
				serviceProviderModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
				if (role === "service" || role === "supervisor") {
					const status = undefined;
					dispatch(GetAllOrders(status, currentUser, role));
				  } else {
					dispatch(GetAllOrders());
				  }
			} else {
				Swal.fire({title:  response.data.message, icon: "error"})
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
				Assign Service Provider
			</ModalHeader>
			<ModalBody>
				<Row>
				<Col xs={12}>
					<FormGroup>
						<Label>Time Slot</Label>
						<SelectBox 
							setSelcted={setTimeslot}
							initialValue={timeslot}
							options={getAlltimeSlot}
							/>
					</FormGroup>
				</Col>
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

export const AssignServiceProviderForComplainModal = ({serviceProviderModalOpen, serviceProviderModalOpenFunction, OrderNo, fetchData}) => {

	const [GetAllServiceProvider, setAllServiceProvider] = useState([]);
	const [serviceProvider, setServiceProvider] = useState('');

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
		const apiUrl = `${API_URL}/complain/assing/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				fetchData()
				serviceProviderModalOpenFunction();
				Swal.fire('Successfully!', response.data.message, 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
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

export const AddAmount = ({AmountModalOpen, AmountModalOpenFunction, OrderNo, GetAllOrders,role, currentUser, GetTotalSummary}) => {

	const GetAllPayMethod = [
		{
			label: "Cash",
			value: "Cash"
		}, {
			label: "Online",
			value: "Online"
		},
	]
	const [paymethod, setPaymethod] = useState('');
	const [billAmount, setBillAmount] = useState(0);
	const [paidAmount, setPaidAmount] = useState(0);
	const [balanceAmount, setBalanceAmount] = useState(0);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [personName, setPersonName] = useState('');
	const [serviceName, setServiceName] = useState('');

	const dispatch = useDispatch();

	const getOrderDetails = async (orderNo) => {
        try {
            const result = await axios.get(`http://localhost:8080/order/getbyorderno/${orderNo}`);
			
            if (result?.data?.status === 200) {
                setPersonName(result?.data?.data?.NewCustomer?.name);
                setServiceName(result?.data?.data?.service_name);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        if (OrderNo) { // Check if OrderNo is valid
            getOrderDetails(OrderNo);
        }
    }, [OrderNo]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true)
		  let errors = {};

		const formData = {
			totalamt: balanceAmount,
			piadamt: paidAmount,
			netpayamt: billAmount,
			paymethod: paymethod.value
		}

		const AddAccountAmount = {
			payment_mode: formData?.paymethod,
			amount: paidAmount,
			order_no: OrderNo,
			person_name:personName,
			about_payment: serviceName
		}	

		if (!formData.netpayamt || formData.netpayamt <= 0) {
			errors.netpayamt = "Total Amount is required ";
		}
		if (!formData.piadamt || formData.piadamt <= 0) {
			errors.piadamt = "Paid Amount is required ";
		}
		if (!formData.paymethod) {
			errors.paymethod = "Payment method is required";
		}	
		

		if (errors && Object.keys(errors).length === 0) {
		// Form is valid, handle form submission here
		console.log("Form submitted successfully!");
		setErrors([]);
		} else {
		// Form is invalid, display validation errors
		console.log("Validation Errors:", errors);
		setErrors(errors);
		setIsLoading(false)
		return false;
		}

		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(async(response) => {
			if (response.status === 200) {
				setIsLoading(false)
				const AddAccount = await axios.post(`${API_URL}/api/add-balance`,AddAccountAmount)

				if(AddAccount.status === 200){
					AmountModalOpenFunction();
					Swal.fire('Successfully!', response.data.message, 'success')
					setPaymethod('')
					setBillAmount(0)
					setPaidAmount(0)
					setBalanceAmount(0)
					
				}
				
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
				setIsLoading(false)
			}
			if (role === "service" || role === "supervisor") {
                const status = undefined;
                dispatch(GetAllOrders(status, currentUser, role));
				GetTotalSummary()
              } else {
                dispatch(GetAllOrders());
				GetTotalSummary()
              }
			  setIsLoading(false)
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
								Payment Method <span style={{color: "red"}}>*</span>
							</label>
							<SelectBox options={GetAllPayMethod}
								setSelcted={setPaymethod}
								selectOption={paymethod}/>
								{errors?.paymethod && (
							<span className='validationError'>
								{errors?.paymethod}
							</span>
						)}
						</FormGroup>
					</Col>


					<Col md={12}>
						<FormGroup>
							<Label>Bill Amount <span style={{color: "red"}}>*</span> </Label>
							<Input onChange={handleBillChange}
								value={billAmount}
								placeholder='Bill Amount'
								type='number'/>
								{errors?.netpayamt && (
							<span className='validationError'>
								{errors?.netpayamt}
							</span>
						)}
						</FormGroup>
					</Col>
					<Col md={12}>
						<FormGroup>
							<Label>Paid Amount <span style={{color: "red"}}>*</span></Label>
							<Input onChange={handlePaidChange}
								type='number'
								value={paidAmount}
								placeholder='Paid Amount'/>
								{errors?.piadamt && (
							<span className='validationError'>
								{errors?.piadamt}
							</span>
						)}
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
								
						}
						disabled={isLoading}
						>
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


export const SuperAdminRemarkModal = ({superAdminRemarkModalOpen, superAdminRemarkModalfunction, OrderNo, GetAllOrders, adminAprove}) => {

	const [sueadminRemark, SetsueadminRemark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			sueadmin_remark: sueadminRemark,
			admin_approve: adminAprove,
			pending: 3
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				superAdminRemarkModalfunction();
				Swal.fire('Successfully!', 'Order Varified Successfully', 'success')
			} else {
				Swal.fire({title: 'failed to add try again', icon: "error"})
			} dispatch(GetAllOrders());
		}).catch(error => {
			console.error('Error:', error);
		});
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


export const AdminRemarkModal = ({adminRemarkModalOpen, adminRemarkModalfunction, OrderNo, GetAllOrders, role, currentUser}) => {

	const [suerv_remark, setSuerv_remark] = useState(false)
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const formData = {
			suerv_remark: suerv_remark
		}
		const apiUrl = `${API_URL}/order/assign/${OrderNo}`;
		// Make a POST request using Axios
		axios.put(apiUrl, formData).then(response => {
			if (response.status === 200) {
				adminRemarkModalfunction();
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
			isOpen={adminRemarkModalOpen}
			toggle={adminRemarkModalfunction}>
			<ModalHeader toggle={adminRemarkModalfunction}>
				Supervisor Remark
			</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs={12}>
						<div className="form-outline mb-2">
							<label className="form-label" htmlFor="serviceRemark">
							Supervisor Remark
							</label>
							<Input type="textarea"
								onChange={
									(e) => setSuerv_remark(e.target.value)
								}
								className="w-100"
								rows="6"
								cols="50"
								placeholder="Supervisor Remark"
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


export const ApprovePaymentRemarkModal = ({ modalOpen, toggleModal, id, adminAprove, AccountListing }) => {
    const [remark, setRemark] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const formData = {
            remark: remark,
            approve: !adminAprove,
        };
        const apiUrl = `${API_URL}/api/edit-balance/${id}`;

        try {
            const response = await axios.post(apiUrl, formData);
            if (response.status === 200) {
                toggleModal();
                Swal.fire('Successfully!', 'Payment Verified Successfully', 'success');
                dispatch(AccountListing());
            } else {
                Swal.fire({ title: 'Failed to add, try again', icon: "error" });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({ title: 'An error occurred', icon: "error" });
        }
    };

    return (
        <Modal className="modal-dialog-centered modal-lg" isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
                Super Admin Payment Remark
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs={12}>
                        <div className="form-outline mb-2">
                            <label className="form-label" htmlFor="serviceRemark">
							Super Admin Payment Remark
                            </label>
                            <Input
                                type="textarea"
                                onChange={(e) => setRemark(e.target.value)}
                                className="w-100"
                                rows="6"
                                placeholder="Super Admin Remark"
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>
                                Save
                            </Button>
                            <Button color="danger" onClick={toggleModal}>
                                Close
                            </Button>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};


export const SupervisorLeaveRemarkModal = ({ modalOpen, toggleModal, empId, role, AttendanceAction }) => {

	const [message, setMessage] = useState('');
    const dispatch = useDispatch();
	const [type, setType] = useState("");
	const [errors, setErrors]= useState([]);
	const [isLoading, setIsLoading] = useState(false)
	const [leaveDay, setLeaveDay] = useState('');
	const [half, sethalf] = useState('');
	

    const handleSubmit = async (e) => {

		setIsLoading(true)

        e.preventDefault();
        let errors = {};

		// if (!type.value) {
        //     errors.type = "Leave type is required";
        // }

		if (!leaveDay?.value) {
            errors.leaveDay = "LeaveDay is required";
        }

		if (leaveDay && leaveDay?.value === '2' && !half?.value) {
			errors.half = 'Half Day is required';
		}

		if (!message) {
            errors.message = "Remark is required";
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

		  const date = new Date();
		const options = { timeZone: "Asia/Kolkata", year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(date);
		  
        const formData = {
            message: message,
            status: leaveDay?.label,
			in_date: formattedDate,
			emp_id: empId,
            createdby: role
        };

		const formdataAvailvility = {
			date: formattedDate,
			emp_id: empId,
			leaveDay: leaveDay?.value,
			half: half ? half?.value : null,
			label: leaveDay?.label
		  }


		const apiUrl = `${API_URL}/attendance/supervisor/leave`;
        try {
            const response = await axios.post(apiUrl, formData);
            if (response.status === 200) {
				const response2 = await axios.post(`${API_URL}/api/supervisor-add-leave`, formdataAvailvility)
						if (response2.status === 200) {
							toggleModal();
							Swal.fire('Successfully!', response.data.message, 'success');
							dispatch(AttendanceAction());
					 }               
            } else {
                Swal.fire({ title: 'Failed to add, try again', icon: "error" });
            }
			setIsLoading(false)
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({ title: 'An error occurred', icon: "error" });
			setIsLoading(false)
        }

    };

	const DayLeave = [
		{ label: 'Full day Leave', value: '1' },
		{ label: 'Half Day Leave', value: '2'},
        {
            label: 'Week Off',
            value: '3',
        },
		{
            label: 'Absent',
            value: '4',
        },
	  ]

	const HalfLeave = [
		{ label: 'First Half', value: '1' },
		{ label: 'Second Half', value: '2'}
	]

    return (
        <Modal className="modal-dialog-centered modal-lg" isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
                Add Leave
            </ModalHeader>
            <ModalBody>
                <Row>
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

					{/* <Col md={12}>
						<FormGroup>
						<Label for="first_name">Leave Type <span style={{color: "red"}}>*</span></Label>
						<SelectBox options={allType} setSelcted={setType} initialValue={type} />
							{errors?.type && (
						<span className='validationError'>
							{errors?.type}
						</span>
					)}
				
						</FormGroup>
					</Col> */}

                    <Col xs={12}>
					<FormGroup>
					<Label for="first_name">Reason for Leave<span style={{color: "red"}}>*</span></Label>
                            <Input
                                type="textarea"
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-100"
								rows="6"
                                placeholder="Write your reason..."
                            />
							{errors?.message && (
								<span className='validationError'>
									{errors?.message}
								</span>
							)}
							</FormGroup>
					</Col>
					<Col xs={12}> 
                        <div className="d-flex justify-content-end">
                            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}
							disabled={isLoading}
							>
                                Save
                            </Button>
                            <Button color="danger" onClick={toggleModal}>
                                Close
                            </Button>
                        </div>
				    </Col>
                </Row>
            </ModalBody>
        </Modal>

    
    );
};

export const ServiceProviderLeaveRemarkModal = ({ modalOpen, toggleModal, empId, role, ServiceProviderAttendancaAction }) => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
	const [type, setType] = useState("");
	const [errors, setErrors]= useState([]);
	const [isLoading, setIsLoading] = useState(false)
	const [leaveDay, setLeaveDay] = useState('');
	const [half, sethalf] = useState('');
	
	const [allType, setAllType]=useState([
        {
            label: 'Leave',
            value: 'Leave',
        },
        {
            label: 'Week Off',
            value: 'Week Off',
        },
		{
            label: 'Absent',
            value: 'Absent',
        },
    ]);

    const handleSubmit = async (e) => {

		setIsLoading(true)

        e.preventDefault();
        let errors = {};

		// if (!type.value) {
        //     errors.type = "Leave type is required";
        // }

		if (!leaveDay?.value) {
            errors.leaveDay = "LeaveDay is required";
        }

		if (leaveDay && leaveDay?.value === '2' && !half?.value) {
			errors.half = 'Half Day is required';
		}

		if (!message) {
            errors.message = "Remark is required";
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

		  const date = new Date();
		const options = { timeZone: "Asia/Kolkata", year: 'numeric', month: '2-digit', day: '2-digit' };
		const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(date);
		  
        const formData = {
            message: message,
            status: leaveDay?.label,
			in_date: formattedDate,
			servp_id: empId,
            createdby: role
        };

		const formdataAvailvility = {
			date: formattedDate,
			emp_id: empId,
			leaveDay: leaveDay?.value,
			half: half ? half?.value : null,
			label: leaveDay?.label
		  }
        const apiUrl = `${API_URL}/attendance/service-provider/leave`;

        try {
            const response = await axios.post(apiUrl, formData);
            if (response.status === 200) {
				const response2 = await axios.post(`${API_URL}/api/add-leave`, formdataAvailvility)
				if (response2.status === 200) {
                toggleModal();
                Swal.fire('Successfully!', response.data.message, 'success');
                dispatch(ServiceProviderAttendancaAction());
			 }
            } else {
                Swal.fire({ title: 'Failed to add, try again', icon: "error" });
            }
			setIsLoading(false)
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({ title: 'An error occurred', icon: "error" });
			setIsLoading(false)
        }
    };

	const DayLeave = [
		{ label: 'Full day Leave', value: '1' },
		{ label: 'Half Day Leave', value: '2'},
        {
            label: 'Week Off',
            value: '3',
        },
		{
            label: 'Absent',
            value: '4',
        },
	  ]

	const HalfLeave = [
		{ label: 'First Half', value: '1' },
		{ label: 'Second Half', value: '2'}
	]

    return (
        <Modal className="modal-dialog-centered modal-lg" isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
                Add Leave
            </ModalHeader>
            <ModalBody>
                <Row>


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

					{/* <Col md={12}>
						<FormGroup>
						<Label for="first_name">Leave Type <span style={{color: "red"}}>*</span></Label>
						<SelectBox options={allType} setSelcted={setType} initialValue={type} />
							{errors?.type && (
						<span className='validationError'>
							{errors?.type}
						</span>
					)}
				
						</FormGroup>
					</Col> */}

                    <Col xs={12}>
					<FormGroup>
					<Label for="first_name">Reason for Leave<span style={{color: "red"}}>*</span></Label>
                            <Input
                                type="textarea"
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-100"
								rows="6"
                                placeholder="Write your reason..."
                            />
							{errors?.message && (
								<span className='validationError'>
									{errors?.message}
								</span>
							)}
							</FormGroup>
					</Col>
					<Col xs={12}> 
                        <div className="d-flex justify-content-end">
                            <Button color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}
							disabled={isLoading}
							>
                                Save
                            </Button>
                            <Button color="danger" onClick={toggleModal}>
                                Close
                            </Button>
                        </div>
				    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};