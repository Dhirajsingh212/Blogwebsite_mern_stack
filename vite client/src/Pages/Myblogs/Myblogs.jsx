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
import MyBlogSkeleton from "../../skeleton/MyBlogSkeleton";
import Swal from "sweetalert2";

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
    return <MyBlogSkeleton />;
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3  lg:flex lg:flex-row lg:gap-3 flex-wrap">
                    {e.tags.length > 0
                      ? e.tags.map((tagEvent, tagid) => {
                          return <Tags event={tagEvent} key={tagid} />;
                        })
                      : null}
                  </div>
                  <div className=" flex flex-col gap-4">
                    <button
                      onClick={() => {
                        navigate(`/${e._id}`);
                      }}
                      className="p-0 m-0 text-left text-2xl font-bold hover:text-blue-500 hover:cursor-pointer"
                    >
                      {e.title.slice(0, 400)}
                    </button>
                    <p
                      className="text-gray-500 flex-wrap break-words"
                      dangerouslySetInnerHTML={{
                        __html: e.description.slice(0, 500),
                      }}
                    ></p>
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
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            const params = e._id;
                            try {
                              const res = await axios.delete(
                                `${base_url}deleteblogs`,
                                {
                                  headers: { params, token },
                                }
                              );
                              dispatch(
                                userBlogActions.fetchUserBlogSuccess(
                                  res.data.data
                                )
                              );
                              dispatch(
                                blogActions.fetchBlogSuccess(res.data.allBlog)
                              );
                            } catch (err) {
                              console.log(err);
                            }
                            Swal.fire({
                              title: "Deleted!",
                              icon: "success",
                            });
                          }
                        });
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
