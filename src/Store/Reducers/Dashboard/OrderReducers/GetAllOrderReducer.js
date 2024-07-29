import * as constant from '../../../Constants/Dashboard/OrdeerConstant/OrderContant';

const initialState = {
    isLoading: false,
    data: [],
    isError: false
}


const GetAllOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALL_ORDER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            }

        case constant.GET_ALL_ORDER_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            }

        default:
            return state;
    }
}




export const GetAllOrderByIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALL_ORDER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            }

        case constant.GET_ALL_ORDER_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            }

        default:
            return state;
    }
}
export const GetAllTimeSlotReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALL_TIMESLOT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALL_TIMESLOT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            }

        case constant.GET_ALL_TIMESLOT_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            }

        default:
            return state;
    }
}



export default GetAllOrderReducer