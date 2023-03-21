import React from "react";
import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function Navbar() {
  let Navigate = useNavigate();
  const { token, dispatch } = useContext(Context);

  const [userdata, setuserdata] = useState("default.jpeg");

  useEffect(() => {
    if (token !== "null") {
      axios
        .get("https://blogmernapp.onrender.com/user/getdata", { headers: { token } })
        .then((res) => {
          setuserdata(res.data.data[0].profilePhoto);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (token === null) {
      document.getElementsByClassName("navbar_myblog")[0].style.display =
        "none";
      document.getElementsByClassName("navbar_myblog")[1].style.display =
        "none";
      document.getElementsByClassName("navbar_logout_button")[0].style.display =
        "none";
      document.getElementsByClassName("navbar_logout_button")[1].style.display =
        "none";
      document.getElementsByClassName("navbar_login_button")[0].style.display =
        "block";
      document.getElementsByClassName("navbar_login_button")[1].style.display =
        "block";
      document.getElementsByClassName("profile_photo")[0].style.display =
        "none";
      document.getElementsByClassName("profile_photo")[1].style.display =
        "none";
    }
  }, []);

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload(true);
  };

  const [flag, setflag] = useState(false);

  useEffect(() => {
    if (flag === true) {
      document.getElementsByClassName("navbar_ul_responsive")[0].style.display =
        "block";
    }
    if (flag === false) {
      document.getElementsByClassName("navbar_ul_responsive")[0].style.display =
        "none";
    }
  }, [flag]);

  const responsiveHandler = () => {
    setflag(!flag);
  };

  return (
    <>
      <div className="navbar_div container" id="navbar">
        <h2>CodeBlogs</h2>
        <ul className="navbar_ul">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#blog">Blogs</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li className="navbar_myblog">
            <a href="myblog">My Blogs</a>
          </li>
          <li className="navbar_logout_button">
            <button onClick={logoutHandler}>Logout</button>
          </li>
          <li className="navbar_login_button">
            <button
              onClick={() => {
                Navigate("/Login");
              }}
            >
              Login
            </button>
          </li>
          <li className="profile_photo">
            <img
              src={`${userdata}`}
              alt=""
              onClick={() => {
                Navigate("/profile");
              }}
            />
          </li>
        </ul>
        <div className="navbar_ul_responsive_button">
          <button onClick={responsiveHandler}>
            <i class="fa-solid fa-bars"></i>
          </button>
          <div className="profile_photo">
            <img
              src={`${userdata}`}
              alt=""
              onClick={() => {
                Navigate("/profile");
              }}
            />
          </div>
        </div>
      </div>

      <ul className="navbar_ul_responsive">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#blog">Blogs</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li className="navbar_myblog">
          <a href="myblog">My Blogs</a>
        </li>
        <li className="navbar_logout_button">
          <button onClick={logoutHandler}>Logout</button>
        </li>
        <li className="navbar_login_button">
          <button
            onClick={() => {
              Navigate("/Login");
            }}
          >
            Login
          </button>
        </li>
      </ul>
    </>
  );
}
