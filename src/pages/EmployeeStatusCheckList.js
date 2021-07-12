import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllTaskTimeExtensionRequestsAction,
} from "../redux/AdminTaskTimeExtensionRequestsReducer";

import { AppNav } from "./AppNav";

export const EmployeeStatusCheckList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTaskTimeExtensionRequestsAction());
  }, []);

 

  
  console.log(state. adminTaskTimeExtensionRequest.AdminTaskExtensionRequestList);
  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Employee Request Status Check</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">requestid</th>
            <th scope="col">status</th>
            <th scope="col">reason</th>
            <th scope="col">taskExtensionDate</th>
            <th scope="col">taskid</th>
            <th scope="col">Actions</th>
          </tr>
        
        </thead>
        <tbody className="text-light">
            {state. adminTaskTimeExtensionRequest.AdminTaskExtensionRequestList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.requestid}</th>
              <td>{item.status}</td>
              <td>{item.reason}</td>
              <td>{item.taskExtensionDate}</td>
              <td>{item.task.taskId}</td>

              
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
};