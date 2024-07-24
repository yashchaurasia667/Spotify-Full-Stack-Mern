import React from "react";
import { Link } from "react-router-dom";

import ContinueWith from "../global/continueWith";
import InputFrom from "./inputFrom";
import GreenButton from "../global/GreenButton";

import spotify from "/spotifyBw.svg";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";

import colors from "../../styleSheets/colors";

const Hero = () => {
  const linkStyling = `mx-auto mt-8 hover:text-[#1fdf64] cursor-pointer text-center underline decoration-2`;
  return (
    <div
      className={`min-w-[100%] md:h-screen lg:min-w-[710px] h-[100%] lg:h-[1000px] text-white bg-[${colors.bgDark}] rounded-[10px] flex flex-col items-center lg:mt-9 lg:mb-28`}
    >
      <img src={spotify} className="scale-75" alt="Spotify Logo" />
      <p className="text-[32px] font-semibold mb-10">Log in to Spotify</p>
      <div className="button-container w[100%] sm:min-w-[275px] sm:w-[70%]">
        <ContinueWith logoPath={google} platformName={"Google"} />
        <ContinueWith logoPath={facebook} platformName={"Facebook"} />
        <ContinueWith logoPath={apple} platformName={"Apple"} />
        <ContinueWith logoPath={""} platformName={"Phone Number"} />

        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <InputFrom />
        <GreenButton content={"Log In"} />

        <div className="w-[100%] flex">
          <Link to={"/forgot-password"} className={linkStyling}>
            Forgot you password?
          </Link>
        </div>

        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      </div>
      <div
        className={`signup sm:pt-8 pb-16 text-[${colors.textGray}] font-medium`}
      >
        Don't have an account?
        <Link
          to={"/signup"}
          className={linkStyling + " ml-2 text-white font-normal"}
        >
          Sign up for Spotify
        </Link>
      </div>
    </div>
  );
};

export default Hero;
