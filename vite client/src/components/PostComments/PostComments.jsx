import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { postComment } from "../../functions";
import { useParams } from "react-router-dom";

const PostComments = ({ setterFunc }) => {
  const { token } = useSelector((state) => state.userReducer);
  const params = useParams();

  const [text, setText] = useState("");
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await postComment(text, token, params.id);
      setterFunc(res.data.blog[0]);
      setText("");
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl text-rose-600 font-bold border-b-4 border-rose-600">
        Add Comments
      </p>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your comments here."
          className="px-2 font-sans rounded-md  h-10 w-full border-none focus:outline-none"
        />
        <button className="max-sm:self-center self-end text-lg bg-[#5f1ad6] rounded-md px-10 py-1">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostComments;
