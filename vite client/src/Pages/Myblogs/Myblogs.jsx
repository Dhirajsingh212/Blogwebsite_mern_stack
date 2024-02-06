import React from "react";
import "./Myblogs.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base_url, getUserBlogs } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { blogActions, userBlogActions } from "../../Store";
import Error from "../Error/Error";
import Tags from "../../components/Tags/Tags";

export default function Myblogs() {
  const { token } = useSelector((state) => state.userReducer);
  const { userBlogs, isFetching, isError } = useSelector(
    (state) => state.userBlogReducer
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let data = token;
    if (token === null) return;
    dispatch(userBlogActions.fetchUserBlogStart());
    getUserBlogs(data)
      .then((res) => {
        dispatch(
          userBlogActions.fetchUserBlogSuccess(
            res.data.data ? res.data.data : []
          )
        );
      })
      .catch((err) => {
        dispatch(userBlogActions.fetchUserBlogFail());
      });
  }, []);

  if (isFetching) {
    return <div className="loading"></div>;
  }
  if (isError) {
    return (
      <Error errCode={"404"} errMsg={"Something Went Wrong Please Refresh"} />
    );
  }

  if (token === null) {
    return <Error errCode={"400"} errMsg={"Please Login"} />;
  }

  return (
    <>
      <div className="flex flex-col py-10 gap-5 lg:px-14">
        {userBlogs.length > 0 ? (
          userBlogs.map((e, i) => (
            <div key={i}>
              <div className="flex flex-col lg:flex-row lg:gap-5 lg:px-20 px-4">
                <div className="myblogs_image flex-1">
                  <img
                    src={`${e.image}`}
                    className="w-full h-full object-cover rounded-lg"
                    alt=""
                  />
                </div>
                <div className="max-w-screen-md py-10 flex-1  flex flex-col gap-4">
                  <div className="flex flex-row gap-3">
                    {[1, 2, 3].map((e) => {
                      return <Tags event={e} />;
                    })}
                  </div>
                  <div className=" flex flex-col gap-4">
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
                        if (prompt("Are you sure") === null) return;
                        const params = e._id;
                        try {
                          const res = await axios.delete(
                            `${base_url}deleteblogs`,
                            {
                              headers: { params, token },
                            }
                          );
                          dispatch(
                            userBlogActions.fetchUserBlogSuccess(res.data.data)
                          );
                          dispatch(
                            blogActions.fetchBlogSuccess(res.data.allBlog)
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      className="hover:text-red-500"
                    >
                      <i className="fa-solid fa-calendar-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Oops No record found</div>
        )}
      </div>
    </>
  );
}
