import * as constant from "../../../Constants/Dashboard/EmployeConstant/EmployeeReg"


const initialState = {
    isLoading: false,
    data: [],
    isError: false
}


const GetAllEmployeeDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_EMPLOYEE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_EMPLOYEE_API_SUCCESS:
            return {
                ...state,
                data: action.payload
            }

        case constant.ALL_EMPLOYEE_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return state
    }
}


export default GetAllEmployeeDataReducer

