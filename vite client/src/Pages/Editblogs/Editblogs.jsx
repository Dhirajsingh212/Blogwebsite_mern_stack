import React from "react";
import "./Editblogs.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { editBlog, updateBlog } from "../../functions";

export default function Editblogs() {
  const { error, isFetching, token, dispatch } = useContext(Context);

  let Navigate = useNavigate();

  const params = useParams().id;

  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  useEffect(() => {
    editBlog(params)
      .then((res) => {
        settitle(res.data.data[0].title);
        setdescription(res.data.data[0].description);
        console.log(res.data.data[0]);
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

    dispatch({ type: "UPDATE_BLOG_START" });
    try {
      await updateBlog(title, description, previewSource, token, params);
      dispatch({ type: "UPDATE_BLOG_SUCCESS" });
      Navigate("/");
    } catch (err) {
      dispatch({ type: "UPDATE_BLOG_FAIL" });
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
    <div className="py-10">
      <form
        className="editblogs_div max-sm:px-4 max-md:px-10 px-20"
        onSubmit={submitHandler}
      >
        <textarea
          type="text"
          value={title}
          name="title"
          required
          onChange={changetitle}
        />
        <textarea
          type="text"
          value={description}
          onChange={changedescrip}
          name="description"
          required
        />
        <input type="file" name="image" onChange={changeimage} />
        {previewSource && <img src={previewSource} alt="" />}
        <button>Update</button>
      </form>
    </div>
  );
}
