import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupFunction } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import Error from "../Error/Error";
import Loader from "../../components/Loader/Loader";

export default function Signup() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isFetching } = useSelector((state) => state.userReducer);

  const [usrname, setusrname] = useState("");
  const [email, setemail] = useState("");
  const [passwrd, setpasswrd] = useState("");
  const [cnfpasswrd, setcnfpasswrd] = useState("");

  const changeusrname = (e) => {
    setusrname(e.target.value);
  };

  const changeemail = (e) => {
    setemail(e.target.value);
  };

  const changepasswrd = (e) => {
    setpasswrd(e.target.value);
  };

  const changecnfpasswrd = (e) => {
    setcnfpasswrd(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (passwrd !== cnfpasswrd) {
        alert("Password not same");
        return;
      }
      dispatch(userActions.authStart());
      const res = await signupFunction(email, usrname, passwrd, cnfpasswrd);

      dispatch(userActions.authSuccess(res.data.token));

      navigate("/");
    } catch (err) {
      dispatch(userActions.authFail());
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Error
        errCode={"404"}
        errMsg={"Something Went Wrong Please Refresh"}
        disable={true}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="login_link_div">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="login_link"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="login_link"
        >
          Home
        </button>
      </div>
      <div className="signup_div container">
        <p>Sign Into QuickInsight</p>
        <form className="container signup_input" onSubmit={submitHandler}>
          <input
            type="username"
            placeholder="Username"
            value={usrname}
            onChange={changeusrname}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeemail}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={passwrd}
            onChange={changepasswrd}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={cnfpasswrd}
            onChange={changecnfpasswrd}
            required
          />
          <button>Signup</button>
        </form>
      </div>
    </div>
  );
}
