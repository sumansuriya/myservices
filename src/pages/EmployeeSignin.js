import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateEmployeeAction } from "../redux/UserReducer";

export const EmployeeSignin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const SignInEmployee = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(authenticateEmployeeAction({ username, password }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  // REACT ROUTE DOM
  if (state.user.authSuccess === true) {
    // redirecting the user /employee-list page;
    // history.push("/employee-list");
    history.push("/employee-list");
  }

  return (
    <div
      className="bg-transparent d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-50">
        <h1 className="text-center alert alert-info">EMPLOYEE SIGN IN</h1>

        {state.user.authFailure && (
          <h6 className="text-center alert alert-danger">
            Invalid Credentials
          </h6>
        )}

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={updateUsername}
              className="form-control form-control-lg mb-2"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="Enter Password"
              className="form-control form-control-lg mb-2"
              required
            />
          </div>

          <div>
            <input
              type="button"
              value="SIGN IN"
              onClick={SignInEmployee}
              className="btn btn-info btn-lg w-100"
            />
          </div>

        </form>
      </div>
    </div>
  );
};