import React, {useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import {Button, Col, Row} from 'reactstrap';
import Card from 'react-bootstrap/Card';
import PlumberBanner from '../../assets/img/PlumberBanner.jpg'
import CarWashingBanner from '../../assets/img/CarWashingBanner.jpg'
import SalonBanner from '../../assets/img/SalonBanner.jpg'
import ElectricBanner from '../../assets/img/ElectricBanner.jpg'
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {GetSearchServices} from '../../Store/Actions/LandingPage/SearchAction';
import {BounceLoader} from 'react-spinners';
import {API_URL} from '../../config';
import {ServeiceRequestModal} from '../../Components/Modal';

const ServicePage = () => {

	const location = useLocation()

	const qureyParmas = new URLSearchParams(location.search)
	const serviceName = qureyParmas.get('serviceName')

    const items = location.state;

    console.log("items--",items)

	const [serveRequestModalOpen, setserveRequestModalOpen] = useState(false)

	const search = {
		serviceName: serviceName
	}

	// State variables
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	// const [requestDone, setRequestDone] = useState(false);

	const getSearchData = useSelector(state => state.GetSearchReducer)

	const dispatch = useDispatch()

	// Array of images for the slideshow
	const images = [PlumberBanner, CarWashingBanner, SalonBanner, ElectricBanner];

	useEffect(() => { // Function to handle the timer
		const timer = setInterval(() => { // Increment the current image index
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);
		// Change the image every 5 seconds

		// Cleanup the timer when the component is unmounted
		return() => clearInterval(timer);
	}, [images.length, currentImageIndex]);

	useEffect(() => {
		dispatch(GetSearchServices(search))
	}, [])

	return(getSearchData && getSearchData?.data ? <>
		<Navbar/>
		<Card>
			<Header/>
			<div className="container-fluid">
				<div class="row" style={{padding: 0, margin: 0}}>
					<div className="col-md-4" data-wow-delay=".3s"
						style={
							{
								visibility: 'visible',
								animationDelay: '0.3s',
								animationName: 'fadeInLeft',
                                padding: 0
							}
					}>
                        <img src={items?.image} alt="Engineer Visit"/>
					</div>
					<div class="col-md-8 service-content ">
						<div class="content w-100">
							<div class="icon">
								<img src="https://ninjaac.in/wp-content/uploads/2020/03/icon1.png" alt="Engineer Visit"/></div>
							<h2> {items?.serviceName}</h2>
							<p>{items?.description}</p>
						</div>
					</div>
				</div>
			</div>
		</Card>

		{/* {
		getSearchData && getSearchData?.data ? getSearchData?.data.map((item, index) => (
			<section>
				<ServeiceRequestModal serveRequestModalOpen={serveRequestModalOpen}
					serveRequestModalOpenfunction={
						() => setserveRequestModalOpen(!serveRequestModalOpen)
					}/>
				<div className="container-fluid">
					<Row>
						<Col xl={6}
							style={
								{background: '#3d5ce8'}
							}
							className='p-5 text-center'>
							<h2 style={
								{color: '#eedc30'}
							}>
								<em>{
									item.serviceName
								}</em>
							</h2>
							<div className='text-white border'
								style={
									{
										display: 'grid',
										placeItems: 'center',
										height: '300px'
									}
							}>
								<p>"We provide the best facial services ever, and we highly recommend trying it once to experience our affordable and convenient at-home service."</p>
								<Button onClick={
									() => setserveRequestModalOpen(!serveRequestModalOpen)
								}>Service Request</Button>
							</div>
						</Col>
						<Col xl={6}
							className='p-0'>
							<img className='w-100 ServiceBannerS'
								src={
									API_URL + "/uploads/" + item.image
								}
								alt=""/>
						</Col>
					</Row>
				</div>
			</section>
		)) : null
	} */}


		{/* Slider section */}
		{/* <section>
                    <div style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/492/842/325/sparkle-wallpaper-preview.jpg)' }} className="container-fluid bgSeventhSectionImg">
                        <OfferSlider />
                    </div>
                </section> */}

		<section> {/* Footer section */}
			<div className="container-fluid">
				<Footer hide={'hide'}/>
			</div>
		</section>
	</> : <BounceLoader loading='true'/>);
};

export default ServicePage;
