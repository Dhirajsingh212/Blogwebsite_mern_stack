import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBlogs } from "../../functions";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [array, setarray] = useState([]);
  const { token } = useContext(Context);
  let navigate = useNavigate();

  //FETCHING THE DATA FOR ALL THE BLOGS
  useEffect(() => {
    let data = token;
    getAllBlogs(data)
      .then((res) => {
        setarray(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //FOR GETTING TODAYS DATE
  let currentDate = new Date();

  // Define month names
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date
  let formattedDate =
    monthNames[currentDate.getMonth()] +
    " " +
    currentDate.getDate() +
    ", " +
    currentDate.getFullYear();

  //PICKING RANDOM STYLES FOR TAGS BORDER
  const randomStyles = [
    {
      background: "#c0c0aa",
      background: "-webkit-linear-gradient(to right, #1cefff, #c0c0aa)",
      background: "linear-gradient(to right, #1cefff, #c0c0aa)",
    },
    {
      background: "#67B26F",
      background: "-webkit-linear-gradient(to top, #4ca2cd, #67B26F)",
      background: "linear-gradient(to top, #4ca2cd, #67B26F)",
    },
    {
      background: "#ee0979",
      background: "-webkit-linear-gradient(to top, #ff6a00, #ee0979)",
      background: "linear-gradient(to top, #ff6a00, #ee0979)",
    },
    {
      background: "#ff00cc",
      background: "-webkit-linear-gradient(to top, #333399, #ff00cc)",
      background: "linear-gradient(to top, #333399, #ff00cc)",
    },
  ];

  //FOR GETTING RANDOM NUMBERS WITHIN A RANGE
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="max-md:px-4 max-sm:py-20 py-28 gap-5 grid lg:grid-cols-3 lg:px-10 md:grid-cols-2 md:px-10">
        {array
          ? array.map((e, i) => {
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
                    <p>{formattedDate}</p>
                    <div className="flex flex-row gap-4">
                      {[1, 2].map((e) => {
                        return (
                          <div
                            key={e}
                            className="p-0.5 rounded-md"
                            style={
                              randomStyles[getRandomInt(randomStyles.length)]
                            }
                          >
                            <div className="bg-gray-800 px-2.5 py-1.5 rounded-md">
                              Tags
                            </div>
                          </div>
                        );
                      })}
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
