import React from "react";
import { getRandomInt } from "../../functions/utils";
import { randomStyles } from "../../functions/colors";

const Tags = (event) => {
  return (
    <div
      key={event}
      className="p-0.5 rounded-md"
      style={randomStyles[getRandomInt(randomStyles.length)]}
    >
      <div className="bg-gray-800 px-2.5 py-1.5 rounded-md">Tags</div>
    </div>
  );
};

export default Tags;
