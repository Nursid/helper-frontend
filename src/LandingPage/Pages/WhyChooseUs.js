import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Header from '../../Components/Header';
import Card from 'react-bootstrap/Card';
import Footer from '../../Components/Footer';

const WhyChooseUs = () => {
    // State to keep track of the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image URLs
    const images = [
        'https://img.freepik.com/free-photo/service-maintenance-worker-repairing_23-2149176719.jpg?w=1060&t=st=1686385486~exp=1686386086~hmac=789297921380da93418cf1fb9293e187296424dc91b85157789f83be61775c2a',
        'https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212221.jpg?w=1060&t=st=1686385526~exp=1686386126~hmac=08d758c7c32c6a5dc553a2016751f28f0edbc3567bfa48beaa74e54cac68072b',
        'https://img.freepik.com/free-photo/female-hairdresser-using-hairbrush-hair-dryer_329181-1929.jpg?w=1060&t=st=1686385570~exp=1686386170~hmac=1df49504b9b4ea54e4047b2e1240dc5074712a66bd501940f09d09531eab10fd',
        'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-16352.jpg?w=1060&t=st=1686385727~exp=1686386327~hmac=20cc698313472fe69e35c41e9e5a27888b6e044722965226b7ab4aac649a2ea7',
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

            <section>
                <Header />

                {/* Hero section with a rotating background image */}
                <div
                    style={{
                        backgroundImage: `linear-gradient(62deg, #14257289 100%, #eedb30a8 0%), url(${images[currentImageIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '500px',
                    }}
                    className="container-fluid"
                >
                    <div className="container" style={{ display: 'grid', placeItems: 'center', height: '500px' }}>
                        <Card className="bg-transparent text-center ServiceBanner p-2">
                            <h1 className="display-3 font-weight-bold text-warning">Why Choose Us ?</h1>
                            <span className="text-white font-weight-bold">Home &#62; Why Choose Us</span>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="">
                <div className="container-fluid WhyChooseUsBanner">
                    <div className='p-5'>
                        <u><h1 className='py-2'>Why Choose Us ?</h1></u>
                        <p>1." DELIVERIING BEST QUALITY SERVICES, SECURING YOUR SMILE "</p>
                        <p>2. For we care! So that you have all your time in being more responsible for your people, and leave the rest to us for attending to!</p>
                        <p>3. We care for bringing you the best services at your doorstep – The moment you let us know about your concern; we make every effort to bring you the best and most enduring solutions at the comfort of your own home.</p>
                        <p>4. We care for saving your time – We understand that your time is the most precious to you! No sooner than your order is initiated, within moments we have the best solutions ready for your service.</p>
                        <p>5. We care for your decision to choose us to invest upon – The moment you zeroed upon us, that very moment we kept your value for money at the highest strata of our services. Optimum rates and best quality doesn’t just remain a wishful imagination from now on! For we bring both to you at paramount ease and convenience.</p>
                        <p>6. We care for the utmost trust you render on us – Our continued series of bringing you the best services kindles the trust in you even more strongly with every passing day!</p>
                        <p>7. We care to bring you the services minus the hassles involved – Our professionals being thoroughly equipped in understanding the concerns and quite adept with the places in and around the city, makes it really easy for you to receive the solutions with effortlessly!</p>
                        <p> 8. We care to have only the experts with verified expertise in the past to address you – Carefully scrutinized and chosen experts are what we entirely rely upon! All because you can avail their expertise fearlessl</p>
                    </div>

                    <div className="hero-section">
                        <div className="card-grid">
                            <div className=" whyCard card">
                                <div className="card__bg" style={{ backgroundImage: "url(https://news.euspert.com/wp-content/uploads/2018/12/pic-650x492.jpg)" }}></div>
                                <div className="card__content">
                                    <h3 className="card__heading">EXPERIENCED PROFESSIONALS</h3>
                                    <p className="card__category">Choose us always because we know our work well.</p>
                                </div>
                            </div>

                            <div className=" whyCard card">
                                <div className="card__bg" style={{ backgroundImage: "url(https://timeular.com/wp-content/uploads/2022/11/time-clock-work.jpg)" }}></div>
                                <div className="card__content">
                                    <h3 className="card__heading">FAST WORK</h3>
                                    <p className="card__category">We assure you recive very fast service and you get all the things done within no time.</p>
                                </div>
                            </div>

                            <div className=" whyCard card">
                                <div className="card__bg" style={{ backgroundImage: "url(https://img.freepik.com/free-vector/guarantee-best-quality-stamp_1017-7145.jpg?w=2000)" }}></div>
                                <div className="card__content">
                                    <p className="card__category">QUALITY GUARANTEE</p>
                                    <h3 className="card__heading">We guarantee you recived best services.</h3>
                                </div>
                            </div>

                            <div className=" whyCard card">
                                <div className="card__bg" style={{ backgroundImage: "url(https://fonolo.com/wp-content/uploads/2016/03/A-Guide-to-247-Customer-Service-1.jpg)" }}></div>
                                <div className="card__content">
                                    <h3 className="card__heading">12x7 SERVICE AVAILABLE</h3>
                                    <p className="card__category">We are 12*7 available to you and ready to help you out with your home appliances problem.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section>
                {/* Footer section */}
                <div className="container-fluid">
                    <Footer />
                </div>
            </section>
        </>
    );
};

export default WhyChooseUs;
