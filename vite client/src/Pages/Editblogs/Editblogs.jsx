import React from "react";
import "./Editblogs.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editBlog, updateBlog } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { blogActions, userBlogActions } from "../../Store";
import Error from "../Error/Error";
import Loader from "../../components/Loader/Loader";
import SelectLanguages from "../../components/SelectLanguages/SelectLanguages";
import CodeHighligher from "../../components/CodeHighlighter/CodeHighlighter";

export default function Editblogs() {
  const { token } = useSelector((state) => state.userReducer);
  const { isFetching, isError } = useSelector((state) => state.userBlogReducer);
  const {} = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const params = useParams().id;

  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  useEffect(() => {
    // let token = token;
    editBlog(params, token)
      .then((res) => {
        settitle(res.data.data[0].title);
        setCode(res.data.data[0].code ? res.data.data[0].code : "");
        setLanguage(res.data.data[0].language ? res.data.data[0].language : "");
        setdescription(res.data.data[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changetitle = (e) => {
    settitle(e.target.value);
  };

  const changedescrip = (e) => {
    setdescription(e.target.value);
  };

  const changeCode = (e) => {
    setCode(e.target.value);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const changeimage = (e) => {
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
    try {
      dispatch(userBlogActions.fetchUserBlogStart());
      const res = await updateBlog(
        title,
        description,
        code,
        language,
        previewSource,
        token,
        params
      );
      dispatch(userBlogActions.fetchUserBlogSuccess(res.data.data));
      dispatch(blogActions.fetchBlogSuccess(res.data.allBlog));
      navigate("/");
    } catch (err) {
      dispatch(userBlogActions.fetchUserBlogFail());
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
        className="editblogs_div max-sm:px-4 max-md:px-10 px-20"
        onSubmit={submitHandler}
      >
        <textarea
          type="text"
          className="textarea textarea-secondary text-xl"
          placeholder="Title"
          value={title}
          name="title"
          required
          onChange={changetitle}
        />
        <textarea
          type="text"
          className="textarea textarea-secondary text-xl"
          placeholder="Description"
          value={description}
          onChange={changedescrip}
          name="description"
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
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          name="image"
          onChange={changeimage}
        />
        {previewSource && <img src={previewSource} alt="" />}
        <button>Update</button>
      </form>
    </div>
  );
}
