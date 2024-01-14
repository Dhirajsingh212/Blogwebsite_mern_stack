import React, { useContext } from "react";
import "./Blog.css";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBlogs } from "../../functions";
import { Context } from "../../Context/Context";

export default function Blog() {
  const [array, setarray] = useState([]);
  const { token } = useContext(Context);

  useEffect(() => {
    let data = token;
    getAllBlogs(data)
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
