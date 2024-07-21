import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import ServicesSlider from '../Components/ServicesSlider'
import FirstSection from '../Components/FirstSection'
import SecondSection from '../Components/SecondSection'
import ThirdSection from '../Components/ThirdSection'
import FourthSections from '../Components/FourthSections'
import FifthSection from '../Components/FifthSection'
import SixthSection from '../Components/SixthSection'
import Footer from '../Components/Footer'
import PlumberBanner from '../assets/img/PlumberBanner.jpg'
import CarWashingBanner from '../assets/img/CarWashingBanner.jpg'
import SalonBanner from '../assets/img/SalonBanner.jpg'
import ElectricBanner from '../assets/img/ElectricBanner.jpg'
import { Button, Offcanvas } from 'react-bootstrap'
import { Col, Row } from 'reactstrap'
import { BsFillTelephoneFill, BsWhatsapp, BsFacebook } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllServices } from '../Store/Actions/Dashboard/servicesAction'

const LandingPage = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const images = [
    CarWashingBanner,
    ElectricBanner,
    PlumberBanner,
    SalonBanner
  ];

  const phoneNumber = '7290900835'; // Replace with the actual phone number
  const whatsappWebURL = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
  const handleButtonClick = () => {
    window.open(whatsappWebURL, '_blank');
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  useEffect(() => {
    // Function to handle the timer
    const timer = setInterval(() => {
      // Increment the current image index
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the image every 5 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [images.length]); // Include images.length in the dependency array


  const { data } = useSelector(state => state.GetAllServicesReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetAllServices());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Header />
      <Button href='https://www.facebook.com/mytotal.helper?ref=br_rs' target='_blank' variant="primary" className="me-2 floating-buttonT">
        <BsFacebook color='#0777ff' size={25} />
      </Button>

      <Button onClick={handleButtonClick} variant="primary" className="me-2 floating-buttonS">
        <BsWhatsapp color='#00e6a1' size={25} />
      </Button>

      <Button variant="primary" onClick={handleShow} className="me-2 floating-button">
        {/* <PermPhoneMsgIcon style={{ fontSize: 'larger' }} /> */}
        <BsFillTelephoneFill size={25} />
      </Button>

      <Offcanvas className='bg-light' placement={'end'} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <Row>
            <Col sm={12} xl='12'>
              <div className="Enquiry container text-center">
                <b><h2 className='txtColour font-weight-bold p-1' >Enquiry Form</h2> </b>
                <form className="pb-2 px-2" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                      type="number"
                      id="mobileNo"
                      name="mobileNo"
                      placeholder="Enter Mobile Number"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="services">Services looking for:</label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      placeholder="Please enter the service you are looking for."
                      value={formData?.service}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description (Please specify):</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter Description"
                      rows="5"
                      value={formData?.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      rows="5"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="refName">Referance By</label>
                    <input
                      id="refName"
                      name="refName"
                      placeholder="Enter refName"
                      rows="5"
                      value={formData?.refName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      <section>
        <div
          style={{
            backgroundImage: `linear-gradient(62deg, #14257289 100%, #eedb30a8 0%), url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start'
          }}
          className="container-fluid">
          {/* <!-- --Tittle-- --> */}
          <FirstSection />
        </div>
      </section >
      <section>
        <div style={{ background: '#3d5ce8' }} className="container-fluid ">
          {/* <!-- --Tittle-- --> */}
          <ServicesSlider />
        </div>
      </section >
      <section>
        <div  className="container-fluid ">
          {/* <!-- --Tittle-- --> */}
          <SecondSection data={data} />
        </div>
      </section >
      <section>
        <div className="container-fluid bgFirstSectionImg ">
          {/* <!-- --Tittle-- --> */}
          <ThirdSection />
        </div>
      </section >
      <section>
        <div className="container-fluid">
          {/* <!-- --Tittle-- --> */}
          <FourthSections />
        </div>
      </section >
      <section>
        <div className="container-fluid bgFifthSectionImg">
          {/* <!-- --Tittle-- --> */}
          <FifthSection />
        </div>
      </section >
      <section>
        <div className="container-fluid bgSixthSectionImg ">
          {/* <!-- --Tittle-- --> */}
          <SixthSection />
        </div>
      </section >
      <section>
        <div className="container-fluid">
          {/* <!-- --Tittle-- --> */}
          <Footer paddingForm={'paddingForm'} reqrem={'reqremFor'} />
        </div>
      </section >
    </>
  )
}

export default LandingPage