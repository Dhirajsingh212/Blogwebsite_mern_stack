import React from "react";
import "./Oneblog.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleBlog } from "../../functions";
import Tags from "../../components/Tags/Tags";
import Error from "../Error/Error";
import SuggestedBlogs from "../../components/SuggestedBlogs/SuggestedBlogs";
import Comments from "../../components/Comments/Comments";
import PostComments from "../../components/PostComments/PostComments";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CodeHighligher from "../../components/CodeHighlighter/CodeHighlighter";

export default function Oneblog() {
  let params = useParams().id;
  const { token } = useSelector((state) => state.userReducer);

  const [data, setdata] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleBlog(params)
      .then((res) => {
        setdata(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, []);

  const setterFunc = (data) => {
    setdata(data);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Error errCode={"404"} errMsg={"Not Found Please Enter Valid Address"} />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 py-10 px-20 max-sm:px-4 max-md:px-5 ">
      <div className=" flex flex-col gap-5">
        <h2 className="text-3xl lg:text-4xl font-bold text-teal-400 capitalize flex-wrap break-words">
          {data.title}
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.tags.length > 0
            ? data.tags.map((tagEvent, tagid) => {
                return <Tags event={tagEvent} key={tagid} />;
              })
            : null}
        </div>
        <div className="flex flex-col gap-5">
          <img
            className="h-full w-full object-cover rounded-lg"
            src={`${data.image}`}
            alt=""
          />
          <div className="flex flex-col gap-4 w-full prose max-w-none">
            <p
              className="text-xl flex-wrap break-words"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></p>
            {data.code && (
              <div>
                <CodeHighligher code={data.code} language={data.language} />
              </div>
            )}
            <h5 className="flex flex-col text-gray-400 text-lg">
              <span>Owned</span>
              {data.username}
            </h5>
          </div>
        </div>
        {token && (
          <div>
            <PostComments setterFunc={setterFunc} />
          </div>
        )}
        <div>
          <Comments commentsData={data.comments} />
        </div>
      </div>
      <div className="">
        <SuggestedBlogs />
      </div>
    </div>
  );
}
