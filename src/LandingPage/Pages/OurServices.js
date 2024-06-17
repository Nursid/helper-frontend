import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import Header from '../../Components/Header';
import Card from 'react-bootstrap/Card';
import Footer from '../../Components/Footer';
import { TbAirConditioning } from "react-icons/tb";
import { MdContentCut, MdElectricBolt, MdLocalCarWash, MdPlumbing } from "react-icons/md";
import PlumberBanner from '../../assets/img/PlumberBanner.jpg'
import CarWashingBanner from '../../assets/img/CarWashingBanner.jpg'
import SalonBanner from '../../assets/img/SalonBanner.jpg'
import ElectricBanner from '../../assets/img/ElectricBanner.jpg'

const OurServices = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        PlumberBanner,
        CarWashingBanner,
        SalonBanner,
        ElectricBanner
    ];

    const Servicecards = [
        {
            headerClass: "one",
            iconClass: <MdContentCut size={85} />,
            title: "Barber SERVICES",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            btnClass: "one",
            btnText: "Request"
        },
        {
            headerClass: "two",
            iconClass: <TbAirConditioning size={85} />,
            title: " AC SERVICES",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            btnClass: "two",
            btnText: "Request"
        },
        {
            headerClass: "three",
            iconClass: <MdPlumbing size={85} />,
            title: "PLUMBER SERVICES",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            btnClass: "three",
            btnText: "Request"
        },
        {
            headerClass: "four",
            iconClass: <MdElectricBolt size={85} />,
            title: "Electric Services",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            btnClass: "four",
            btnText: "Request"
        },
        {
            headerClass: "four",
            iconClass: <MdLocalCarWash size={85} />,
            title: "CAR WASH SERVICES",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            btnClass: "four",
            btnText: "Request"
        }
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
                {/* Navbar section */}

                <Header />

                {/* Image slideshow section */}
                <div
                    style={{
                        backgroundImage: `linear-gradient(62deg, #14257289 100%, #eedb30a8 0%), url(${images[currentImageIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        width: '100%',
                        height: '110vh',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start'
                    }}
                    className="container-fluid"
                >
                    <div className="container" style={{ display: 'grid', placeItems: 'center', height: '500px' }}>
                        <Card className="bg-transparent text-center ServiceBanner p-2">
                            <h1 className='display-3 font-weight-bold text-warning'>Our All Services</h1>
                            <span className='text-white font-weight-bold'>Home &#62; Our All Services</span>
                        </Card>
                    </div>
                </div>
            </section>

            <section className='overServicesBanner'>
                {/* First service section */}
                <div className="container-fluid OurServiceCardflow">
                    {Servicecards.map((card, index) => (
                        <div className="card-wrap" key={index}>
                            <div className={`card-header text-white ${card.headerClass}`}>
                                {card.iconClass}
                            </div>
                            <div className="card-content">
                                <h1 className="card-title">{card.title}</h1>
                                <p className="card-text">{card.text}</p>
                                <button className={`card-btn ${card.btnClass}`}>{card.btnText}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                {/* Footer section */}
                <div className="container-fluid">
                    <Footer />
                </div>
            </section>
        </>
    )
}

export default OurServices