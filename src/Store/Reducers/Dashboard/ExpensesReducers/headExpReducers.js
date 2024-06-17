import * as constant from '../../../Constants/Dashboard/expenseConstants';

const initialState = {
    isLoading: false,
    data: [],
    isError: false,
}



const GetAddHeadExpReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.HEAD_EXPENSE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.HEAD_EXPENSE_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case constant.HEAD_EXPENSE_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}

const GetAllHeadExpReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALLHEADEXP_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALLHEADEXP_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.GET_ALLHEADEXP_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}


// ADD NEW EXPENSE  
const GetAddExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ADDEXP_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ADDEXP_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.GET_ADDEXP_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}

// ADD New collections  
const GetAddCollectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ADD_COLLECTION_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ADD_COLLECTION_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.GET_ADD_COLLECTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}

// Get ALl Expenses  
const GetAllExpenseReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALL_EXP_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALL_EXP_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.GET_ALL_EXP_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}

// Get ALl Collections  
const GetAllCollectionReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_ALL_COLL_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.GET_ALL_COLL_API_SUCCESS:
            return {
                ...state,
                isLoding: false,
                data: action.payload,
            }
        case constant.GET_ALL_COLL_API_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}




export { GetAddHeadExpReducers, GetAllHeadExpReducer, GetAddExpenseReducer, GetAddCollectionReducer, GetAllExpenseReducers, GetAllCollectionReducers };