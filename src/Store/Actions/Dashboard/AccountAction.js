import axios from 'axios';
import * as constant from '../../Constants/Dashboard/AccountConstant';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';


export const AccountListing = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.ACCOUNT_API_LOADING })
        try {
            const response = await axios.post(API_URL + '/api/account-listing', formdata)
            if (response.status === 200) {
                dispatch({ type: constant.ACCOUNT_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ACCOUNT_API_ERROR })
        }
    }
}