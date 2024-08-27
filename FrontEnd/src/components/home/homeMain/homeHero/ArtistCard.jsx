import React from "react";
import { FaPlay } from "react-icons/fa";

import GreenButton from "../../../global/GreenButton";

import { play, main } from "./artistCard.module.css";

const ArtistCard = ({ name = "", type = "album", img = "" }) => {
  return (
    <button className={`${main} relative bg-transparent hover:bg-background-highlight w-[160px] px-2 py-3 rounded-md text-left`}>
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
        <GreenButton
          content={<FaPlay className="fill-background-base" />}
          className={`p-4 ${play}`}
        />
      </div>
      <div className="text-md text-white mt-2">{name}</div>
      <div className="text-sm text-text-subdued mb-6">{type}</div>
    </button>
  );
};

export default ArtistCard;
