import React from "react";
import "./Blog.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Blog() {
  const [array, setarray] = useState([]);

  useEffect(() => {
    axios
      .get("https://blogmernapp.onrender.com/getallblogs")
      .then((res) => {
        setarray(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="blog_div_main">
        {array.map((e, i) => (
          <div className="blog_div" id="blog" key={i}>
            <img src={`${e.image}`} alt="" />
            <div className="blog_div_info">
              <h2>{e.title.slice(0, 50)}.</h2>
              <p>
              {e.description.slice(0, 50)}..
                <a className="blog_div_text_link" href={`/${e._id}`}>
                  more
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
