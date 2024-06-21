import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL, admin, employeeList, roles, service } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpid, setOtpId] = useState(null);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const getUserLogIn = async (formData, logger, otpid) => {
    try {
      let response;
      const newUrlquery = new URLSearchParams({
        ...formData,
      }).toString();
      if (
        logger === roles.admin ||
        logger === roles.supervisor ||
        logger === roles.office
      ) {
        response = await axios.get(
          `${API_URL}/employee/login/${logger}?${newUrlquery}&otpid=${otpid}`
        );
      } else if (logger === roles.super) {
        response = await axios.post(`${API_URL}/admin/login`, formData);


      } else if (logger === roles.service) {
        response = await axios.get(
          API_URL + "/service-provider/login?" + newUrlquery + `&otpid=${otpid}`
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Please Select the Role",
        });
        return;
      }
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setOtpId(null);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        setCurrentUser(response.data);
        setIsLoggedIn(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Log In Failed",
          text: response.data.message || "Unknown Error", // Show the server's error message if available
        });
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Log In Failed",
        text: error.response ? error.response.data.message : "Unknown Error", // Show the server's error message if available
      });
      setIsLoggedIn(false);
    }
  };
  // const getUserLogIn = async (formData, logger) => {
  //   try {
  //     let response;
  //     if (
  //       logger === roles.admin ||
  //       logger === roles.supervisor ||
  //       logger === roles.office
  //     ) {
  //       response = await axios.post(
  //         API_URL + "/employee/login/" + logger,
  //         formData
  //       );
  //     } else if (logger === roles.super) {
  //       response = await axios.post(API_URL + "/admin/login", formData);
  //     } else if (logger === roles.service) {
  //       response = await axios.post(
  //         API_URL + "/service-provider/login",
  //         formData
  //       );
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Please Select the Role",
  //       });
  //       return;
  //     }

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Logged In Successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       sessionStorage.setItem("user", JSON.stringify(response.data));
  //       setCurrentUser(response.data);
  //       setIsLoggedIn(true);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Log In Failed",
  //         text: response.data.message || "Unknown Error", // Show the server's error message if available
  //       });
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Log In Failed",
  //       text: error.response ? error.response.data.message : "Unknown Error", // Show the server's error message if available
  //     });
  //     setIsLoggedIn(false);
  //   }
  // };

  const sendOtp = async (number) => {
    try {
      const response = await axios.get(API_URL + "/verify/send/otp/" + number);
      if (response.status === 200) {
        setOtpId(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getUserLogIn,
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        sendOtp,
        otpid,
        setOtpId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
