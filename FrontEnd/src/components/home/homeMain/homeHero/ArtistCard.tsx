import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import GreenButton from "../../../global/GreenButton";

import styles from "./artistCard.module.css";

const ArtistCard = ({ name = "", type = "album", img = "" }) => {
  const { play, main } = styles;
  return (
    <Link
      to={"#"}
      className={`${main} relative bg-transparent hover:bg-background-highlight w-[155px] px-2 py-3 rounded-md text-left`}
    >
      <div>
        {img != "" ? (
          <img
            src={img}
            alt={name}
            className={`${
              type.toLocaleLowerCase() === "artist"
                ? "rounded-[50%]"
                : "rounded-[5px]"
            } w-[139px] h-[139px] object-cover`}
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
    </Link>
  );
};

export default ArtistCard;
