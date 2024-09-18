import axios from 'axios';
import * as constant from '../../../Constants/Dashboard/AttendanceConstants';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';


export const AttendanceAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.ATTENDANCE_API_LOADING });
        try {
            const employeeResponse = await axios.get(`${API_URL}/employee/getall`);
            const attendanceResponse = await axios.get(`${API_URL}/attendance/supervisor/getall`);

            if (employeeResponse.status === 200 && attendanceResponse.status === 200) {
                const employees = employeeResponse?.data?.data || [];
                const attendances = attendanceResponse?.data?.data || [];

                const combinedData = employees.map((employee) => {
                    const matchingAttendance = attendances.find(attendance => attendance.emp_id === employee.emp_id);
                    
                    if (matchingAttendance) {
                        return { id: employee.emp_id, name: employee.name, ...matchingAttendance };
                    } else {
                        return { id: employee.emp_id, name: employee.name, emp_id: employee.emp_id };
                    }
                });

                dispatch({ type: constant.ATTENDANCE_API_SUCCESS, payload: combinedData });
            }
             
         } catch (error) {
            dispatch({ type: constant.ATTENDANCE_API_ERROR });
        }
    };
};

