import React from "react";
import ContinueWith from "./continueWith";
import InputFrom from "./inputFrom";

import spotify from "../../../public/spotifyBw.svg";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";

const Hero = () => {
  return (
    <div className="min-w-[710px] h-[90%] text-white bg-[#121212] rounded-[10px] flex flex-col justify-start items-center mt-9">
      <img src={spotify} className="scale-75" alt="Spotify Logo" />
      <p className="text-4xl font-semibold mb-10">Login to Spotify</p>
      <div className="button-container min-w-[275px] w-[70%]">
        <ContinueWith logoPath={google} platformName={"Google"} />
        <ContinueWith logoPath={facebook} platformName={"Facebook"} />
        <ContinueWith logoPath={apple} platformName={"Apple"} />
        <ContinueWith logoPath={""} platformName={"Phone Number"} />

        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <InputFrom />
      </div>
    </div>
  );
};

export default Hero;
