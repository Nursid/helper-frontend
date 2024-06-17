import * as constant from '../../../Constants/Dashboard/ManageWebsiteConstants/TestimonialsConstant';

const initialState = {
    isLoading: false,
    data: [],
    isError: false,
}

const GetAllTestimonialsReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_TESTIMONIALS_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_TESTIMONIALS_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.ALL_TESTIMONIALS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}


const GetAllPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_POST_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_POST_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.ALL_POST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}


const GetAllOfferReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_OFFER_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_OFFER_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.ALL_OFFER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}



const GetAllAdvertisementReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.ALL_ADVERTISEMENT_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ALL_ADVERTISEMENT_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.ALL_ADVERTISEMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}



export {GetAllTestimonialsReducer,GetAllPostReducer,GetAllOfferReducer,GetAllAdvertisementReducer};