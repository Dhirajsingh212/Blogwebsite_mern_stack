import React from "react";
import "./Myblogs.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { base_url, getUserBlogs } from "../../functions";

export default function Myblogs() {
  const { error, token, dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  const [data, setdata] = useState([]);

  useEffect(() => {
    let data = token;
    getUserBlogs(data)
      .then((res) => {
        setIsLoading(false);
        setdata(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
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
      <div className="text-lg font-sans font-bold flex flex-row gap-6 justify-end px-5 py-5">
        <button
          onClick={() => {
            navigate("/createblog");
          }}
          className="hover:text-green-500"
        >
          Create new blogs
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="hover:text-green-500"
        >
          Home
        </button>
      </div>
      <div className="flex flex-col py-10 gap-5 lg: px-20">
        {data.length > 0 ? (
          data.map((e, i) => (
            <>
              <div
                className="flex flex-col lg:flex-row lg:gap-5 lg:px-20 px-4"
                key={i}
              >
                <div className="myblogs_image flex-1">
                  <img
                    src={`${e.image}`}
                    className="object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className="max-w-screen-md py-10 flex-1">
                  <div className=" flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate(`/${e._id}`);
                      }}
                      className="p-0 m-0 self-start text-2xl font-bold hover:text-blue-500 hover:cursor-pointer"
                    >
                      {e.title}
                    </button>
                    <p className="text-gray-500">{e.description}</p>
                  </div>
                  <div className="text-xl flex flex-row justify-end gap-6">
                    <button
                      onClick={() => {
                        navigate(`/editblogs/${e._id}`);
                      }}
                      className="hover:text-green-500"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={async () => {
                        if (prompt("are you sure") === null) return;
                        const params = e._id;
                        dispatch({ type: "DELETE_BLOG_START" });
                        try {
                          await axios.delete(`${base_url}deleteblogs`, {
                            headers: { params, token },
                          });
                          dispatch({ type: "DELETE_BLOG_SUCCESS" });
                          navigate("/");
                        } catch (err) {
                          dispatch({ type: "DELETE_BLOG_FAIL" });
                        }
                      }}
                      className="hover:text-green-500"
                    >
                      <i className="fa-solid fa-calendar-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="text-center">Oops No record found</div>
        )}
      </div>
    </>
  );
}
