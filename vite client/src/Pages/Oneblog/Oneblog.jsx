import React from "react";
import "./Oneblog.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleBlog } from "../../functions";
import Tags from "../../components/Tags/Tags";
import Error from "../Error/Error";

export default function Oneblog() {
  let params = useParams().id;

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

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return (
      <Error errCode={"404"} errMsg={"Not Found Please Enter Valid Address"} />
    );
  }

  return (
    <>
      <div className="flex flex-col py-10 px-20 max-sm:px-4 max-md:px-5 gap-5">
        <h2 className="text-4xl font-bold text-teal-400 capitalize">
          {data.title}
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.tags
            ? data.tags.map((tagEvent, tagid) => {
                return <Tags event={tagEvent} key={tagid} />;
              })
            : null}
        </div>
        <div className="flex flex-col-reverse gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-xl">{data.description}</p>
            <h5 className="flex flex-col text-gray-400 text-lg">
              <span>Owned</span>
              {data.username}
            </h5>
          </div>
          <img
            className="h-full w-full object-cover rounded-lg"
            src={`${data.image}`}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
