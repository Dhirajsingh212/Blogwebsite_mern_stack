import React from "react";
import "./Createblogs.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewBlog } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { blogActions, userBlogActions } from "../../Store";
import Error from "../Error/Error";
import Loader from "../../components/Loader/Loader";
import CodeHighligher from "../../components/CodeHighlighter/CodeHighlighter";
import SelectLanguages from "../../components/SelectLanguages/SelectLanguages";

export default function Createblogs() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const { userBlogs, isFetching, isError } = useSelector(
    (state) => state.userBlogReducer
  );
  const { blogs } = useSelector((state) => state.blogReducer);

  const [title, settitle] = useState("");
  const [descrip, setdescrip] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const changetitle = (e) => {
    settitle(e.target.value);
  };

  const changedescrip = (e) => {
    setdescrip(e.target.value);
  };

  const changeCode = (e) => {
    setCode(e.target.value);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const changeimglink = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (language === "") {
      alert("Please Enter Valid Language");
      return;
    }
    var data = token;
    try {
      dispatch(userBlogActions.fetchUserBlogStart());
      const res = await createNewBlog(
        data,
        title,
        descrip,
        previewSource,
        language,
        code
      );
      dispatch(userBlogActions.fetchUserBlogSuccess(res.data.data));
      dispatch(blogActions.fetchBlogSuccess(res.data.newBlog));
      navigate("/");
    } catch (err) {
      dispatch({ type: "NEW_BLOG_FAIL" });
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>error</div>;
  }

  if (token === null) {
    return <Error errCode={"400"} errMsg={"Please Login"} />;
  }

  return (
    <div className="py-10">
      <form
        className="createblogs_div px-20 py-10 max-sm:px-4 max-md:px-10"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <textarea
          type="text"
          className="textarea textarea-secondary text-xl"
          placeholder="Title"
          value={title}
          name="title"
          onChange={changetitle}
          required
        ></textarea>
        <textarea
          className="textarea textarea-secondary text-xl"
          type="text"
          placeholder="Description"
          name="description"
          value={descrip}
          onChange={changedescrip}
          required
        />
        <div>
          <SelectLanguages
            language={language}
            changeLanguage={changeLanguage}
          />
        </div>
        <div>
          <CodeHighligher code={code} language="c++" />
        </div>
        <textarea
          className="textarea textarea-secondary text-xl"
          type="text"
          placeholder="Code"
          name="code"
          value={code}
          onChange={changeCode}
        />

        {previewSource && <img src={previewSource} alt="" />}

        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          filename="image"
          onChange={changeimglink}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
