import React from "react";
import { getRandomInt } from "../../functions/utils";
import { randomStyles } from "../../functions/colors";

const Tags = (event) => {
  return (
    <div
      className="p-0.5 rounded-md capitalize break-words text-wrap"
      style={randomStyles[getRandomInt(randomStyles.length)]}
    >
      <div className="bg-gray-800 px-2.5 py-1.5 rounded-md ">
        {event !== null && typeof event.event !== "object"
          ? event.event.slice(0, 25)
          : null}
      </div>
    </div>
  );
};

export default Tags;
