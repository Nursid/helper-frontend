import { Typography } from '@mui/material';
import React from 'react'
import { isMobile } from 'react-device-detect';
import { FiPhone, FiClock } from "react-icons/fi";
import { Col, Row } from 'reactstrap';

const Navbar = () => {
    return (
        <>
            <div className='Navbar'>
                <Row className='m-0'>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Typography variant={isMobile ? 'caption' : 'h6'} className='text-center px-2' >
                            <FiPhone /> <span> 0522-4300589</span>
                        </Typography>
                    </Col>
                    <Col xs={6} md={6} lg={6} xl={6}>
                        <Typography variant={isMobile ? 'caption' : 'h6'} className='text-center px-2' >
                            {isMobile ? <span> We are 24*7 available</span> : <span><FiClock /> Mon - Sun 12 Hours / We are 24*7 available</span>}
                        </Typography>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Navbar