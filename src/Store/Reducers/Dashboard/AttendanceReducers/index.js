import * as constant from "../../../Constants/Dashboard/AttendanceConstants";
const initialState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    isError: false
}

const AttendanceReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.ATTENDANCE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.ATTENDANCE_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.ATTENDANCE_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}
export const ServiceProviderAttendanceReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.SERATTENDANCE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.SERATTENDANCE_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.SERATTENDANCE_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}

export const AttendanceReportReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.REPORT_ATTENDANCE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.REPORT_ATTENDANCE_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.REPORT_ATTENDANCE_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}


export const ServiceProviderAttendanceReportReducers = (state = initialState, action) => {
    switch (action.type) {
        case constant.SERVICE_REPORT_ATTENDANCE_API_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.SERVICE_REPORT_ATTENDANCE_API_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                data: action.payload
            }
        case constant.SERVICE_REPORT_ATTENDANCE_API_ERROR:
            return {
                ...state,
                isError: true
            }

        default:
            return state
    }
}



export default  AttendanceReducers