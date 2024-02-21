import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Comments = ({ commentsData }) => {
  const data = [...commentsData];

  if (data.length == 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-rose-600 border-b-4 border-rose-600">
          Comments
        </p>
        <p className="self-center text-xl text-gray-500">No comments found.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-2xl font-bold text-rose-600 border-b-4 border-rose-600">
        Comments
      </p>
      <div className="flex flex-col">
        {data.length > 0
          ? data.map((e, index) => {
              return (
                <div
                  key={index}
                  className="py-5 lg:py-10 flex flex-col lg:flex-row gap-4 items-center border-b-2 border-gray-800"
                >
                  <div className="flex sm:flex-row items-center lg:flex-col gap-2 self-start">
                    <img
                      className="object-cover rounded-full h-20 w-20"
                      src={e.userImage}
                    />
                    <p className="text-gray-500">{e.username}</p>
                  </div>
                  <div className="w-full self-center flex flex-col gap-4">
                    <p className="text-lg">{e.text}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Comments;
