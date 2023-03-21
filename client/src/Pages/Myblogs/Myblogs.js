import React from "react";
import "./Myblogs.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";

export default function Myblogs() {
  const { error, isFetching, token, dispatch } = useContext(Context);

  let Navigate = useNavigate();

  const [data, setdata] = useState([]);

  useEffect(() => {
    var data = token;
    axios
      .get("https://blogmernapp.onrender.com/getBlogs", {
        headers: { data },
      })
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <>
      <div className="myblogs_div">
        <a href="/createblog">create new blogs</a>
        <a href="/">Home</a>
      </div>
      <div className="myblogs_div_main">
          {data.length === 0 ? (
            <div className="myblogs_message">Oops No record found</div>
          ) : (
            data.map((e, i) => (
              <>
                <div className="myblogs_map container" key={i}>
                  <div className="myblogs_map_img">
                    <img src={`${e.image}`} alt="" />
                  </div>
                  <div className="myblogs_map_descrip">
                    <div className="myblogs_map_text">
                      <h2>{e.title.slice(0, 50)}</h2>
                      <p>
                        {e.description.slice(0, 100)}...
                        <a href={`/${e._id}`} style={{ textDecoration: "none" }}>
                          more
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="myblogs_map_buttons">
                    <button
                      onClick={() => {
                        Navigate(`/editblogs/${e._id}`);
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={async () => {
                        const params = e._id;
                        dispatch({ type: "DELETE_BLOG_START" });
                        try {
                          await axios.delete("https://blogmernapp.onrender.com/deleteblogs", {
                            headers: { params, token },
                          });
                          dispatch({ type: "DELETE_BLOG_SUCCESS" });
                          Navigate("/");
                        } catch (err) {
                          dispatch({ type: "DELETE_BLOG_FAIL" });
                        }
                      }}
                    >
                      <i class="fa-solid fa-calendar-minus"></i>
                    </button>
                  </div>
                </div>
              </>
            ))
          )}
      </div>
    </>
  );
}
