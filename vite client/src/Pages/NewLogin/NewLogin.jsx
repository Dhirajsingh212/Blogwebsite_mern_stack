import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../Store";
import { loginFunction } from "../../functions";
import Loader from "../../components/Loader/Loader";
import Error from "../Error/Error";

const NewLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((state) => state.userReducer);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const changeusrname = (e) => {
    setusername(e.target.value);
  };

  const changepasswrd = (e) => {
    setpassword(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(userActions.authStart());
      const res = await loginFunction(username, password);

      dispatch(userActions.authSuccess(res.data.token));
      navigate("/");
    } catch (err) {
      dispatch(userActions.authFail());
      console.log(err);
      setErrMessage(err.response.data.message);
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  // if (isError) {
  //   return (
  //     <Error
  //       errCode={"404"}
  //       errMsg={"Something Went Wrong Please Refresh"}
  //       disable={true}
  //     />
  //   );
  // }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 shadow-2xl rounded-xl md:px-10 md:py-20"
        >
          <button
            className="self-end hover:text-[#245bd8]"
            onClick={() => {
              navigate("/");
            }}
          >
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={changeusrname}
              required
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={changepasswrd}
              required
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </label>
          <p className="text-rose-600 self-center">{errMessage}</p>
          <button
            type="submit"
            className="btn bg-[#5f1ad6] text-white hover:bg-[#5f1ad6]"
          >
            Login
          </button>
          <p className="self-center text-gray-400">
            Haven't registered yet?
            <button
              type="button"
              className="hover:text-[#245bd8]"
              onClick={() => navigate("/Signup")}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default NewLogin;
