import * as constant from "../Constants/ImageUploadConstants"

const initialState = {
    isLoading: false,
    isUploaded: null,
    fileName: "",
    isError: false,
    isField: {}
}

const ImageUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.IMAGE_UPLOAD_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case constant.IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isUploaded: true,
                fileName: action.payload.data.fileName,
                isField: { [action.file]: action.payload.data.fileName }
            }
        case constant.IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                isUploaded: false,
                isError: true
            }

        default:
            return {
                ...state
            };
    }
}


export default ImageUploadReducer