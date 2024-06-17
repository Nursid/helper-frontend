import * as constant from "../../Constants/Dashboard/ServicesConstant"

const initialState = {
    isLoading: true,
    isSuccess: false,
    data: [],
    isError: false
}

const SeviceAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.SERVICE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.SERVICE_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }
        case constant.SERVICE_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true

            }
        default:
            return {
                ...state
            }
    }
}


export default SeviceAddReducer