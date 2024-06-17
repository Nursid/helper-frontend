import axios from "axios"
import * as constant from "../../../Constants/Dashboard/EmployeConstant/EmployeeReg"
import { API_URL } from "../../../../config"




export const GetAllEmployeeAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.ALL_EMPLOYEE_API_LOADING })
        try {
            const response = await axios.get(API_URL + "/employee/getall");
            if (response.status === 200) {
                dispatch({ type: constant.ALL_EMPLOYEE_API_SUCCESS, payload: response.data.data })
            }else{
                dispatch({ type: constant.ALL_EMPLOYEE_ERROR, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ALL_EMPLOYEE_ERROR, })
        }
    }
}