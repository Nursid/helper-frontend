import { Card, CardBody, Col, Row } from 'reactstrap'
import { Fragment, useState } from 'react';
import AdminHeader from '../AdminHeader';
import ModalComponent from '../../Elements/ModalComponent';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import AdminAddEmployeeForm from '../ManageHr/Forms/AdminAddEmployeeForm';
import { IMG_URL } from '../../../config';
import AdminAddServiceProvider from '../ManageHr/Forms/AdminAddServiceProvider';
import { useUserRoleContext } from '../../../Context/RolesContext';
import ResetPassword from './ResetPassword';

const AdminProfile = ()=>{
    const location = useLocation();
    const { currentUser } = location.state || {};
    const { userRole } = useUserRoleContext();
    const [showModal, setShowModal] = useState(false);
   
    const [data, SetData] = useState(currentUser)

    const toggleEditMode = ()=> {
        setShowModal(!showModal);
    }

    return (
     
         <Fragment>

    {userRole?.role ==="super" &&     <ModalComponent
            
            data= {<ResetPassword  toggle={toggleEditMode}/>}
            modalTitle="Edit Profile"
            modal={showModal}
            toggle={toggleEditMode}
            size="md"
            scrollable={false}
        />
}
            <AdminHeader />

            <div className='container'>
            <Row>
            <Col xs={12} lg={12} xl={12} >
                    <Card className='mt-2'>
                        <CardBody className="text-center">
                            <div class="w-80 h-80 rounded-circle">
                            <img
                               class="rounded-circle mb-3"
                                src={ data?.image ? IMG_URL+data?.image : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' , height: "150px" }}
                                fluid />
                                </div>
                                  </CardBody>
                                  <Button  onClick={(e)=>{toggleEditMode()}} variant='contained' color='primary' style={{width: "150px"}}><BorderColorIcon /></Button>
                      
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
                                        <p className="text">{data?.name ? data?.name : "NA"} </p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                               <Col sm="6">
                                   <h5>Mobile No</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.mobile_no ? data?.mobile_no : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Aadhaar No</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.aadhar_no ? data?.aadhar_no : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Joining Date</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.doj ? data?.doj : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Address</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.address ? data?.address : "NA"}</p>
                               </Col>
                           </Row>
                           <hr/>
                           <Row>
                               <Col sm="6">
                                   <h5>About</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.about ? data?.about : "NA"}</p>
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
                                   <p className="text-danger">{data?.designation?.name ? data?.designation?.name : "NA"} </p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Refrance Name </h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.ref ? data?.ref: "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                          
                           <Row>
                               <Col sm="6">
                                   <h5>Email</h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.email ? data?.email : "NA"}</p>
                               </Col>
                           </Row>
                           <hr />
                           <Row>
                               <Col sm="6">
                                   <h5>Pan No. </h5>
                               </Col>
                               <Col sm="6">
                                   <p className="text">{data?.pan_no ? data?.pan_no : "NA" }</p>
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