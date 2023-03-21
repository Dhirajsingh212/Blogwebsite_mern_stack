import React from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function Signup() {
  let navigate = useNavigate();

  const { error, isFetching, dispatch } = useContext(Context);

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
    dispatch({ type: "SIGNUP_START" });

    try {
      const res = await axios.post("https://blogmernapp.onrender.com/signup", {
        email: email,
        username: usrname,
        password: passwrd,
        passwordConfirm: cnfpasswrd,
      });

      dispatch({ type: "SIGNUP_SUCCESS", payload: { token: res.data.token } });

      navigate("/");
    } catch (err) {
      dispatch({ type: "SIGNUP_FAIL" });
    }
  };

  if (isFetching) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="login_link_div">
        <a href="login" className="login_link">
          Login
        </a>
      </div>
      <div className="signup_div container">
        <p>Sign Into CodeBlog</p>
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
            placeholder="confirm Password"
            value={cnfpasswrd}
            onChange={changecnfpasswrd}
            required
          />
          <button>Signup</button>
        </form>
      </div>
    </>
  );
}
