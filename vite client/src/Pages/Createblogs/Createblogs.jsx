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
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

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
    if (title.length > 200) {
      alert("title should be less than 400 characters.");
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
    <div className="md:py-10">
      <form
        className="createblogs_div px-20 md:py-10 max-sm:px-4 max-md:px-10"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-2">
          <label className="text-gray-200 font-sans">Title</label>
          <textarea
            type="text"
            className="textarea textarea-secondary text-xl"
            placeholder="Title"
            value={title}
            name="title"
            onChange={changetitle}
            required
          ></textarea>
        </div>
        {/* <textarea
          // className="textarea textarea-secondary text-xl"
          type="text"
          placeholder="Description"
          name="description"
          value={descrip}
          onChange={changedescrip}
          required
        /> */}
        <div className="flex flex-col gap-2 ">
          <label className="text-gray-200 font-sans">Description</label>
          <RichTextEditor text={descrip} setText={setdescrip} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200 font-sans">Select Languages</label>
          <SelectLanguages
            language={language}
            changeLanguage={changeLanguage}
          />
        </div>
        <div>
          <CodeHighligher code={code} language="c++" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200 font-sans">Code</label>
          <textarea
            className="textarea textarea-secondary text-xl"
            type="text"
            placeholder="Code"
            name="code"
            value={code}
            onChange={changeCode}
          />
        </div>

        {previewSource && <img src={previewSource} alt="" />}

        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          filename="image"
          onChange={changeimglink}
        />
        <div className="createblogs_div_button flex justify-end">
          <button type="submit" className="shadow-xl ">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
