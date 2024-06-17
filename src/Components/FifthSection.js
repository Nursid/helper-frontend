import { Card, Typography } from '@mui/material';
import React from 'react'
import Slider from "react-slick";

const FifthSection = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Change this to 1 for mobile devices
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768, // Adjust this breakpoint according to your design
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // Adjust this breakpoint according to your design
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className='text-center p-4'>
            <Typography variant='h4' sx={{ color: '#eedc30' }} fontWeight={800}>Testimonial</Typography>
            <Slider {...settings} className=''>
                <div className='p-2'>
                    <Card style={{ border: '10px double #1c2575', textAlign: 'center', borderRadius:'10px' }}>
                        <h4 className='text-primary sketchFamily p-2'>“I got my AC repaired from them they are so good that they repaired my AC within a day and didn't charge any extra.”</h4>
                        <div className="d-flex justify-content-center ">
                            <center>
                                <img width={80} height={80} className='rounded-circle border' src="https://cdn5.vectorstock.com/i/1000x1000/91/79/indian-woman-face-avatar-cartoon-vector-25919179.jpg" alt="female" />
                                <h4>Tina Singh</h4>
                            </center>
                        </div>
                    </Card>
                </div>
                <div className='p-2'>
                    <Card style={{ border: '10px double #1c2575', textAlign: 'center', borderRadius:'10px' }}>
                        <h4 className='text-primary p-2 sketchFamily'>“I got my AC repaired from them they are so good that they repaired my AC within a day and didn't charge any extra.”</h4>
                        <div className="d-flex justify-content-center ">
                            <center>
                                <img width={80} height={80} className='rounded-circle border' src="https://cdn5.vectorstock.com/i/1000x1000/91/79/indian-woman-face-avatar-cartoon-vector-25919179.jpg" alt="female" />
                                <h4>Tina Singh</h4>
                            </center>
                        </div>
                    </Card>
                </div>
                <div className='p-2'>
                    <Card style={{ border: '10px double #1c2575', textAlign: 'center', borderRadius:'10px' }}>
                        <h4 className='text-primary p-2 sketchFamily'>“I got my AC repaired from them they are so good that they repaired my AC within a day and didn't charge any extra.”</h4>
                        <div className="d-flex justify-content-center ">
                            <center>
                                <img width={80} height={80} className='rounded-circle border' src="https://cdn5.vectorstock.com/i/1000x1000/91/79/indian-woman-face-avatar-cartoon-vector-25919179.jpg" alt="female" />
                                <h4>Tina Singh</h4>
                            </center>
                        </div>
                    </Card>
                </div>
                <div className='p-2'>
                    <Card style={{ border: '10px double #1c2575', textAlign: 'center', borderRadius:'10px' }}>
                        <h4 className='text-primary p-2 sketchFamily'>“I got my AC repaired from them they are so good that they repaired my AC within a day and didn't charge any extra.”</h4>
                        <div className="d-flex justify-content-center ">
                            <center>
                                <img width={80} height={80} className='rounded-circle border' src="https://cdn5.vectorstock.com/i/1000x1000/91/79/indian-woman-face-avatar-cartoon-vector-25919179.jpg" alt="female" />
                                <h4>Tina Singh</h4>
                            </center>
                        </div>
                    </Card>
                </div>
            </Slider>
        </div>
    )
}

export default FifthSection