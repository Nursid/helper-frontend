import axios from "axios"
import * as constant from "../../../Constants/Dashboard/EmployeConstant/MonthlyService"
import { API_URL } from "../../../../config"


export const GetAllMonthlyServiceAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.ALL_MONTHLY_SERVICE_API_LOADING })
        try {
            const response = await axios.get(API_URL + "/monthly-service/getall");
            if (response.status === 200) {
                dispatch({ type: constant.ALL_MONTHLY_SERVICE_API_SUCCESS, payload: response.data.data })
            }else{
                dispatch({ type: constant.ALL_MONTHLY_SERVICE_ERROR, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ALL_MONTHLY_SERVICE_ERROR, })
        }
    }
}