import * as constant from "../../Constants/Dashboard/AccountConstant";
const initialState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    isError: false
}

const AccountReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.ACCOUNT_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ACCOUNT_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.ACCOUNT_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}

export default  AccountReducers