import React from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser, updateUser } from "../../functions";
import { useSelector } from "react-redux";
import { userActions } from "../../Store";
import Error from "../Error/Error";

export default function Profile() {
  let navigate = useNavigate();

  const { token, isFetching, isError } = useSelector(
    (state) => state.userReducer
  );

  const [data, setdata] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [img, setimg] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    getUser(token)
      .then((res) => {
        setdata(res.data.data[0]);
        setusername(res.data.data[0].username);
        setemail(res.data.data[0].email);
        setimg(res.data.data[0].profilePhoto);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser(email, username, previewSource, token);
    } catch (err) {
      console.log(err);
    }
    navigate("/profile");
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(token);
      dispatch(userActions.logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (isFetching) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>error</div>;
  }
  if (token === null) {
    return <Error errCode={"400"} errMsg={"Please Login"} />;
  }

  return (
    <>
      <div className="py-10 profile_div_main">
        <div className="profile_div">
          <img src={`${img}`} alt="" />
          <form
            className="profile_form"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              value={username}
              name="username"
              placeholder="username"
              onChange={(e) => {
                setusername(e.target.value);
              }}
              required
            />
            <input
              type="text"
              value={email}
              name="email"
              placeholder="email"
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="file"
              name="profilephoto"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                previewFile(file);
              }}
            />
            {previewSource && <img src={previewSource} alt="" />}
            <button className="profile_form_button">Update</button>
          </form>
          <button className="profile_form_button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
