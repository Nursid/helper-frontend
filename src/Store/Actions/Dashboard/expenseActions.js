import axios from 'axios';
import * as constant from '../../Constants/Dashboard/expenseConstants';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';


export const GetAddHeadExp = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.HEAD_EXPENSE_API_LOADING })
        try {
            const response = await axios.post(API_URL + '/expense/add', formdata)
            if (response.status === 200) {
                dispatch({ type: constant.HEAD_EXPENSE_API_SUCCESS, payload: response.data })
                showMsg({ error: false, message: 'successfully Added' })
            } else {
                showMsg(true, response.data.message)
            }
        } catch (error) {
            dispatch({ type: constant.HEAD_EXPENSE_API_ERROR })
            showMsg(true, "server issue")
        }
    }
}


// get all head expenses
export const GetAllHeadExp = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALLHEADEXP_API_LOADING });
        try {
            const response = await axios.get(API_URL + '/expense/getall')
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALLHEADEXP_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALLHEADEXP_API_ERROR })
        }
    }
}



// Delete expense head by id 
export const GetDeleteHeadExp = (id) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_DEL_HEADEXP_LOADING })
        try {
            const response = await axios.delete(API_URL + '/expense/delete/' + id)
            if (response.status === 200) {
                dispatch({ type: constant.GET_DEL_HEADEXP_SUCCESS })
                
                Swal.fire(
                    'Successfully!',
                    "Expense Deleted Successfully",
                    'success'
                )
            } else {
                
                Swal.fire({
                    title: 'failed to add try again',
                    icon: "error",
                })
            }
        } catch (error) {
            dispatch({ type: constant.GET_DEL_HEADEXP_ERROR })
        }
    }
}

// Add new Expenses 
export const GetAddExpense = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ADDEXP_API_LOADING })
        try {
            const response = await axios.post(API_URL + '/expense/addexpense', formdata);
            if (response.status === 200) {
                dispatch({ type: constant.GET_ADDEXP_API_SUCCESS, payload: response.data.data })
                Swal.fire(
                    'Successfully!',
                    "successfully added new expense",
                    'success'
                )
            }else{
                Swal.fire({
                    title: 'failed to add try again',
                    icon: "error",
                })
            }

        } catch (error) {
            dispatch({ type: constant.GET_ADDEXP_API_ERROR })
        }
    }
}

// get add new collections 
export const GetAddCollections = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ADD_COLLECTION_LOADING })
        try {
            const response = await axios.post(API_URL + '/expense/addcollection', formdata)
        
            if (response.status === 200) {
                dispatch({ type: constant.GET_ADD_COLLECTION_SUCCESS, payload: response.data.data })
                
                Swal.fire(
                    'Successfully!',
                    "successfully added new collection",
                    'success'
                )
            } else {
                Swal.fire({
                    title: 'failed to add try again',
                    icon: "error",
                })
                
            }
        } catch (error) {
            dispatch({ type: constant.GET_ADD_COLLECTION_ERROR })
            Swal.fire({
                title: 'failed to add try again',
                icon: "error",
            })
        }
    }
}

// get all expenses added 

export const GetALLExpenses = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_EXP_API_LOADING });
        try {
            const response = await axios.get(API_URL + '/expense/getallexpenses')
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_EXP_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_EXP_API_ERROR })
        }
    }
}


// get all collections 

export const GetAllCollection = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_COLL_API_LOADING });
        try {
            const response = await axios.get(API_URL + '/expense/getallcollection')
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_COLL_API_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_COLL_API_ERROR })
        }
    }
}


// Delete collection by id
export const DeleteCollectionById = async (id) => {
    try {
        const response = await axios.get(API_URL + "/expense/deletecollection/" + id)
        if (response.status === 200) {
            // showMsg(false, 'Deleted successfully')
            Swal.fire(
                'Successfully!',
               'Deleted successfully',
                'success'
            )
        }else{
            Swal.fire({
                title: 'failed to add try again',
                icon: "error",
            })
        }
    } catch (error) {
        showMsg(true, error)
    }
}

// Delete Expense by id 
export const DeleteExpByID = async (id) => {
    try {
        const response = await axios.get(API_URL + "/expense/deleteexpense/" + id)
        if (response.status === 200) {
            // showMsg(false, 'Deleted successfully')
            Swal.fire(
                'Successfully!',
               'Deleted successfully',
                'success'
            )
        }else{
            Swal.fire({
                title: 'failed to add try again',
                icon: "error",
            })
        }
    } catch (error) {
        // showMsg(true, error)
        Swal.fire({
            title: 'failed to add try again',
            icon: "error",
        })
    }
}

const showMsg = ({ error, message }) => {
   
    return Swal.fire({ icon: error ? error : 'success', text: message })
}