import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vercel_base_url } from "../../functions";

const SuggestedBlogs = () => {
  const { blogs } = useSelector((state) => state.blogReducer);
  const navigate = useNavigate();

  const [data, setData] = useState([...blogs]);
  data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl text-center text-rose-600 border-b-2 border-rose-600 font-bold">
        Newly Arrived
      </p>
      <div className="flex flex-col gap-5">
        {data.length > 0
          ? data.slice(0, 4).map((e) => {
              return (
                <div
                  key={e._id}
                  className="w-full lg:w-60 flex flex-col gap-2 "
                >
                  <button
                    onClick={() => {
                      window.location.href = `/${e._id}`;
                    }}
                    className="text-start text-xl font-bold cursor-pointer hover:text-blue-600"
                  >
                    {e.title.slice(0, 150)}
                  </button>
                  <img src={e.image} className="rounded-xl" />
                  <p
                    className="flex-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: `${e.description.slice(0, 100)}...`,
                    }}
                  ></p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SuggestedBlogs;
