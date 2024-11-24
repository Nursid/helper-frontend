import React, { Fragment, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap'
import "../AdminDashboard.css"
import { useAuth } from '../../Context/userAuthContext'
import { FiLogOut, FiUser } from 'react-icons/fi'
import Swal from 'sweetalert2'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom';
import AdminProfile from './profile/AdminProfile'
import { IMG_URL } from '../../config'
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminHeader = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const LogOutFuction = () => {
        sessionStorage.clear()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logout Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        setCurrentUser(null);
        navigate('/admin');
    }

   

    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    
    const handleProfileClick = () => {
        navigate('/admin/profile', { state: { currentUser } });
    };

    return (
        <Fragment>

            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src="https://mytotalhelper.com/webcss/images/logo.jpg" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <Dropdown className='ml-lg-auto px-2' isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle className='dropdownMenu-btn-header' >
                            <div id="drop-menu" className="AdminDash_UserInfo d-flex align-items-center">
                                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=".." />
                                <div className='mx-1'>
                                    <h6 className='d-none d-md-block'>{currentUser && currentUser.name ? currentUser.name : "yourName "}</h6>
                                    <small>{currentUser && currentUser.role ? currentUser.role : ""}</small>
                                </div>
                                <FaChevronDown />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className='dropDownMenu-header'>
                            <DropdownItem className='cursor-p hover-secondary w-100 h-100'><FiUser /> &nbsp;&nbsp; Profile</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => { LogOutFuction() }} className='cursor-p hover-secondary w-100 h-100'> <FiLogOut /> &nbsp;&nbsp; Log Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav> */}


            <div className='shadow border-bottom'>
                <Row>
                    <Col sm={6} lg={6} className={isMobile ? 'd-flex align-items-center justify-content-center' : 'd-flex align-items-center justify-content-start'}>
                        <div className="helperLogo">
                            <img width={'150px'} src="https://mytotalhelper.com/webcss/images/logo.jpg" alt="" />
                        </div>
                    </Col>

                    <Col sm={6} lg={6} className={isMobile ? 'd-flex justify-content-center' : 'd-flex justify-content-end'}>

                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle className='dropdownMenu-btn-header' >
                                <div id="drop-menu" className="AdminDash_UserInfo d-flex align-items-center justify-content-end   gap-3">
                                    <img width={'100px'} 
                                    src={ currentUser?.image ? IMG_URL+currentUser?.image : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                                    alt="" />
                                    <div className=''>
                                        <h6 className='d-none d-md-block'>{currentUser && currentUser.name ? currentUser.name : "yourName "}</h6>
                                        <small>
                                            
                                            {currentUser && currentUser.role ? currentUser.role : currentUser && currentUser.designation.name ? currentUser.designation.name : ""}
                                        
                                        
                                        
                                        </small>
                                    </div>
                                    <FaChevronDown />
                                </div>
                            </DropdownToggle>
                            <DropdownMenu className='dropDownMenu-header'>
                                <DropdownItem className='cursor-p hover-secondary w-100 h-100' onClick={handleProfileClick} ><FiUser /> &nbsp;&nbsp; Profile</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { LogOutFuction() }} className='cursor-p hover-secondary w-100 h-100'> <FiLogOut /> &nbsp;&nbsp; Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default AdminHeader