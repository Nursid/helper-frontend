import React from 'react'
import Slider from "react-slick";
import Card from 'react-bootstrap/Card';


const OfferSlider = () => {

    const bannerImages = [
        'https://s3-us-west-2.amazonaws.com/issuewireassets/primg/58523/summer-holiday1626857850.png',
        'https://s3-us-west-2.amazonaws.com/issuewireassets/primg/58523/summer-holiday1626857850.png',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, // Adjust as needed
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480, // Adjust as needed
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className='p-4 SixthSectionpadding text-center'>
            <h1 >Our Offers</h1>
            <Slider {...settings}>
                {bannerImages.map((image, index) => (
                    <div key={index}>
                        <img className='img-fluid' src={image} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default OfferSlider