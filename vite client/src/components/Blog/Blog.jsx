import { useEffect, useState } from "react";
import { getAllBlogs } from "../../functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../Store";
import { getTime } from "../../functions/utils";
import Tags from "../Tags/Tags";
import BlogSkeleton, { BlogSkeletonCard } from "../../skeleton/BlogSkeleton";

export default function Blog() {
  const { token } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const { blogs, isFetching, isError } = useSelector(
    (state) => state.blogReducer
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //FETCHING THE DATA FOR ALL THE BLOGS
  useEffect(() => {
    dispatch(blogActions.fetchBlogStart());
    let data = token;
    getAllBlogs(data)
      .then((res) => {
        dispatch(blogActions.fetchBlogSuccess(res.data.data));
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(blogActions.fetchBlogFail());
        setIsLoading(false);
      });
  }, []);

  if (isFetching || isLoading) {
    return (
      <div className="max-md:px-4 max-sm:py-20 py-28 gap-5 grid lg:grid-cols-3 lg:px-20 md:grid-cols-2 md:px-10">
        {[1, 2, 3, 4, 5].map((e, index) => {
          return <BlogSkeletonCard key={index} />;
        })}
      </div>
    );
  }

  if (blogs.length == 0) {
    return (
      <div className="px-20 text-center py-10 text-gray-500">
        No Blogs Found
      </div>
    );
  }

  return (
    <>
      {blogs.length > 0 ? (
        <div className="max-md:px-4 max-sm:py-20 py-28 gap-5 grid lg:grid-cols-3 lg:px-20 md:grid-cols-2 md:px-10">
          {blogs.map((e, i) => {
            return (
              <div className="flex flex-col gap-6 " id="blog" key={i}>
                <div className="">
                  <img
                    src={e.image}
                    alt=""
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-col md:flex-row md:justify-between md:gap-5 max-sm:gap-4 flex md:items-center text-gray-400">
                  <p>{getTime(e.updatedAt)}</p>
                  <div className="flex flex-row gap-4">
                    {e.tags.length > 0
                      ? e.tags.slice(0, 2).map((tagEvent, tagid) => {
                          return <Tags key={tagid} event={tagEvent} />;
                        })
                      : null}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/${e._id}`);
                  }}
                  className="self-start text-start font-bold text-2xl hover:text-blue-600 hover:cursor-pointer"
                >
                  {e.title}
                </button>
                <div
                  className="text-gray-400 flex-wrap break-words"
                  dangerouslySetInnerHTML={{
                    __html: `${e.description.slice(0, 400)}...`,
                  }}
                ></div>
                <div className="text-gray-400">
                  <p>Owner</p>
                  <p>{e.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-xl text-gray-400 ">
          No blogs found.
        </div>
      )}
    </>
  );
}
