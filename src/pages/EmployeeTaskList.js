import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteEmployeeTaskAction,
  getAllEmployeeTaskAction,
  updateRenderAction,
} from "../redux/EmployeeTaskReducer";
import { AppNav } from "./AppNav";

export const EmployeeTaskList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllEmployeeTaskAction());
  }, []);

  const deleteTask = (item) => {
    console.log("DELETE RECORD", item.taskId);
    // dispatch the call.
    dispatch(deleteEmployeeTaskAction(item));
  };

  // 2
  const updateTask = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/employee-task-add");
  };

  console.log(state.employeeTask.employeeTaskList);
  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Employee Task List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">taskId</th>
            <th scope="col">taskName</th>
            <th scope="col">taskStatus</th>
            <th scope="col">projectid</th>
            <th scope="col">startDate</th>
            <th scope="col">deadLine</th>
            <th scope="col">employeeId</th>
            <th scope="col">Actions</th>
          </tr>
        
        </thead>
        <tbody className="text-light">
            {state.employeeTask.employeeTaskList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.taskId}</th>
              <td>{item.taskName}</td>
              <td>{item.taskStatus}</td>
              <td>{item.projectid}</td>
              <td>{item.startDate}</td>
              <td>{item.deadLine}</td>
              <td>{item.emp.empid}</td>

              <td>
                <input
                  type="button"
                  value="Update"
                  className="btn btn-outline-success btn-sm  mr-1"
                  // onClick={updateRecord} :1
                  onClick={() => updateTask(item)}
                />
                <input
                  type="button"
                  value="Delete"
                  // onClick={deleteRecord}
                  onClick={() => deleteTask(item)}
                  className="btn btn-outline-danger btn-sm"
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
};
