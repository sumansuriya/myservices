import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminCreateAction } from "../redux/AdminReducer";

export const AdminSignUp = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminmail, setAdminmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [key, setKey] = useState("");

 
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateAdminmail = (e) => setAdminmail(e.target.value);
  const updateFirstname = (e) => setFirstname(e.target.value);
  const updateLastname = (e) => setLastname(e.target.value);
  const updateKey= (e) => setKey(e.target.value);

 

  const signUpHere = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(AdminCreateAction({username, password, adminmail, firstname, lastname, key }));

      // clear the form
      setUsername("");
      setPassword("");
      setAdminmail("");
      setFirstname("");
      setLastname("");
      setKey("");
  
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
          TMS SIGN UP
        </h2>

        {state.admin.progress===true && (
          <h6 className="text-center alert alert-success">
            Registration Successfull
          </h6>
        )}

{state.admin.invalid===true && (
          <h6 className="text-center alert alert-danger">
            Invalid key entered
          </h6>
        )}

        <form ref={formEl} className="needs-validation" noValidate>
        
          <div>
            <input
              type="text"
              value={username}
              onChange={updateUsername}
              placeholder="Enter Username"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="Enter Password"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={adminmail}
              onChange={updateAdminmail}
              placeholder="Enter Email"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={firstname}
              onChange={updateFirstname}
              placeholder="Enter firstname"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={lastname}
              onChange={updateLastname}
              placeholder="Enter lastname"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={key}
              onChange={updateKey}
              placeholder="Enter security key"
              className="form-control form-control-lg mb-1"
              required
            />
          </div>

          <div>
            <input
              type="button"
              onClick={signUpHere}
              value="Register "
              className="btn btn-info btn-lg w-100"
            />
          </div>

          <div>
            <Link to="/admin-signin">
              <input
                type="button"
                value="Signin Here"
                className="btn btn-link w-100"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};