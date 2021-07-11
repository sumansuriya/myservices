import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createEmployeeRequestAction,
  
       } from "../redux/EmployeeRequestReducer";
import { AppNav } from "./AppNav";

export const EmployeeTimeExtensionRequestAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [taskExtensionDate, setTaskExtensionDate] = useState(state.employeeRequest.uref.taskExtensionDate);
  
  const [task, setTask] = useState(state.employeeRequest.uref.task);

  const updateTaskExtensionDate = (e) => setTaskExtensionDate(e.target.value);
 
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
            taskExtensionDate : taskExtensionDate,
         
            task : {taskid :task},
        })
      );

      // clear the form
      setTaskExtensionDate("");
    
    setTask("");

    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

 
  return (
    <div>
      <div className="alert alert-secondary">
        
          <h5>Employee request Create</h5>
        
      </div>

      {state.employeeRequest.progress && (
        <div className="mx-4 alert alert-success">Task added Successfully</div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div>
        <div className="text-light">
                Enter ExtensionDate :
            </div>
        <input
            type="date"
            value={taskExtensionDate}
            onChange={updateTaskExtensionDate}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Task Extension Date"
            required
          />
        </div>

   

        <div>
          <input
            type="text"
            value={task}
            onChange={updateTask}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Task Id"
        
          />
        </div>

       

        <div>
            <input
              type="button"
              onClick={addNewRequest}
              value="Add New Request"
              className="btn btn-lg btn-secondary w-100"
            />
          )
        </div>
      </form>
    </div>
  );
};