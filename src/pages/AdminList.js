import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminAction} from "../redux/AdminReducer";
import { AppNav } from "./AppNav";

export const AdminList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllAdminAction());
  }, []);

  

  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Admin List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">adminid</th>
            <th scope="col">username</th>
            <th scope="col">password</th>
            <th scope="col">adminmail</th>
            <th scope="col">firstname</th>
            <th scope="col">lastname</th>
            <th scope="col">Security key</th>
          </tr>
        </thead>
        <tbody className = "text-light">
          {state.admin.adminList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.adminid}</th>
              <td>{item.username}</td>
              <td>{"********"}</td>
              <td>{item.adminmail}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{"******"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};