import * as constant from "../../Constants/Dashboard/ServicesConstant";
const initialState = {
    isLoading: false,
    isSuccess: null,
    isError: false
}

const DeleterTheServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.SERVICES_DELETE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.SERVICES_DELETE_API_SUCCESS:
            return {
                ...state,
                isSuccess: true
            }
        case constant.SERVICES_DELETE_API_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return {
                ...state
            }
    }
}

export default  DeleterTheServiceReducer