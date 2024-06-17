import * as constant from "../../Constants/Dashboard/InventryConstants"

const initialState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    isError: false
}


    const GetAllInventryReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.INVENTRY_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.INVENTRY_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.INVENTRY_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
    }

 const GetAllAllotedItemReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALLOTEDITEM_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALLOTEDITEM_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.ALLOTEDITEM_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}


export {GetAllInventryReducers, GetAllAllotedItemReducers}
