import React from "react";
import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, logoutUser } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store";
import SearchBar from "../SearchBar/SearchBar";
import Swal from "sweetalert2";

export default function Navbar() {
  let navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [userdata, setuserdata] = useState("default.jpeg");

  useEffect(() => {
    if (token !== null) {
      getUser(token)
        .then((res) => {
          setuserdata(res.data.data[0].profilePhoto);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const logoutHandler = async () => {
    try {
      Swal.fire({
        title: "Are you sure?You want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logoutUser(token);
          dispatch(userActions.logout());
          Swal.fire({
            title: "Logout!",
            text: "Successfully Logged Out.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="navbar_div bg-black lg:fixed w-full lg:z-50 bg-transparent backdrop-blur-xl"
        id="navbar"
      >
        <h2>QuickInsight</h2>
        <ul className="navbar_ul text-xl font-bold">
          <li>
            <button
              className="hover:text-green-500"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
          </li>

          {token !== null ? (
            <li className="navbar_myblog">
              <button
                onClick={() => {
                  navigate("/myblog");
                }}
                className="hover:text-green-500"
              >
                My Blogs
              </button>
            </li>
          ) : null}
          {token !== null ? (
            <li>
              <button
                className="hover:text-green-500"
                onClick={() => {
                  navigate("/createblog");
                }}
              >
                Create New
              </button>
            </li>
          ) : null}

          {token !== null ? (
            <li className="navbar_logout_button">
              <button className="hover:text-green-500" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          ) : null}
          {token === null ? (
            <li className="navbar_login_button">
              <button
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </button>
            </li>
          ) : null}
          {token !== null ? (
            <li className="profile_photo">
              <img
                src={`${userdata}`}
                alt=""
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </li>
          ) : null}
          <li>
            <SearchBar />
          </li>
        </ul>
        <div className="navbar_ul_responsive_button">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50  menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </button>
              </li>
              {token !== null ? (
                <li>
                  <button
                    onClick={() => {
                      navigate("/myblog");
                    }}
                  >
                    My blogs
                  </button>
                </li>
              ) : null}
              {token !== null ? (
                <li>
                  <button
                    onClick={() => {
                      navigate("/createblog");
                    }}
                  >
                    Create new blog
                  </button>
                </li>
              ) : null}
              {token !== null ? (
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              ) : null}
              {token === null ? (
                <li>
                  <button
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    Login
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
          {token !== null ? (
            <div className="profile_photo">
              <img
                src={`${userdata}`}
                alt=""
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </div>
          ) : null}
          <div className="self-center">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* <ul className="navbar_ul_responsive">
        <li>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </li>
        {token !== null ? (
          <li className="navbar_myblog">
            <button
              onClick={() => {
                navigate("/myblog");
              }}
            >
              My blogs
            </button>
          </li>
        ) : null}
        {token !== null ? (
          <li className="navbar_myblog">
            <button
              onClick={() => {
                navigate("/createblog");
              }}
            >
              Create new blog
            </button>
          </li>
        ) : null}
        {token !== null ? (
          <li className="navbar_logout_button">
            <button onClick={logoutHandler}>Logout</button>
          </li>
        ) : null}
        {token === null ? (
          <li className="navbar_login_button">
            <button
              onClick={() => {
                navigate("/Login");
              }}
            >
              Login
            </button>
          </li>
        ) : null}
      </ul> */}
    </>
  );
}
