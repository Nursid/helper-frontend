import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/svg/we_logo.png";
import Swal from "sweetalert2";
import { NavDropdown } from "react-bootstrap";
import { UseStateManager } from "../Context/StateManageContext";
import { LoginModal, SingupModal } from "./Modal";
import { useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import { BsFillTelephoneFill } from "react-icons/bs";

function Header() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("customer"))
  );

  const LoginResult = useSelector((pre) => pre.GetLogInReducers);
  const { LoginOpen, setLoginOpen } = UseStateManager();

  const GetLogOut = () => {
    sessionStorage.removeItem("customer");
    setCurrentUser(null);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  useEffect(() => {
    if (LoginResult.isSuccess === true) {
      setLoginOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setCurrentUser(JSON.parse(sessionStorage.getItem("customer")));
    } else if (LoginResult.isSuccess === false) {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Ooops ! Log In failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [LoginResult.isSuccess, setLoginOpen]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Navbar className="bgColour" expand="lg">
      <Container fluid>
        <Navbar.Brand className="animate__animated animate__flipInY">
          <img src={Logo} alt="MainLogo" onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);  // Scroll to the top
            }}   style={{ cursor: 'pointer' }}/>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav
            // style={{ marginLeft: '200px' }}
            className="ml-auto my-2 my-lg-0 text-center"
          >
            {/* <Nav.Link className='txtColour' href='#action1'>Register As A Professional</Nav.Link> */}
            <Nav.Link className="txtColour">
            <span 
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);  // Scroll to the top
            }} 
            className='text-reset' style={{ cursor: 'pointer' }}>
                <b>HOME</b>
            </span>
            </Nav.Link>

            

            
            {/* <div className="mega-menu d-none d-md-block bgColour">
                            <Nav.Link className='txtColour' sx={{ pt: 1 }} onClick={toggleMenu}>
                                <b>SERVICES</b>
                                <ArrowDropDownIcon />
                            </Nav.Link>
                            {menuOpen && (
                                <Paper sx={{ position: 'absolute', zIndex: '1200', width: '900px', top: '65px', right: '20%' }} className="dropdown-content animate__animated animate__flipInX">
                        
                                    <Grid container className='bgColour rounded shadow-lg' sx={{ border: '10px double blue' }} spacing={2}>
                                        <Grid item xs={3} className="column">
                                            <div className="d-flex flex-column text-left m-2 p-3 gap-2">
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Plumber`}><Typography color={'#000'} variant='subtitle1'>Plumber</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Car Servicing`}><Typography color={'#000'} variant='subtitle1'>Car Servicing</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Travel & Driver`}><Typography color={'#000'} variant='subtitle1'>Travel & Driver</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Security Guard`}><Typography color={'#000'} variant='subtitle1'>Security Guard</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Doctor`}><Typography color={'#000'} variant='subtitle1'>Doctor</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Medicine`}><Typography color={'#000'} variant='subtitle1'>Medicine</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Day to Day Supply`}><Typography color={'#000'} variant='subtitle1'>Day to Day Supply</Typography></Link>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} className="column">
                                            <div className='d-flex flex-column text-left m-2 p-3 gap-2'>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Restaurants`}><Typography color={'#000'} variant='subtitle1'>Restaurants</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Nurses`}><Typography color={'#000'} variant='subtitle1'>Nurses</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Interior Designer`}><Typography color={'#000'} variant='subtitle1'>Interior Designer</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Catering`}><Typography color={'#000'} variant='subtitle1'>Catering</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} className='text-nowrap' to={`/ServicePage?serviceName=Marriage Lawn`}><Typography color={'#000'} variant='subtitle1'>Marriage Lawn</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 1`}><Typography color={'#000'} variant='subtitle1'>Service 1</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 2`}><Typography color={'#000'} variant='subtitle1'>Service 2</Typography></Link>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} className="column">
                                            <div className="d-flex flex-column text-left m-2 p-3 gap-2">
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 3`}><Typography color={'#000'} variant='subtitle1'>Service 3</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 4`}><Typography color={'#000'} variant='subtitle1'>Service 4</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 5`}><Typography color={'#000'} variant='subtitle1'>Service 5</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 6`}><Typography color={'#000'} variant='subtitle1'>Service 6</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 7`}><Typography color={'#000'} variant='subtitle1'>Service 7</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 8`}><Typography color={'#000'} variant='subtitle1'>Service 8</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 9`}><Typography color={'#000'} variant='subtitle1'>Service 9</Typography></Link>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} className="column">
                                            <div className="d-flex flex-column text-left m-2 p-3 gap-2">
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 3`}><Typography color={'#000'} variant='subtitle1'>Service 10</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 4`}><Typography color={'#000'} variant='subtitle1'>Service 11</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 5`}><Typography color={'#000'} variant='subtitle1'>Service 12</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 6`}><Typography color={'#000'} variant='subtitle1'>Service 13</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 7`}><Typography color={'#000'} variant='subtitle1'>Service 14</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 8`}><Typography color={'#000'} variant='subtitle1'>Service 15</Typography></Link>
                                                <Link style={{ textDecoration: 'none' }} to={`/ServicePage?serviceName=Service 9`}><Typography color={'#000'} variant='subtitle1'>Service 16</Typography></Link>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )}
                        </div> */}
            <Nav.Link className="txtColour">
              <span 
              onClick={() => {
                navigate('/About-Us');
                window.scrollTo(0, 0);  // Scroll to the top
            }} 
            className='text-reset' style={{ cursor: 'pointer' }}>
                <b>ABOUT US</b>
            </span>
            </Nav.Link>
            {/* <Nav.Link className='txtColour' href='/'><b>Services</b></Nav.Link> */}
            {/* <Nav.Link className='txtColour' href='/Contact-Us'><b>Help</b></Nav.Link> */}
            {currentUser !== null ? (
              
              <>
                <Nav.Link
                  className="txtColour"
                >
                  <span 
              onClick={() => {
                navigate('/YourProfile');
                window.scrollTo(0, 0);  // Scroll to the top
            }} 
            style={{ cursor: 'pointer' }}>
                {currentUser.name}
            </span>
                  
                </Nav.Link>
                <Nav.Link className="txtColour">
                  <Logout className="cursor-p" onClick={() => GetLogOut()} />
                </Nav.Link>
              </>

            ) : (
              <>
                <NavDropdown
                  className="font-weight-bold txtColour  "
                  title="LOGIN"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => setLoginOpen(!LoginOpen)}
                    eventKey="4.1"
                  >
                    Customer Login
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => navigate("/admin")}
                    eventKey="4.2"
                  >
                    Office Login
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          {/* <Nav.Link className='txtColour' href='/Contact-Us'><b>HELP</b></Nav.Link> */}
        </Navbar.Collapse>
        {/* <div
          style={{ border: "1px solid #4a59e4" }}
          className="bgColour d-flex align-items-center rounded-pill px-2 m-1 d-none d-md-block"
        >
          <BsFillTelephoneFill color="#4a59e4" />
          <Typography variant="caption">&nbsp;0522-4300589</Typography>
        </div> */}
      </Container>
      <LoginModal />
      <SingupModal />
    </Navbar>
  );
}

export default Header;
