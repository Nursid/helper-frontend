import * as constant from "../../Constants/LandingPage/SearchConstants";


const initialState = {
    isLoading: false,
    data: [],
    isError: false
}



const GetSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_SEARCH_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_SEARCH_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case constant.GET_SEARCH_API_ERROR:
            return {
                ...state,
                isError: true
            }
        default:
            return state;
    }
}



export default GetSearchReducer