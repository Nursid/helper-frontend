import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Header from '../../Components/Header';
import Card from 'react-bootstrap/Card';
import Footer from '../../Components/Footer';
import { Col, Row } from 'reactstrap';
import AboutUsImg from '../../assets/img/AboutUs.png';
import PlumberBanner from '../../assets/img/PlumberBanner.jpg'
import CarWashingBanner from '../../assets/img/CarWashingBanner.jpg'
import SalonBanner from '../../assets/img/SalonBanner.jpg'
import ElectricBanner from '../../assets/img/ElectricBanner.jpg'

const AboutUs = () => {
  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image URLs
  const images = [
    PlumberBanner,
    CarWashingBanner,
    SalonBanner,
    ElectricBanner
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <section>
        {/* Hero section with a rotating background image */}
        <div
          style={{
            backgroundImage: `linear-gradient(62deg, #14257289 100%, #eedb30a8 0%), url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            width: '100%',
            height: '50vh',
            backgroundColor: 'transparent',
            display:'flex',
            alignItems:'center'
          }}
          className="container-fluid"
        >
          <div className="container" style={{ display: 'grid', placeItems: 'center' }}>
            <Card className="bg-transparent text-center ServiceBanner p-2">
              <h1 className="display-3 font-weight-bold text-warning">About Us</h1>
              <span className="text-white font-weight-bold">Home &#62; About Us</span>
            </Card>
          </div>
        </div>
      </section>

      <section style={{ height: '100vh' }}>
        {/* Section with information about the company */}
        <div className="container-fluid aboutUsBanner">
          <Row>
            {/* Displaying an image on the left side */}
            <Col xl="6" style={{ display: 'grid', placeItems: 'center' }}>
              <img className="img-fluid" src={AboutUsImg} alt="" />
            </Col>
            {/* Displaying company description on the right side */}
            <Col xl="6" style={{ color: '#fff', display: 'grid', placeItems: 'center' }}>
              <div style={{ overflow: 'hidden' }} className="text-center">
                <h1 className="txtColour">About Us</h1>
                <h5>
                  Linking businesses to customers, Providing all suitable opportunities to the service providers and
                  entrepreneurs to expand their businesses, To cater to the daily needs of working couples who follow busy
                  schedules by providing them.
                </h5>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section style={{ background: '#4b5ced' }} >
        {/* Footer section */}
        <div className="container-fluid aboutUsPadding">
          <Footer paddingForm={'paddingForm'} reqrem={'reqremFor'} />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
