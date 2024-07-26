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
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

export default function Editblogs() {
  const { token } = useSelector((state) => state.userReducer);
  const { isFetching, isError } = useSelector((state) => state.userBlogReducer);
  const {} = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const params = useParams().id;

  const [description, setDescription] = useState("");
  const [title, settitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // let token = token;
    editBlog(params, token)
      .then((res) => {
        settitle(res.data.data[0].title);
        setCode(res.data.data[0].code ? res.data.data[0].code : "");
        setLanguage(res.data.data[0].language ? res.data.data[0].language : "");
        setDescription(res.data.data[0].description);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const changetitle = (e) => {
    settitle(e.target.value);
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
    if (title.length > 200) {
      alert("title should be less than 400 characters.");
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

  if (isFetching || isLoading) {
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
        className="editblogs_div max-sm:px-4 max-md:px-10 px-20"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-2">
          <label className="text-gray-200">Title</label>
          <textarea
            type="text"
            className="textarea textarea-secondary text-xl"
            placeholder="Title"
            value={title}
            name="title"
            required
            onChange={changetitle}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200">Description</label>
          {/* <textarea
          type="text"
          className="textarea textarea-secondary text-xl"
          placeholder="Description"
          value={description}
          onChange={changedescrip}
          name="description"
          required
          /> */}
          <RichTextEditor text={description} setText={setDescription} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200">Select Languages</label>
          <SelectLanguages
            language={language}
            changeLanguage={changeLanguage}
          />
        </div>
        <div>
          <CodeHighligher code={code} language="c++" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200">Code</label>
          <textarea
            className="textarea textarea-secondary text-xl"
            type="text"
            placeholder="Code"
            name="code"
            value={code}
            onChange={changeCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-200">Select Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            name="image"
            onChange={changeimage}
          />
        </div>
        {previewSource && <img src={previewSource} alt="" />}

        <div className="editblogs_div_button">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}
