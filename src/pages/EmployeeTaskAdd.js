import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createEmployeeTaskAction,
          updateEmployeeTaskAction,
       } from "../redux/EmployeeTaskReducer";
import { AppNav } from "./AppNav";

export const EmployeeTaskAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [taskName, setTaskName] = useState(state.employeeTask.uref.taskName);
  const [projectid, setProjectId] = useState(state.employeeTask.uref.projectid);
  const [emp, setEmp] = useState(state.employeeTask.uref.emp);

  const updateTaskName = (e) => setTaskName(e.target.value);
  const updateProjectId = (e) => setProjectId(e.target.value);
  const updateEmp = (e) => setEmp(e.target.value);
  
  const addNewTask = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeTaskAction({
            taskName : taskName,
            projectid : projectid,
            emp : {empid :emp},
        })
      );

      // clear the form
    setTaskName("");
    setProjectId("");
    setEmp("");

    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateEmployeeTask = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
        console.log(state.employeeTask.uref.taskId)
      dispatch(
        updateEmployeeTaskAction({
          taskId: state.employeeTask.uref.taskId,
          
          taskName: taskName,
    
          projectid: projectid,
          emp : { empid : emp}
        })
      );

      // clear the form
      setTaskName("");
     setProjectId("");
     setEmp("");

    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary">
        {state.employeeTask.uref.taskId ? (
          <h5>Employee Task Update</h5>
        ) : (
          <h5>Employee Task Create</h5>
        )}
      </div>

      {state.employeeTask.progress && (
        <div className="mx-4 alert alert-success">Task added Successfully</div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div>
        <input
            type="text"
            value={taskName}
            onChange={updateTaskName}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Task Name"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={projectid}
            onChange={updateProjectId}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Project Id"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={emp}
            onChange={updateEmp}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Employee Id"
        
          />
        </div>

       

        <div>
          {state.employeeTask.uref.taskId ? (
            <input
              type="button"
              onClick={updateEmployeeTask}
              value="Update Employee Task"
              className="btn btn-lg btn-secondary w-100"
            />
          ) : (
            <input
              type="button"
              onClick={addNewTask}
              value="Add New Task"
              className="btn btn-lg btn-secondary w-100"
            />
          )}
        </div>
      </form>
    </div>
  );
};