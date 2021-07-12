import axios from "axios";

const initState = {
  EmployeeStatusCheckListTE: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};


const EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE = "EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYP";

export const getAllEmployeeRequestsCheckAction = (payload) => {
    return async (dispatch) => {
      // API CALL :: FETCH RECORDS
      const url = `http://localhost:8080/api/v1/request/task/${payload.taskId}`;
      const response = await axios.get(url,payload);
  
      // console.log(response);
  
      // UI UPDATE
      dispatch({ type: EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE, payload: response.data });
    };
  };
  export function EmployeeRequestStatusCheckReducer(state = initState, action) {
    switch (action.type) {
      case EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE:
        return { ...state, EmployeeStatusCheckListTE: action.payload };
    
      default:
        return state;
    }}