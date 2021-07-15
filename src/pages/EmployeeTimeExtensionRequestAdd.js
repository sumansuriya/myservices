import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeRequestAction,
  updateEmployeeTaskExtensionRequestAction,
} from "../redux/EmployeeRequestReducer";
import { AppNav } from "./AppNav";
import {Select} from "react-select";

export const EmployeeTimeExtensionRequestAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [taskExtensionDate, setTaskExtensionDate] = useState(
    state.employeeRequest.uref.taskExtensionDate
  );
  const [reason, setReason] = useState(state.employeeRequest.uref.reason);
  const [status, setStatus] = useState(state.employeeRequest.uref.status);

  const [task, setTask] = useState(state.employeeRequest.uref.task);

  const updateTaskExtensionDate = (e) => setTaskExtensionDate(e.target.value);
  const updateReason = (e) => setReason(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const updateTask = (e) => setTask(e.target.value);

  const addNewRequest = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeRequestAction({
          taskExtensionDate: taskExtensionDate,
          reason: reason,
          task: { taskId: task },
        })
      );

      // clear the form
      setTaskExtensionDate("");
      setReason("");
      setTask("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  const updateEmployeeTaskExtensionRequest = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      console.log(state.employeeRequest.uref.requestid);
      dispatch(
        updateEmployeeTaskExtensionRequestAction({
          requestid: state.employeeRequest.uref.requestid,

          taskExtensionDate: taskExtensionDate,
          reason: reason,
          status: status,

          task: { taskId: task },
        })
      );

      // clear the form

      setTaskExtensionDate("");
      setReason("");
      setStatus("");
      setTask("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary">
        {state.employeeRequest.uref.requestid ? (
          <h5>Employee Request Update</h5>
        ) : (
          <h5>Employee Request Create</h5>
        )}
      </div>

      {state.employeeRequest.progress && (
        <div className="mx-4 alert alert-success">
          Request added Successfully
        </div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
      
         
        
          <div className="row mb-1 justify-content-center">
          <input
            type="text"
            value={reason}
            onChange={updateReason}
            className="form-control form-control-lg mb-1  w-50"
            placeholder="Enter Reason"
            required
          />
        </div>
        <h5 className="text-light text-center">Enter ExtensionDate </h5>
          <div className="row mb-1 justify-content-center">
          <input
            type="date"
            value={taskExtensionDate}
            onChange={updateTaskExtensionDate}
            className="form-control form-control-lg mb-1 w-50"
            placeholder="Enter Task Extension Date"
            required
          />
          </div>
        <div className="row mb-1 justify-content-center">
          {state.employeeRequest.uref.requestid ? (
                     <select
                      className="custom-select  w-50"
                       onChange={(e)=>{
                       const selectedStatus=e.target.value;
                       setStatus(selectedStatus);
                       
                     }}>
                        <option value="">SELECT</option>
                       <option value="REJECTED">REJECT</option>

                       <option value="APPROVED">APPROVE</option>
             
              
            </select>
          ) : (
            <input
              type="text"
              value="Approval Pending for Time Extension "
              onChange={updateStatus}
              className="form-control form-control-lg mb-1  w-50"
              placeholder="Enter status"
              required
            />
          )}
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            value={task}
            onChange={updateTask}
            className="form-control form-control-lg mb-1 w-50"
            placeholder="Enter Task Id"
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          {state.employeeRequest.uref.requestid ? (
            <input
              type="button"
              onClick={updateEmployeeTaskExtensionRequest}
              value="Update Employee Request"
              className="btn btn-lg btn-info w-50"
            />
          ) : (
            <input
              type="button"
              onClick={addNewRequest}
              value="Add New Request"
              className="btn btn-lg btn-success w-50"
            />
          )}
        </div>
      </form>
    </div>
  );
};
