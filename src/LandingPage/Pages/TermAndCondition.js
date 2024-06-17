import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Header from '../../Components/Header';
import Card from 'react-bootstrap/Card';
import Footer from '../../Components/Footer';
import PlumberBanner from '../../assets/img/PlumberBanner.jpg'
import CarWashingBanner from '../../assets/img/CarWashingBanner.jpg'
import SalonBanner from '../../assets/img/SalonBanner.jpg'
import ElectricBanner from '../../assets/img/ElectricBanner.jpg'
import { Col, Row } from 'reactstrap';

const TermAndCondition = () => {
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
        // Function to handle the timer
        const timer = setInterval(() => {
            // Increment the current image index
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change the image every 5 seconds

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
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '50vh',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    className="container-fluid"
                >
                    <div className="container" style={{ display: 'grid', placeItems: 'center', height: '500px' }}>
                        <Card className="bg-transparent text-center ServiceBanner p-2">
                            <h1 className="display-3 font-weight-bold text-warning">Term and Condition</h1>
                            <span className="text-white font-weight-bold">Home &#62; Term and Condition</span>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="">
                <div className="container-fluid">

                    <Row>
                        <Col className='p-0' xs={12}>

                            <div className='text-dark'>
                                <div style={{ background: '#eedc30' }} className='text-center p-3'>
                                    <h3><u>TERMS AND CONDITIONS</u></h3>
                                    <h6>Last Updated: 29thApril, 2022</h6>
                                </div>

                                <div className="px-4">
                                    <p className='py-2'>
                                        These terms and conditions (“Terms”) govern the use of services made available on or through https://www.mytotalhelper.com and/or the Helper Company mobile app (collectively, the “Platform”, and together with the services made available on or through the Platform, the “Services”). These Terms also include our privacy policy, available at https://www.mytotalhelper.com/privacy-policy (“Privacy Policy”), and any guidelines, additional, or supplemental terms, policies, and disclaimers made available or issued by us from time to time (“Supplemental Terms”). The Privacy Policy and the Supplemental Terms form an integral part of these Terms. In the event of a conflict between these Terms and the Supplemental Terms with respect to applicable Services, the Supplemental Terms will prevail.
                                    </p>
                                    <p className='py-2'>
                                        The Terms constitute a binding and enforceable legal contract between Total helper (a company incorporated under the Companies Act, 2013 with its registered address at A/1412, Sector- I Ashiyana, LDA Colony Near Pakripool Lucknow – 226012, UP, India, and you, a user of the Services, or any legal entity that books Pro Services (defined below) on behalf of end-users (“you” or “Customer”). By using the Services, you represent and warrant that you have full legal capacity and authority to agree to and bind yourself to these Terms. If you represent any other person, you confirm and represent that you have the necessary power and authority to bind such person to these Terms.
                                    </p>
                                    <p className='py-2'>
                                        By using the Services, you agree that you have read, understood, and are bound by, these Terms, as amended from time to time, and that you will comply with the requirements listed here. These Terms expressly supersede any prior written agreements with you. If you do not agree to these Terms, or comply with the requirements listed here, please do not use the Services.
                                    </p>
                                </div>
                            </div>

                        </Col>
                    </Row>

                </div>
            </section>
            <section style={{ background: '#4b5ced' }} >
                {/* Footer section */}
                <div className="container-fluid">
                    <Footer hide={'hide'} />
                </div>
            </section>
        </>
    );
};

export default TermAndCondition;
