import axios from "axios"
import * as constant from "../../Constants/LandingPage/SearchConstants"
import { API_URL } from "../../../config"


export const GetSearchServices = (id) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_SEARCH_API_LOADING })
        try {
            const response = await axios.get(API_URL + "/service/get-service/"+id)
            if (response.status === 200) {
                dispatch({ type: constant.GET_SEARCH_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_SEARCH_API_ERROR })
        }
    }
}