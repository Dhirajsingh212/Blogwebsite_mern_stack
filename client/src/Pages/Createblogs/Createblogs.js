import React from "react";
import "./Createblogs.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function Createblogs() {
  let Navigate = useNavigate();

  const { isFetching, error, token, dispatch } = useContext(Context);

  const [title, settitle] = useState("");
  const [descrip, setdescrip] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const changetitle = (e) => {
    settitle(e.target.value);
  };

  const changedescrip = (e) => {
    setdescrip(e.target.value);
  };

  const changeimglink = (e) => {
    const file=e.target.files[0];
    previewFile(file);
  };

  const previewFile =(file)=>{
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
        setPreviewSource(reader.result);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    var data = token;
    dispatch({ type: "NEW_BLOG_START" });
    try {
      await axios.post("https://blogmernapp.onrender.com/newBlogs",{title,descrip,previewSource}, {
        headers: { data },
      });
      dispatch({ type: "NEW_BLOG_SUCCESS" });
      Navigate("/");
    } catch (err) {
      dispatch({ type: "NEW_BLOG_FAIL" });
    }
  };

  if (isFetching) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (token === null) {
    return (
      <div>
        please <a href="/login">login</a>
      </div>
    );
  }

  return (
    <>
      <div className="createblogs_navigate ">
        <a href="/">Home</a>
      </div>
      <form
        className="createblogs_div container"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <textarea
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          onChange={changetitle}
          required
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          value={descrip}
          onChange={changedescrip}
          required
        />
        {previewSource && (<img src={previewSource} />)}
        <input required type="file" filename="image" onChange={changeimglink} />
        <button type="submit">Publish</button>
      </form>
    </>
  );
}
