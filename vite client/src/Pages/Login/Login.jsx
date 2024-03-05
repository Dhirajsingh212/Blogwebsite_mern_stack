import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import Error from "../Error/Error";
import Loader from "../../components/Loader/Loader";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((state) => state.userReducer);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const changeusrname = (e) => {
    setusername(e.target.value);
  };

  const changepasswrd = (e) => {
    setpassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userActions.authStart());
    try {
      const res = await loginFunction(username, password);

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
      <div className="signup_link_div">
        <button onClick={() => navigate("/signup")} className="signup_link">
          Signup
        </button>
        <button onClick={() => navigate("/")} className="signup_link">
          Home
        </button>
      </div>
      <div className="login_div container">
        <p>Log Into QuickInsight</p>
        <form className="container login_input" onSubmit={submitHandler}>
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={changeusrname}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={changepasswrd}
            required
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
