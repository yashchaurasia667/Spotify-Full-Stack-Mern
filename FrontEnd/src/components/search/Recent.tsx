import { Link } from "react-router-dom";
import GreenButton from "../../components/global/GreenButton";

import { IoCloseOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

import styles from "./recent.module.css";

const Recent = () => {
  return (
    <div>
      <p className="text-2xl mx-auto font-semibold">Recent Searches</p>
      <div className="w-[190px] relative rounded-md overflow-hidden cursor-pointer p-3 hover:bg-background-highlight">
        <button className="absolute right-3 rounded-[50%] bg-[#12121244]">
          <IoCloseOutline size={25} />
        </button>
        <img src="radio.png" className="rounded-md" />
        <div>
          <p className="mt-2">Your Top Songs 2024</p>
          <p className="text-sm text-text-subdued">By Spotify</p>
        </div>
        <GreenButton
          content={<FaPlay className="fill-background-base" />}
          className={`p-4 ${styles.play}`}
        />
      </div>
    </div>
  );
};

export default Recent;
