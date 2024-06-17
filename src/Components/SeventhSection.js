import React from 'react'
import Slider from "react-slick";

const SeventhSection = ({reqrem}) => {

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
        <div className={`text-center p-4 d-none d-sm-none d-md-none d-lg-block ${reqrem}`}>
            <h1  >Our Service Provider Team</h1>
            <Slider {...settings} >
                <div className='py-5'>
                    <div className="d-flex justify-content-evenly gap-2">
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                    </div>
                </div>
                <div className='py-5 mx-2'>
                    <div className="d-flex justify-content-evenly gap-2">
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                    </div>
                </div>
                <div className='py-5'>
                    <div className="d-flex justify-content-evenly gap-2">
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_5.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                        <div className='border-0 '>
                            <img className='rounded-circle p-2' width={200} height={200} src='https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/team_1_1.jpg' alt="" />
                            {/* <h5>Singh ji</h5> */}
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default SeventhSection