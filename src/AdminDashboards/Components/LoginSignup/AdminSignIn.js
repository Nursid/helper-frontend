import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import HelperDash from "../../../assets/img/HelperDash.jpg";
import WeLogo from "../../../assets/img/we_logo.png";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../../Context/userAuthContext";
import { useState } from "react";
import { roles } from "../../../config";
import { Formik } from "formik";
import { useUserRoleContext } from "../../../Context/RolesContext";
import { isMobile } from "react-device-detect";
import { ScaleLoader } from "react-spinners";
import { UseStateManager } from "../../../Context/StateManageContext";
import { ForgetPasswordModal } from "../../../Components/Modal";
import Navbar from "../../../Components/Navbar";
import Header from "../../../Components/Header";
function AdminSignIn() {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState(roles.super);
  const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false)
  const { UserRoleCalled } = useUserRoleContext();
  const [loader, setLoader] = useState(false);
  const { timeRemaining, setTimeRemaining } = UseStateManager();
  const { currentUser, getUserLogIn, sendOtp, otpid, setOtpId } = useAuth();

  if (currentUser) {
    if (location.pathname === "/admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Outlet />;
  }

  // formdara
  const LoginData = {
    number: "",
  };

  const OnLoginSubmit = async (formdata, { resetForm }) => {
    sessionStorage.setItem("role", selectedRole);
    UserRoleCalled(selectedRole);

    getUserLogIn(formdata, selectedRole, otpid).then(() => {
      resetForm();
    });
  };

  //   sendOtp Function
  const handleSendOtp = async (number) => {
    setLoader(true);
    await sendOtp(number);
    setTimeRemaining(60);
    setLoader(false);
  };


  const handleForget = () =>{
    setForgetPasswordModalOpen(!forgetPasswordModalOpen)
  }

  return (
    // <Container sx={{ display: 'grid', placeItems: 'center' }}>
    //     <Grid container spacing={1} mt={isMobile ? 1 : 10} mb={isMobile ? 1 : 0}>
    //         <Grid className='d-none d-md-block' item lg={4} xs={12}>
    //             <img className='animate__animated animate__backInLeft w-100' src={HelperDash} alt="..." />
    //         </Grid>
    //         <Grid className='animate__animated animate__zoomIn' item lg={4} xs={12}>
    //             <div className="text-center">
    //                 <img src={WeLogo} alt="Logo" />
    //                 <Typography fontWeight={600} sx={{ mt: 1 }} variant="h5">
    //                     {
    //                         selectedRole === 'super' ? 'Super Admin ' : selectedRole === 'admin' ? 'Admin ' : selectedRole === 'supervisor' ? 'Supervisor ' : selectedRole === 'service' ? 'Service Provider ' : selectedRole === 'office' && 'Office '
    //                     }
    //                     Sign in
    //                 </Typography>
    //             </div>
    //             <Formik initialValues={LoginData} onSubmit={OnLoginSubmit} enableReinitialize>
    //                 {({ values, handleChange, handleSubmit }) => (
    //                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
    //                         <TextField
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             id="email"
    //                             label="Email Address"
    //                             name="email"
    //                             autoComplete="email"
    //                             onChange={handleChange}
    //                             value={values.email}
    //                             autoFocus
    //                         />
    //                         <TextField
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             name="password"
    //                             label="Password"
    //                             type="password"
    //                             id="password"
    //                             onChange={handleChange}
    //                             value={values.password}
    //                             autoComplete="current-password"
    //                         />
    //                         <FormControlLabel
    //                             control={<Checkbox value="remember" color="primary" />}
    //                             label="Remember me"
    //                         />
    //                         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
    //                             Sign In
    //                         </Button>
    //                         <Grid container>
    //                             <Grid item xs>
    //                                 <Link href="#" variant="body2">
    //                                     Forgot password?
    //                                 </Link>
    //                             </Grid>
    //                             <Grid item>
    //                                 <Link href="#" variant="body2">
    //                                     {"Don't have an account? Sign Up"}
    //                                 </Link>
    //                             </Grid>
    //                         </Grid>
    //                     </Box>
    //                 )}
    //             </Formik>
    //         </Grid>
    //         <Grid item xs={12} lg={4} sx={{ display: 'grid', placeItems: 'center' }}>
    //             <div className="d-flex animate__animated animate__bounceInRight flex-column gap-4">
    //                 <Button onClick={() => setSelectedRole(roles.super)} variant={selectedRole === roles.super ? "contained" : 'outlined'} color='primary'>Super Admin Login</Button>
    //                 <Button onClick={() => setSelectedRole(roles.admin)} variant={selectedRole === roles.admin ? "contained" : 'outlined'} color='primary'>Admin Login</Button>
    //                 <Button onClick={() => setSelectedRole(roles.supervisor)} variant={selectedRole === roles.supervisor ? "contained" : 'outlined'} color='primary'>Supervisor Login</Button>
    //                 <Button onClick={() => setSelectedRole(roles.service)} variant={selectedRole === roles.service ? "contained" : 'outlined'} color='primary'>Service Provider Login</Button>
    //                 <Button onClick={() => setSelectedRole(roles.office)} variant={selectedRole === roles.office ? "contained" : 'outlined'} color='primary'>Back Office Login</Button>
    //             </div>
    //         </Grid>
    //     </Grid>
    // </Container>
<>
<Navbar/>
    <Header/>
    <Container
      sx={{ display: "grid", placeItems: "center", position: "relative", }}
    >


<ForgetPasswordModal
        ForgetPasswordModalOpen={forgetPasswordModalOpen}
        ForgetPasswordModalOpenFunction={() => setForgetPasswordModalOpen(!forgetPasswordModalOpen)}
      />
      
      <ScaleLoader  
        color="#f00"
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
        }}
        loading={loader}
      />
      <Grid container spacing={1} mt={isMobile ? 1 : 10} mb={isMobile ? 1 : 0}>

        <Grid className="d-none d-md-block" item lg={4} xs={12}>
          <img
            className="animate__animated animate__backInLeft w-100"
            src={HelperDash}
            alt="..."
          />
        </Grid>
        <Grid className="animate__animated animate__zoomIn" item lg={4} xs={12}>
          <div className="text-center">
            <img src={WeLogo} alt="Logo" />
            <Typography fontWeight={600} sx={{ mt: 1 }} variant="h5">
              {selectedRole === "super"
                ? "Super Admin "
                : selectedRole === "admin"
                  ? "Admin "
                  : selectedRole === "supervisor"
                    ? "Supervisor "
                    : selectedRole === "service"
                      ? "Service Provider "
                      : selectedRole === "office" && "Office "}
              Sign in {otpid && `00:${timeRemaining}`}
            </Typography>
          </div>
          {selectedRole === "super" ? (
            <Formik
              initialValues={LoginData}
              onSubmit={OnLoginSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 0.5 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    value={values.email}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    autoComplete="current-password"
                  />
                  {selectedRole === 'super' ? <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> : null}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link  href="#" onClick={handleForget} variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    {/* <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid> */}
                  </Grid>
                </Box>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={LoginData}
              onSubmit={OnLoginSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 0.5 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="number"
                    label="Enter Mobile Number"
                    name="number"
                    autoComplete="mobileNo"
                    onChange={handleChange}
                    value={values.number}
                    autoFocus
                  />

                  {otpid && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otp"
                      label="Enter Otp"
                      placeholder="XXXX"
                      name="otp"
                      autoComplete="mobileNo"
                      onChange={handleChange}
                      value={values.otp}
                      autoFocus
                    />
                  )}
                  <Grid container spacing={1}>
                    <Grid item xs={6} textAlign={"center"}>
                      {" "}
                      {otpid && (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={6} textAlign={"center"}>
                      <Button
                        type="button"
                        fullWidth
                        disabled={otpid && timeRemaining > 5}
                        onClick={() => handleSendOtp(values.number)}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {otpid ? "Re-send" : "Continue"}
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid> */}
                </Box>
              )}
            </Formik>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <div className="d-flex animate__animated animate__bounceInRight flex-column gap-4">
            <Button
              onClick={() => setSelectedRole(roles.super)}
              variant={selectedRole === roles.super ? "contained" : "outlined"}
              color="primary"
            >
              Super Admin Login
            </Button>
            <Button
              onClick={() => setSelectedRole(roles.admin)}
              variant={selectedRole === roles.admin ? "contained" : "outlined"}
              color="primary"
            >
              Admin Login
            </Button>
            <Button
              onClick={() => setSelectedRole(roles.supervisor)}
              variant={
                selectedRole === roles.supervisor ? "contained" : "outlined"
              }
              color="primary"
            >
              Supervisor Login
            </Button>
            <Button
              onClick={() => setSelectedRole(roles.service)}
              variant={
                selectedRole === roles.service ? "contained" : "outlined"
              }
              color="primary"
            >
              Service Provider Login
            </Button>
            <Button
              onClick={() => setSelectedRole(roles.office)}
              variant={selectedRole === roles.office ? "contained" : "outlined"}
              color="primary"
            >
              Back Office Login
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default AdminSignIn;
