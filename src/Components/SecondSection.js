import React from 'react';
import Card from 'react-bootstrap/Card';
import WomenSalon from '../assets/img/BeautySalon.png';
import AcService from '../assets/img/AcRepair.png'
import PlumberService from '../assets/img/PlumberServices.png'
import Electrician from '../assets/img/ElectricianServices.png'
import CarWashing from '../assets/img/CarService.png'
import CarServicing from '../assets/img/CarServicing.png'
import TravelDriver from '../assets/img/Travel&Driver.png'
import SecurityGuard from '../assets/img/SecurityGuard.png'
import Medicine from '../assets/img/Medicine.png'
import Doctors from '../assets/img/Doctors.png'
import DayTodaySupply from '../assets/img/DayTodaySupply.png'
import ResturantService from '../assets/img/ResturantService.png'
import InteriorDesigner from '../assets/img/InteriorDesigner.png'
import Catering from '../assets/img/Catering.png'
import MarriageLawn from '../assets/img/MarriageLawn.png'
import Nurses from '../assets/img/Nurses.png'
import { useNavigate } from 'react-router';
import { Col, Row } from 'reactstrap';
import { API_URL } from '../config';
import { Typography } from '@mui/material';
import { useService } from '../Store/context/serviceProvider';
const SecondSection = ({ data }) => {

    const navigate = useNavigate()
    const { setItems } = useService();

    const PrimaryServices = [
        {
            id: 1,
            image: PlumberService,
            serviceName: 'Plumber',
            description: 'Professional plumbing services for residential and commercial properties, including repairs, installations, and maintenance. Our experienced plumbers are available 24/7 to handle emergencies such as leaks, clogs, and burst pipes. We also offer routine services like faucet installations, water heater maintenance, and sewer line inspections. Trust us for reliable, efficient, and cost-effective plumbing solutions.'
        },
        {
            id: 2,
            image: CarServicing,
            serviceName: 'Car Servicing',
            description: 'Comprehensive car servicing and maintenance, including oil changes, tire rotations, and diagnostics. Our certified mechanics use the latest technology to ensure your vehicle runs smoothly and efficiently. Services also include brake repairs, engine tuning, battery replacement, and full-service inspections. We provide detailed reports and use quality parts to keep your car in top condition.'
        },
        {
            id: 3,
            image: TravelDriver,
            serviceName: 'Travel & Driver',
            description: 'Reliable travel and driver services for personal and business trips, ensuring safe and comfortable journeys. Our professional drivers are well-versed with local routes and traffic regulations, offering you a stress-free travel experience. Services include airport transfers, city tours, long-distance travel, and chauffeur services for events. We prioritize punctuality, safety, and customer satisfaction.'
        },
        {
            id: 4,
            image: SecurityGuard,
            serviceName: 'Security Guard',
            description: 'Trained security guards for residential, commercial, and event security, ensuring safety and peace of mind. Our security personnel are equipped to handle a variety of situations, from routine surveillance to emergency response. We offer customized security solutions, including access control, patrolling, CCTV monitoring, and crowd management. Trust our guards to protect your property and people.'
        },
        {
            id: 5,
            image: Doctors,
            serviceName: 'Doctor',
            description: 'Qualified medical professionals providing general and specialized healthcare services for all ages. Our doctors are experts in their fields, offering consultations, diagnostics, and treatments for a wide range of conditions. Services include routine check-ups, chronic disease management, pediatric care, and specialist referrals. We are committed to providing compassionate, patient-centered care.'
        },
        {
            id: 6,
            image: Medicine,
            serviceName: 'Medicine',
            description: 'Wide range of pharmaceutical products and medications, including prescription and over-the-counter drugs. Our pharmacy stocks the latest medications and health products, ensuring you get what you need for your health and well-being. We also offer medication counseling, prescription refills, and health screenings. Trust us for accurate, reliable, and timely pharmaceutical services.'
        },
        {
            id: 7,
            image: DayTodaySupply,
            serviceName: 'Day to Day Supply',
            description: 'Essential daily supplies and groceries delivered to your doorstep, ensuring convenience and quality. We offer a wide selection of fresh produce, dairy products, household items, and personal care products. Our delivery service is fast and reliable, with flexible scheduling to fit your needs. Enjoy hassle-free shopping from the comfort of your home with our comprehensive supply services.'
        },
        {
            id: 8,
            image: ResturantService,
            serviceName: 'Restaurants',
            description: 'Variety of dining options, from fast food to fine dining, offering delicious meals and excellent service. Our restaurants cater to all tastes and preferences, with diverse menus featuring local and international cuisine. Whether you are looking for a quick bite or a leisurely meal, our establishments provide a welcoming atmosphere and top-notch service. Experience culinary delight with every visit.'
        },
        {
            id: 9,
            image: Nurses,
            serviceName: 'Nurses',
            description: 'Professional nursing services for home care, hospitals, and clinics, providing compassionate and skilled care. Our nurses are highly trained and experienced in a range of healthcare needs, from post-surgery care to chronic illness management. Services include wound care, medication administration, vital signs monitoring, and patient education. We focus on promoting health, healing, and comfort.'
        },
        {
            id: 10,
            image: InteriorDesigner,
            serviceName: 'Interior Designer',
            description: 'Creative and professional interior design services to transform your spaces into beautiful and functional environments. Our designers work closely with clients to understand their vision and preferences, offering personalized design solutions. Services include space planning, color consultation, furniture selection, and decor styling. We strive to create spaces that reflect your style and enhance your living or working experience.'
        },
        {
            id: 11,
            image: Catering,
            serviceName: 'Catering',
            description: 'Catering services for events, parties, and gatherings, offering a variety of cuisines and customized menus. Our catering team is dedicated to providing delicious food and impeccable service for all types of events, from intimate dinners to large banquets. We offer menu planning, food preparation, delivery, and on-site service. Let us handle the food so you can enjoy your event to the fullest.'
        },
        {
            id: 12,
            image: MarriageLawn,
            serviceName: 'Marriage Lawn',
            description: 'Beautifully landscaped marriage lawns for weddings and special occasions, providing a perfect venue for your celebrations. Our lawns offer ample space, stunning views, and all the amenities needed for a memorable event. Services include event planning, decoration, catering, and entertainment arrangements. Create unforgettable memories in our picturesque and well-equipped marriage lawns.'
        }
        
    ];

 
        const handleServiceSubmit = (id) => {
            setItems(id);
            navigate('/ServicePage');
        };
   


    return (
        <div id='services' className="bgColour text-center pt-3 pb-4">
            <div className="text-center pb-3">
                <Typography variant='h4' sx={{ color: '#142572' }} fontWeight={800}>Our Services</Typography>
                <Typography variant='h6' fontWeight={700} className='sketchFamily'>Get our services at minimum cost in a required time at the best deal possible with granted good work.</Typography>
            </div>
            <div className='bgColour'>
                <div className="bgSecondSectionImg">
                    <Row className="g-4 pb-4">
                        {/* {data.data && data.data.map((item, index) => (
                            <Col xs={6} md={6} lg={data.data && data.data.length >= 5 ? 2 : 4} xl={data.data && data.data.length >= 5 ? 2 : 4} style={{ maxWidth: '100%' }} key={index}>
                                <Card className='p-2 cardHover' onClick={() => HandleServiceSubmit(item.serviceName)} style={{ height: '16rem' }}>
                                    <div className="border">
                                        <img className='w-100' height={150} src={API_URL + "/uploads/" + item.icon} />
                                        <Card.Body>
                                            <Card.Title>{item.serviceName}</Card.Title>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))} */}
                        {PrimaryServices.map((item, index) => (
                            <Col xs={6} md={6} lg={2} xl={2} style={{ maxWidth: '100%' }} key={index}>
                                <Card className='p-2 cardHover' onClick={() => handleServiceSubmit(item.id)} style={{ height: '16rem' }}>
                                    <div className="border">
                                        <img className='w-100' height={150} src={item.image} />
                                        <Card.Body>
                                            <Card.Title className='sketchFamily'>{item.serviceName}</Card.Title>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default SecondSection;
