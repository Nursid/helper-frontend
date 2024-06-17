import * as constant from "../../../Constants/Dashboard/EmployeConstant/MonthlyService"


const initialState = {
    isLoading: false,
    data: [],
    isError: false
}

const GetAllMonthlyServiceDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_MONTHLY_SERVICE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_MONTHLY_SERVICE_API_SUCCESS:
            return {
                ...state,
                data: action.payload
            }

        case constant.ALL_MONTHLY_SERVICE_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return state
    }
}


export default GetAllMonthlyServiceDataReducer