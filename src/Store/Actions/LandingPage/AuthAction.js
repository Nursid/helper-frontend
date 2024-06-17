import * as constant from "../../Constants/LandingPage/AuthConstants";
import { API_URL } from "../../../config";
import axios from "axios";

const users = {
  Admin: "Admin",
  vendor: "vendor",
  Office: "Office",
  Customer: "Customer",
};

// export const GetLogIn = (formdata, loginPerson) => {
//   return async (dispatch) => {
//     dispatch({ type: constant.LOGIN_API_LOADING });
//     try {
//       let response;
//       if (loginPerson === users.Customer) {
//         response = await axios.post(API_URL + "/customer/login", formdata, {
//           method: "POST",
//         });
//       } else if (loginPerson === users.vendor) {
//         response = await axios.post(API_URL + "/supervisor/login", formdata, {
//           method: "POST",
//         });
//       }
//       if (response.status === 200) {
//         dispatch({ type: constant.LOGIN_API_SUCCESS, payload: response.data });
//         sessionStorage.setItem("user", JSON.stringify(response.data));
//       }
//     } catch (error) {
//       dispatch({ type: constant.LOGIN_API_ERROR });
//     }
//   };
// };

export const GetCustomerLogIn = (number, otp, otpid) => {
  return async (dispatch) => {
    dispatch({ type: constant.LOGIN_API_LOADING });
    const newSearchquery = new URLSearchParams({
      number: number,
      otp: otp,
      otpid: otpid,
    }).toString();
    try {
      const response = await axios.get(
        API_URL + "/customer/login?" + newSearchquery
      );
      if (response.status === 200) {
        dispatch({
          type: constant.LOGIN_API_SUCCESS,
          payload: response.data,
        });
        sessionStorage.setItem("customer", JSON.stringify(response.data));
      }
    } catch (error) {
      dispatch({ type: constant.LOGIN_API_ERROR });
    }
  };
};
