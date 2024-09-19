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

                 dispatch({ type: constant.GET_ALL_TIMESLOT_SUCCESS, payload: response.data });

            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_TIMESLOT_ERROR });
        }
    };
};

export default GetAllOrders;
