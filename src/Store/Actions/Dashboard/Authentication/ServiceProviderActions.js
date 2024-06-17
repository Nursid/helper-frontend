import axios from "axios"
import * as contant from "../../../Constants/Dashboard/Authentication/ServicePro"
import { API_URL } from "../../../../config"
import Swal from "sweetalert2"


// getService provider signup 

export const GetServiceProviderSignupAction = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: contant.SERVICE_PROVIDER_SIGNUP_API_LOADING })
        try {
            const response = await axios.post(API_URL + "/service-provider/add", formdata)
            if (response.status === 200) {
                dispatch({ type: contant.SERVICE_PROVIDER_SIGNUP_API_SUCCESS, payload: response.data.data })
                ShowMessage(response.data.error, "Successfully Registered")
            } else {
                ShowMessage(response.data.error, response.data.message)
            }
        } catch (error) {
            ShowMessage(true, "505 server Responded")
            dispatch({ type: contant.SERVICE_PROVIDER_SIGNUP_API_ERROR })
        }
    }
}


// Service Provider Login 

export const GetServiceProviderLoginAction = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: contant.SERVICE_PROVIDER_LOGIN_API_LOADING })
        try {
            const response = await axios.post(API_URL + "/service-provider/login", formdata)
            if (response.status === 200) {
                dispatch({ type: contant.SERVICE_PROVIDER_LOGIN_API_SUCCESS, payload: response.data.data })
                ShowMessage(response.data.error, "Logged in Successfully")
                localStorage.setItem("user", JSON.stringify(response.data.data))
            }
        } catch (error) {
            dispatch({ type: contant.SERVICE_PROVIDER_LOGIN_API_ERROR })
            ShowMessage(true, "500 Server Responded")
        }
    }
}





const ShowMessage = (error, message) => {
    return Swal.fire({ icon: error ? "error" : "success", text: message, })
}



export const GetAllServiceProvider = () => {
    return async (dispatch) => {
        dispatch({ type: contant.SERVICE_PROVIDER_ALL_API_LOADING })
        try {
            const response = await axios.get(API_URL + '/service-provider/getall')
            if (response.status === 200) {
                dispatch({ type: contant.SERVICE_PROVIDER_ALL_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: contant.SERVICE_PROVIDER_ALL_API_ERROR })
        }
    }
}