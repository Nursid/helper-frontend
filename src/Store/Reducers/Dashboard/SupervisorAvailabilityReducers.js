import * as constant from "../../Constants/Dashboard/AvailabilityConstant";
const initialState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    isError: false
}

const SupervisorAvailabilityReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.SUPERVISOR_AVAILABILITY_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.SUPERVISOR_AVAILABILITY_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.SUPERVISOR_AVAILABILITY_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}

export default  SupervisorAvailabilityReducers