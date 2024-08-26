import React from "react";
import { FaPlay } from "react-icons/fa";

const ArtistCard = ({ name = "", type = "album", img = "" }) => {
  return (
    <button className="bg-transparent hover:bg-background-highlight w-[160px] px-2 py-3 rounded-md text-left">
      <div>
        {img != "" ? (
          <img
            src={img}
            alt={name}
            className={`${
              type === "album" ? "rounded-[5px]" : "rounded-[50%]"
            } w-full`}
          />
        ) : (
          ""
        )}
      </div>
      <div className="text-md text-white">{name}</div>
      <div className="text-sm text-text-subdued mb-6">{type}</div>
    </button>
  );
};

export default ArtistCard;
