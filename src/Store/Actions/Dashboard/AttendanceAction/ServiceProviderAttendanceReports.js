import axios from 'axios';
import * as constant from '../../../Constants/Dashboard/AttendanceConstants';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';


const ServiceProviderAttendanceReport = (data) => {
    return async (dispatch) => {
        dispatch({ type: constant.SERVICE_REPORT_ATTENDANCE_API_LOADING });
        try {
        
            const attendanceResponse = await axios.post(`${API_URL}/attendance/service-provider/report`, data);
            dispatch({ type: constant.SERVICE_REPORT_ATTENDANCE_API_SUCCESS, payload: attendanceResponse.data.data });
             
         } catch (error) {
            dispatch({ type: constant.SERVICE_REPORT_ATTENDANCE_API_ERROR });
        }
    };
};


export default ServiceProviderAttendanceReport