import { Typography } from '@mui/material';
import React from 'react'
import { Card } from 'react-bootstrap';
import Slider from "react-slick";

const SixthSection = () => {

    const settings = {
        ddots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 0.4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div style={{ background: '#99DBF5', paddingTop: '5rem' }} className='text-center SixthSectionpadding d-none d-sm-none d-md-none d-lg-block'>
            <Typography variant='h3' className='txtColour' fontWeight={600}>Our Team</Typography>
            <Slider {...settings} className='text-center'>

                <div className='SixthSectionAwesome d-flex justify-content-around gap-2 py-2'>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>

                </div>
                <div className='SixthSectionAwesome d-flex justify-content-around gap-2 gap-2 py-2'>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>

                </div>
                <div className='SixthSectionAwesome d-flex justify-content-around gap-2 gap-2 py-2'>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>

                </div>
                <div className='SixthSectionAwesome d-flex justify-content-around gap-2 gap-2 py-2'>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>
                    <div>
                        <img style={{ width: '200px', height: '200px', borderRadius: '50%' }} src="https://static01.nyt.com/images/2014/04/19/your-money/19stewart/19stewart-superJumbo.jpg" />
                    </div>

                </div>
            </Slider>
        </div>
    )
}

export default SixthSection