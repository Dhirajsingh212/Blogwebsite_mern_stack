import React from "react";
import { useNavigate } from "react-router-dom";

const Error = ({ errCode, errMsg, disable }) => {
  const navigate = useNavigate();
  return (
    <main className="grid self-center min-h-full place-items-center px-6 py-20 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-600">{errCode}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
          {errMsg}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, there is some unwanted Error.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            hidden={disable ? true : false}
            onClick={() => {
              navigate("/");
            }}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
  );
};

export default Error;
