import { useEffect } from "react";
import { getAllBlogs } from "../../functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../../Store";
import { getTime } from "../../functions/utils";
import Tags from "../Tags/Tags";

export default function Blog() {
  const { token } = useSelector((state) => state.userReducer);
  const { blogs } = useSelector((state) => state.blogReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //FETCHING THE DATA FOR ALL THE BLOGS
  useEffect(() => {
    let data = token;
    dispatch(blogActions.fetchBlogStart());
    getAllBlogs(data)
      .then((res) => {
        dispatch(blogActions.fetchBlogSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(blogActions.fetchBlogFail());
      });
  }, []);

  return (
    <>
      <div className="max-md:px-4 max-sm:py-20 py-28 gap-5 grid lg:grid-cols-3 lg:px-10 md:grid-cols-2 md:px-10">
        {blogs.length > 0
          ? blogs.map((e, i) => {
              return (
                <div className="flex flex-col gap-6 " id="blog" key={i}>
                  <div className="">
                    <img
                      src={e.image}
                      alt=""
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center text-gray-400">
                    <p>{getTime(e.updatedAt)}</p>
                    <div className="flex flex-row gap-4">
                      {e.tags
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
                    className="self-start font-bold text-2xl hover:text-blue-600 hover:cursor-pointer"
                  >
                    {e.title.slice(0, 30)}
                  </button>
                  <div className="text-gray-400">
                    {e.description.slice(0, 400)}
                  </div>
                  <div className="text-gray-400">
                    <p>Owner</p>
                    <p>{e.username}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
