import axios from 'axios';
import * as constant from '../../../Constants/Dashboard/AttendanceConstants';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';


export const SupervisorAttendanceReport = (data) => {
    return async (dispatch) => {
        dispatch({ type: constant.REPORT_ATTENDANCE_API_LOADING });
        try {
        
            const attendanceResponse = await axios.post(`${API_URL}/attendance/supervisor/report`, data);
            dispatch({ type: constant.REPORT_ATTENDANCE_API_SUCCESS, payload: attendanceResponse.data.data });
             
         } catch (error) {
            dispatch({ type: constant.REPORT_ATTENDANCE_API_ERROR });
        }
    };
};

