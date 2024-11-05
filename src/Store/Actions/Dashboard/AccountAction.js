import axios from 'axios';
import * as constant from '../../Constants/Dashboard/AccountConstant';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';


export const AccountListing = (from, to) => {
    return async (dispatch) => {
        dispatch({ type: constant.ACCOUNT_API_LOADING })
        try {
            let url = "/api/account-listing"
            if(from && to){
                url = `/api/account-listing?from=${from}&to=${to}`
            }
            const response = await axios.get(API_URL + url)
            if (response.status === 200) {
                dispatch({ type: constant.ACCOUNT_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ACCOUNT_API_ERROR })
        }
    }
}