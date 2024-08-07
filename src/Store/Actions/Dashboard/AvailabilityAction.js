// /listing-availability

import axios from "axios"
import * as constant from '../../Constants/Dashboard/AvailabilityConstant';
import { API_URL } from "../../../config";




export const GetAvailability = (formdata) => {

    return async (dispatch) => {
        dispatch({ type: constant.AVAILABILITY_API_LOADING })
        try {
            const response = await axios.post(API_URL + "/api/listing-availability",formdata)
            if (response.status === 200) {
                dispatch({ type: constant.AVAILABILITY_API_SUCCESS, payload: response.data.data })
            }else{
                dispatch({ type: constant.AVAILABILITY_API_ERROR, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.AVAILABILITY_API_ERROR, })
        }
    }
}