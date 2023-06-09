import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function Signup() {
  let navigate = useNavigate();

  const { error, isFetching, dispatch } = useContext(Context);

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
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://blogmernapp.onrender.com/login", {
        username,
        password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: { token: res.data.token } });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL" });
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
      <div className="signup_link_div">
        <a href="/signup" className="signup_link">
          Signup
        </a>
      </div>
      <div className="login_div container">
        <p>Log Into CodeBlog</p>
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
    </>
  );
}
