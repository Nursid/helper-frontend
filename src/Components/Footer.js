import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaFacebook, FaGoogle, FaHome, FaInstagram, FaLinkedinIn, FaPhone, FaPrint, FaTwitter } from "react-icons/fa";
import { Container } from 'react-bootstrap';
import FooterBannner from '../assets/img/FooterBanner.png'
import { BsCheckCircle, BsCircleFill } from "react-icons/bs";
import { IoMdSend, IoSend } from "react-icons/io";
import SeventhSection from './SeventhSection';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useService } from '../Store/context/serviceProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../config';
import {
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row
} from 'reactstrap'
import SelectBox from '../AdminDashboards/Elements/SelectBox';

const Footer = ({ hide, reqrem, paddingForm }) => {

    const [message, setMessage] = useState('');
    const [getAllService, setAllservices] = useState([])
    const [service, setService] = useState('')
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const navigate = useNavigate()
    const { setItems } = useService();


    const handleSendClick = () => {

        setMessage('');
    };

    const [formData, setFormData] = useState({
    name: '',
    email: '',
    refName: '', 
    mobileNo: '',
    message: '',
    address: '',
    service: ''
  });

  const handleKeyPress = (e) => {
    const charCode = e.which || e.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^[0-9]+$/.test(charStr)) {
        e.preventDefault();
        }
};

    const handleInputChange = (event, maxLength) => {
        const { name, value } = event.target;
        if (value.length <= maxLength) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = `${API_URL}/enquiry/register`;
		axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
                    setFormData([])
					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
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

    const ServicePage = (id) =>{
        console.log(id)
        setItems(id);
        navigate('/ServicePage');
    }

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
    const handleKeyPressName = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
        }
    };

    return (
        <footer style={{ background: '#3d5ce8' }} className={`text-center text-lg-start text-white ${paddingForm}`}>
            <div className={`footerform d-none d-sm-none d-md-none d-lg-block ${hide}`}>
                <Row>
                    <Col sm={12} xl='4' style={{ display: 'grid', placeItems: 'center' }}>
                        <div>
                            <img src={FooterBannner} className='img-fluid' alt="footerbanner" />
                        </div>
                    </Col>
                    <Col sm={12} xl='4' style={{ display: 'grid', placeItems: 'center' }}>
                        <div className='text-start pt-3'>
                            <h4 style={{ color: '#142572' }} >Newsletters</h4>
                            <h2 style={{ color: '#8d8d8d' }} >Get Our Every Single Notifications</h2>

                            <div style={{ color: '#8d8d8d' }}>
                                <div><BsCircleFill className='mr-2' fill='#eedc30' /> <span>Regular Updates</span></div>
                                <div><BsCheckCircle className='mr-2' /> <span>Regular Updates</span></div>
                                <form className='mt-2' id="emailForm">
                                    <div>
                                        <TextField
                                            label="Type your message"
                                            variant="outlined"
                                            fullWidth
                                            value={message}
                                            onChange={handleMessageChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            onClick={handleSendClick}
                                                        >
                                                            <IoMdSend size={30} />
                                                        </Button>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} xl='4'>
                        <div className="Enquiry text-center container animate__animated animate__backInRight">
                            <b><h2 className='txtColour font-weight-bold p-1' >Enquiry Form</h2> </b>
                            <form className="pb-2 px-2" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Full Name"
                                        value={formData?.name}
                                        onChange={(e) => handleInputChange(e, 50)}
                                        onKeyPress={handleKeyPressName}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile Number:</label>
                                    <input
                                        type="text"
                                        id="mobileNo"
                                        name="mobileNo"
                                        placeholder="Enter Mobile Number"
                                        value={formData?.mobileNo}
                                        onChange={(e) => handleInputChange(e, 10)}
                                        required
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="services">Services</label>
                                    <select
                                        name="service"
                                        value={formData?.service}
                                        onChange={(e) => handleInputChange(e, 50)}
                                        required
                                    >
                                         <option value="" disabled>Please select a service</option>
                                       {getAllService.map((service, index) => (
                                            <option key={index} value={service.label}>{service.label}</option>
                                        ))}
                                        </select>

                                </div>

                                {/* <Col md={12}>
					<FormGroup>
						<Label>Service Type</Label>
						<SelectBox options={getAllService}
							setSelcted={setService}
							selectOption={service}/>
					</FormGroup>
				</Col> */}
                                <div className="form-group">
                                    <label htmlFor="services">Referance By</label>
                                    <input
                                        type="text"
                                        id="refName"
                                        name="refName"
                                        placeholder="Please Referance Name"
                                        value={formData?.refName}
                                        onChange={(e) => handleInputChange(e, 50)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description (Please specify):</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter Description"
                                        rows="3"
                                        value={formData?.message}
                                        onChange={(e) => handleInputChange(e, 50)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
            <section>

                <SeventhSection reqrem={reqrem} />
            </section>
            <section style={{ marginTop: '5px' }} className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='https://www.facebook.com/mytotal.helper?ref=br_rs' className='mr-4 text-reset'>
                        <FaFacebook />
                    </a>
                    <a href='' className='mr-4 text-reset'>
                        <FaTwitter />
                    </a>
                    <a href='mailto:helperforyourservices@gmail.com' className='mr-4 text-reset'>
                        <FaGoogle />
                    </a>
                    <a href='' className='mr-4 text-reset'>
                        <FaInstagram />
                    </a>
                </div>
            </section>

            <section className=''>
                <Container className='text-center text-md-start mt-5'>
                    <Row className='mt-3'>
                        <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                {/* <FontAwesomeIcon icon={faGem} className="me-3" /> */}
                                About Helper
                            </h6>
                            <p className=''>
                                Linking businesses to customers, Providing all suitable opportunities to the service providers and entrepreneurs to expand their businesses, To cater to the daily needs of working couples who follow busy schedules by providing them.
                            </p>
                        </Col>

                        <Col md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
                            <p>
                                <p onClick={()=> ServicePage(1)} className='text-reset service-page-footer'>
                                    Electrician
                                </p>
                            </p>
                            <p>
                                <p  onClick={()=> ServicePage(2)} className='text-reset service-page-footer'>
                                    Plumber
                                </p>
                            </p>
                            <p>
                                <p onClick={()=> ServicePage(3)} className='text-reset service-page-footer'>
                                    Car Washing
                                </p>
                            </p>
                            <p>
                                <p onClick={()=> ServicePage(4)} className='text-reset service-page-footer'>
                                    Travels & Driver
                                </p>
                            </p>
                            <p>
                                <p  className='text-reset service-page-footer ' onClick={()=> ServicePage(5)}>
                                    Security Gaurd
                                </p>
                            </p>
                        </Col>

                        <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                         
                                <span 
                                 onClick={() => {
                                    navigate('/About-Us');
                                    window.scrollTo(0, 0);  // Scroll to the top
                                }} 
                                className='text-reset' style={{ cursor: 'pointer' }}>
                                    About Us
                                </span>
                            <p>
                                <span 
                                 onClick={() => {
                                    navigate('/Contact-Us');
                                    window.scrollTo(0, 0);  // Scroll to the top
                                }} 
                                className='text-reset' style={{ cursor: 'pointer' }}>
                                    Contact Us
                                </span>
                            </p>
                            <p>
                                <a href='#services' className='text-reset'>
                                    Services
                                </a>
                                
                                {/* <span 
                                 onClick={() => {
                                    navigate('/Contact-Us');
                                    window.scrollTo(0, 0);  // Scroll to the top
                                }} 
                                className='text-reset' style={{ cursor: 'pointer' }}>
                                    Contact Us
                                </span> */}
                            </p>
                            <p>
                                <span 
                                 onClick={() => {
                                    navigate('/Term-&-Condition');
                                    window.scrollTo(0, 0);  // Scroll to the top
                                }} 
                                className='text-reset' style={{ cursor: 'pointer' }}>
                                   Terms & Conditions
                                </span>
                            </p>
                            <p>
                                <span 
                                 onClick={() => {
                                    navigate('/Privacy-&-Policy');
                                    window.scrollTo(0, 0);  // Scroll to the top
                                }} 
                                className='text-reset' style={{ cursor: 'pointer' }}>
                                   Privacy Policy
                                </span>
                            </p>
                        </Col>

                        <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <FaHome className="mr-2" />
                                A/1412, Sector- I Ashiyana, LDA Colony Near
                                Pakripool, Lucknow, 226012, UP, India
                            </p>
                            <p className='d-none d-lg-none d-xl-block text-nowrap'>
                                <FaEnvelope className="mr-2" />
                                helperforyourservices@gmail.com
                            </p>
                            <p className=''>
                                <FaPhone className="mr-2" /> 0522-4300589
                            </p>
                            <p className=''>
                                <FaPhone className="mr-2" /> 0522-4330641
                            </p>
                            {/* <p>
                                <FaPrint className="me-3" /> + 01 234 567 89
                            </p> */}
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className='text-center p-2' style={{ backgroundColor: '#eedc30', color: '#142572' }}>
                <b>Copyright © 2019 - {new Date().getFullYear()} All rights reserved | Helper Services</b>
                <p>Designed & Developed By Trickle Solutions</p>
            </div>
        </footer>
    )
}

export default Footer