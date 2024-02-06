import React from "react";
import "./Oneblog.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getSingleBlog } from "../../functions";
import Tags from "../../components/Tags/Tags";

export default function Oneblog() {
  let params = useParams().id;

  const [data, setdata] = useState("");

  useEffect(() => {
    getSingleBlog(params)
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col py-10 px-20 max-sm:px-4 max-md:px-5 gap-5">
        <h2 className="text-4xl font-bold text-teal-400">{data.title}</h2>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => {
            return <Tags event={e} />;
          })}
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
