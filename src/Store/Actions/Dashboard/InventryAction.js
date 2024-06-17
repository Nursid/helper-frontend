import axios from 'axios';
import * as constant from '../../Constants/Dashboard/InventryConstants';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';

export const GetAllInventry = () => {
    return async (dispatch) => {
        dispatch({ type: constant.INVENTRY_API_LOADING });
        try {
            const response = await axios.get(API_URL + '/inventry/getall')
            if (response.status === 200) {
                dispatch({ type: constant.INVENTRY_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.INVENTRY_API_ERROR })
        }
    }
}

export const GetAllAllotedItems = () => {
    return async (dispatch) => {
        dispatch({ type: constant.ALLOTEDITEM_API_LOADING });
        try {
            const response = await axios.get(API_URL + '/inventry/allot-item/getall')
            if (response.status === 200) {
                dispatch({ type: constant.ALLOTEDITEM_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ALLOTEDITEM_API_ERROR })
        }
    }
}