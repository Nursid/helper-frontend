import * as  constant from '../../Constants/customersConstant';

const initialState = {
    isLoading: false,
    data: [],
    isError: false
}


const GetCustomerUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_CUSTOMER_UPDATE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_CUSTOMER_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case constant.GET_CUSTOMER_UPDATE_ERROR:
            return {
                ...state,
                isError: false,
                isLoading: false
            }

        default:
            return state;
    }
}




export default GetCustomerUpdateReducer ;