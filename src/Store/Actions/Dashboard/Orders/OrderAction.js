import axios from 'axios'
import * as constant from '../../../Constants/Dashboard/OrdeerConstant/OrderContant'
import { API_URL } from '../../../../config'


const GetAllOrders = (filter, assign , role) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_ORDER_LOADING })
        try {
            let url = API_URL + '/order/getall';
            
            if(role === "service"){
                // Constructing the URL based on filter and assign parameters
                if (filter !== undefined && assign !== undefined) {
                    url += `/${assign}/${filter}`;
                } else if (assign !== undefined) {
                    url += `-service-provider/${assign}`;
                } 
            } else if(role === "supervisor"){
                if (filter !== undefined && assign !== undefined) {
                    url += `/${assign}?status_id=${filter}`;
                } else if (assign !== undefined) {
                    url += `/supervisor/${assign}`;
                } 
            }else{
               if (filter !== undefined) {
                    url += `/${filter}`;
                }
            }

            const response = await axios.get(url);
            
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_ORDER_SUCCESS, payload: response.data });
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_ORDER_ERROR });
        }
    };
};


export const GetAllOrdersByID = (id) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_ORDER_LOADING })
        try {
                const response = await axios.get(API_URL + '/order/getorderById/'+id)
                if (response.status === 200) {
            
                    dispatch({ type: constant.GET_ALL_ORDER_SUCCESS, payload: response.data})
                }
        
        } catch (error) {
            dispatch({ type: constant.GET_ALL_ORDER_ERROR })
        }
    }
}

export const GetAllTimeSlot = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_TIMESLOT_LOADING })
        try {
            
            const response = await axios.get(`${API_URL}/order/time-slot`);
            if (response.data.status === true) {

                const currentTime = new Date(); // Current time

                const filteredTimeSlots = response.data.timeSlots.filter(slot => {
                    const [start, end] = slot.time_range.split('-');

                    // Convert start and end times to Date objects with today's date
                    const [startHours, startMinutes] = start.split(':').map(Number);
                    const [endHours, endMinutes] = end.split(':').map(Number);

                    const startTime = new Date(currentTime);
                    startTime.setHours(startHours, startMinutes, 0, 0);

                    const endTime = new Date(currentTime);
                    endTime.setHours(endHours, endMinutes, 0, 0);

                    // Return only time slots where the current time is before the end time
                    return currentTime < endTime;
                });

                dispatch({ type: constant.GET_ALL_TIMESLOT_SUCCESS, payload: filteredTimeSlots });

                // dispatch({ type: constant.GET_ALL_TIMESLOT_SUCCESS, payload: response.data });

            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_TIMESLOT_ERROR });
        }
    };
};

export default GetAllOrders;