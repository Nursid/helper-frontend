import * as constant from "../../../Constants/Dashboard/Authentication/ServicePro"


const initialState = {
    isLoading: false,
    data: [],
    isError: false
}


const GetServiceProviderLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.SERVICE_PROVIDER_LOGIN_API_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case constant.SERVICE_PROVIDER_LOGIN_API_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }
        case constant.SERVICE_PROVIDER_LOGIN_API_ERROR:
            return {
                ...state,
                isError: false,
            }

        default:
            return state;
    }
}







export default GetServiceProviderLoginReducer