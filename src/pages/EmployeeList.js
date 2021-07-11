import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteEmployeeAction,
  getAllEmployeeAction,
  updateRenderAction,
} from "../redux/EmployeeReducer";
import { AppNav } from "./AppNav";

export const EmployeeList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllEmployeeAction());
  }, []);

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.empid);
    // dispatch the call.
    dispatch(deleteEmployeeAction(item));
  };

  // 2
  const updateRecord = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/employee-add");
  };

  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Employee List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">empid</th>
            <th scope="col">firstname</th>
            <th scope="col">lastname</th>
            <th scope="col">username</th>
            <th scope="col">password</th>
            <th scope="col">empmail</th>
            <th scope="col">empDeptName</th>
            <th scope="col">location</th>
            <th scope="col">empDOB</th>
            <th scope="col">empHireDate</th>
            <th scope="col">Actions</th>
          </tr>

        </thead>
        <tbody className="text-light">
            {state.employee.employeeList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.empid}</th>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.username}</td>
              <td>{"******"}</td>
              <td>{item.empmail}</td>
              <td>{item.empDeptName}</td>
              <td>{item.location}</td>
              <td>{item.empDOB}</td>
              <td>{item.empHireDate}</td> 

              <td>
                <input
                  type="button"
                  value="Update"
                  className="btn btn-outline-success btn-sm  mr-1"
                  // onClick={updateRecord} :1
                  onClick={() => updateRecord(item)}
                />
                <input
                  type="button"
                  value="Delete"
                  // onClick={deleteRecord}
                  onClick={() => deleteRecord(item)}
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

