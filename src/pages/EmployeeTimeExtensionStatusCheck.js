import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEmployeeRequestsCheckAction } from "../redux/EmployeeRequestStatusCheckReducer";

export const EmployeeTimeExtensionStatusCheck = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [taskId, setTaskId] = useState("");
  

 
  const updateTaskId = (e) => setTaskId(e.target.value);
  

 

  const CheckList = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid)
     {
      // dispatch the call to redux ::for API CALL
      dispatch(getAllEmployeeRequestsCheckAction({taskId }));

      // clear the form
      setTaskId("");
      
  
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div
      className="bg-transparent d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="w-50">
      <h2 className="text-center alert alert-info">
          Employee Request Status Check
        </h2>
       

        <form ref={formEl} className="needs-validation" noValidate>
        
          <div>
            <input
              type="text"
              value={taskId}
              onChange={updateTaskId}
              placeholder="Enter TaskId"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

         
          <div>
         
            <Link to="/employee-status-checklist">
           
            <input
              type="button"
              value="check "
              onChange={CheckList}
              className="btn btn-info btn-lg w-100"
            />
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};