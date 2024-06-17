import * as constant from "../../Constants/LandingPage/AuthConstants"

const initialState = {
    isLoading: false,
    isSuccess: undefined,
    data: [],
    isError: false
}

const GetLogInReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.LOGIN_API_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case constant.LOGIN_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload,
            }
        case constant.LOGIN_API_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return state;
    }
}


export default GetLogInReducers