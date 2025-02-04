import * as constant from "../../Constants/Dashboard/AvailabilityConstant";
const initialState = {
    staff: {
      isLoading: false,
      isSuccess: false,
      data: [],
      isError: false
    },
    outsource: {
      isLoading: false,
      isSuccess: false,
      data: [],
      isError: false
    }
  };
  
  const AvailabilityReducers = (state = initialState, action) => {
    const { type, payload } = action;
    
    // Get the availability type from payload (staff/outsource)
    const availabilityType = payload?.type || 'staff';
  
    switch (action.type) {
      case constant.AVAILABILITY_API_LOADING:
        return {
          ...state,
          [availabilityType]: {
            ...state[availabilityType],
            isLoading: true,
            isSuccess: false,
            isError: false
          }
        };
  
      case constant.AVAILABILITY_API_SUCCESS:
        return {
          ...state,
          [availabilityType]: {
            isLoading: false,
            isSuccess: true,
            data: payload.data,
            isError: false
          }
        };
  
      case constant.AVAILABILITY_API_ERROR:
        return {
          ...state,
          [availabilityType]: {
            ...state[availabilityType],
            isLoading: false,
            isSuccess: false,
            isError: true
          }
        };
  
      default:
        return state;
    }
  };

export default AvailabilityReducers;
