import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createEmployeeAction,
          updateEmployeeAction,
       } from "../redux/EmployeeReducer";
import { AppNav } from "./AppNav";

export const EmployeeAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [firstname, setFirstname] = useState(state.employee.uref.firstname);
  const [lastname, setLastname] = useState(state.employee.uref.lastname);
  const [username, setUsername] = useState(state.employee.uref.username);
  const [empmail, setEmpmail] = useState(state.employee.uref.empmail);
  const [empDeptName, setEmpDeptName] = useState(state.employee.uref.empDeptName);
  const [location, setLocation] = useState(state.employee.uref.location);
  const [empDOB, setEmpDOB] = useState(state.employee.uref.empDOB);
  const [empHireDate, setEmpHireDate] = useState(state.employee.uref.empHireDate);

  const updateFirstname = (e) => setFirstname(e.target.value);
  const updateLastname = (e) => setLastname(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateempmail = (e) => setEmpmail(e.target.value);
  const updatempDeptName = (e) => setEmpDeptName(e.target.value);
  const updatelocation = (e) => setLocation(e.target.value);
  const updatempDOB = (e) => setEmpDOB(e.target.value);
  const updatempHireDate = (e) => setEmpHireDate(e.target.value);

  const addNewEmployee = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeAction({
            firstname,
            lastname,
            username,
            empmail,
            empDeptName,
            location,
            empDOB,
            empHireDate,
        })
      );

      // clear the form
      setFirstname("");
    setLastname("");
    setUsername("");
    setEmpmail("");
    setEmpDeptName("");
    setLocation("");
    setEmpDOB("");
    setEmpHireDate("");

    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateEmployee = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateEmployeeAction({
          empid: state.employee.uref.empid,
           firstname,
            lastname,
            username,
            empmail,
            empDeptName,
            location,
            empDOB,
            empHireDate,
        })
      );

      // clear the form
      setFirstname("");
    setLastname("");
    setUsername("");
    setEmpmail("");
    setEmpDeptName("");
    setLocation("");
    setEmpDOB("");
    setEmpHireDate("");

    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary">
        {state.employee.uref.empid ? (
          <h5>Employee Update</h5>
        ) : (
          <h5>Employee Create</h5>
        )}
      </div>

      {state.employee.progress && (
        <div className="mx-4 alert alert-success">Operation Success</div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div>
        <input
            type="text"
            value={firstname}
            onChange={updateFirstname}
            className="form-control form-control-lg mb-1"
            placeholder="Enter First Name"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={lastname}
            onChange={updateLastname}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={username}
            onChange={updateUsername}
            className="form-control form-control-lg mb-1"
            placeholder="Enter User Name"
            required
          />
        </div>

        <div>
          <input
            type="email"
            value={empmail}
            onChange={updateempmail}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Email"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={empDeptName}
            onChange={updatempDeptName}
            className="form-control form-control-lg mb-1"
            placeholder="Enter DeptName"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={location}
            onChange={updatelocation}
            className="form-control form-control-lg mb-1"
            placeholder="Enter location"
            required
          />
        </div>
        <div>
            <div className="text-light">
                Enter DOB :
            </div>
            
          <input
            type="date"
            value={empDOB}
            onChange={updatempDOB}
            className="form-control form-control-lg mb-1"
            placeholder="Enter DOB"
            required
          />
         </div>

        <div>
          <input
            type="date"
            value={empHireDate}
            onChange={updatempHireDate}
            className="form-control form-control-lg mb-1"
            placeholder="Enter HireDate"
            required
          />
        </div>

        <div>
          {state.employee.uref.empid ? (
            <input
              type="button"
              onClick={updateEmployee}
              value="Update Employee"
              className="btn btn-lg btn-secondary w-100"
            />
          ) : (
            <input
              type="button"
              onClick={addNewEmployee}
              value="Add Employee"
              className="btn btn-lg btn-secondary w-100"
            />
          )}
        </div>
      </form>
    </div>
  );
};