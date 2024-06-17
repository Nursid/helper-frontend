import * as constant from "../Constants/ImageUploadConstants"
import axios from "axios"
import { API_URL } from "../../config"
import Swal from "sweetalert2"
import { GridLoader } from "react-spinners"
import { useAuth } from "../../Context/userAuthContext"
import { useState } from "react"



export const ImageUploadAction = (e, id) => {
    return async (dispatch) => {
        dispatch({ type: constant.IMAGE_UPLOAD_LOADING })
        try {
            const file = e.target.files[0]
            const fd = new FormData()
            fd.append("myfile", file)

            const response = await axios.post(API_URL + "/util/uploadfile/" + id, fd, { method: "POST" })

            if (response.status === 200) {
                dispatch({ type: constant.IMAGE_UPLOAD_SUCCESS, payload: response, file: e.target.name })
                ShowMessage(false, "Image Uploaded Successfully")
            }
        } catch (error) {
            dispatch({ type: constant.IMAGE_UPLOAD_ERROR })
        }
    }
}





const ShowMessage = (error, message) => {
    return Swal.fire({ icon: error ? "error" : "success", title: message })
}


// Loader 
const WaitLoader = ({ loading, offset }) => {
    return <GridLoader loading={loading} color={"#FFD700"} size={30} style={{ position: "absolute", left: `${offset[0]}%`, top: `${offset[1]}%`, transform: "translate(-50%,-50%)", zIndex: "10" }} />
}