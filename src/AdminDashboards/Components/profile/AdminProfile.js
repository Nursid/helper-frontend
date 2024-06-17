import { Card, CardBody, Col, Row } from 'reactstrap'
import { Fragment } from 'react';
import AdminHeader from '../AdminHeader';

import React from 'react'
import { useLocation } from 'react-router-dom';


const AdminProfile = ()=>{
    const location = useLocation();
    const { currentUser } = location.state || {};

    console.log("currentUser----",currentUser)

    return (
     
         <Fragment>
            <AdminHeader />

            <div className='container'>
            <Row>
            <Col xs={12} lg={12} xl={12} >
                    <Card className='mt-2'>
                        <CardBody className="text-center">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid />
                           
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12} lg={6} xl={6} >
                    <div className='mt-2 py-2'>
                       
                            <div className='pl-2 pt-2 pr-2 pb-2'>
                                <Row>
                                    <Col sm="6">
                                        <h5>Department Name</h5>
                                    </Col>
                                    <Col sm="6">
                                        <p className="text-danger">Office</p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm="6">
                                        <h5>Full Name</h5>
                                    </Col>
                                    <Col sm="6">
                                        <p className="text">{currentUser?.name ? currentUser?.name : "NA"} </p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                               <Col sm="6">
                                   <h5>Mobile No</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.mobile_no ? currentUser?.mobile_no : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Aadhaar No</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.aadhar_no ? currentUser?.aadhar_no : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Joining Date</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.doj ? currentUser?.doj : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Address</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.address ? currentUser?.address : "NA"}</p>
                               </Col>
                           </Row>
                           <hr/>
                           <Row>
                               <Col sm="6">
                                   <h5>About</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.about ? currentUser?.about : "NA"}</p>
                               </Col>
                           </Row>
                            </div>
                        
                            </div>
                </Col>

                <Col xs={12} lg={6} xl={6} >
                    <div className="mt-2 py-2">
                       
                       <div className='pl-2 pt-2 pr-2 pb-2'>
                           <Row>
                               <Col sm="6">
                                   <h5>Designation Name</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text-danger">{currentUser?.designation?.name ? currentUser?.designation?.name : "NA"} </p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Refrance Name </h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.ref ? currentUser?.ref: "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                          
                           <Row>
                               <Col sm="6">
                                   <h5>Email</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.email ? currentUser?.email : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Pan No. </h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{currentUser?.pan_no ? currentUser?.pan_no : "NA" }</p>
                               </Col>
                           </Row>
                       </div>
                       </div>
                </Col>
                
            </Row>
            </div>
        </Fragment>
    )
}

export default AdminProfile;