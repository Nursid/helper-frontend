
import axios from 'axios';
import * as constant from '../../../Constants/Dashboard/AttendanceConstants';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';

export const ServiceProviderAttendancaAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.SERATTENDANCE_API_LOADING });
        try {
            const employeeResponse = await axios.get(`${API_URL}/service-provider/getall`);
            const attendanceResponse = await axios.get(`${API_URL}/attendance/service-provider/getall`);


            if (employeeResponse.status === 200 && attendanceResponse.status === 200) {
                const employees = employeeResponse?.data?.data || [];
                const attendances = attendanceResponse?.data?.data || [];

             

                const combinedData = employees.map((employee) => {
                    const matchingAttendance = attendances.find(attendance => 
                        parseInt(attendance.servp_id) === employee.id
                      );
                      if(matchingAttendance){
                        matchingAttendance.id=employee.id
                      }
                     

                    if (matchingAttendance) {
                        return { id: employee.id, name: employee.name, ...matchingAttendance };
                    } else {
                        return { id: employee.id, name: employee.name, servp_id: employee.id };
                    }

                }); 

                dispatch({ type: constant.SERATTENDANCE_API_SUCCESS, payload: combinedData });
            }
             
         } catch (error) {
            dispatch({ type: constant.SERATTENDANCE_API_ERROR });
        }
    };
};