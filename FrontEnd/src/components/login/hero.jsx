import React from "react";
import ContinueWith from "./continueWith";
import InputFrom from "./inputFrom";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

import spotify from "../../../public/spotifyBw.svg";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";

const Hero = () => {
  const linkStyling =
    "mx-auto mt-8 hover:text-[#1fdf64] cursor-pointer text-center underline decoration-2";
  return (
    <div className="min-w-[710px] h-[90%] text-white bg-[#121212] rounded-[10px] flex flex-col justify-start items-center mt-9 mb-8">
      <img src={spotify} className="scale-75" alt="Spotify Logo" />
      <p className="text-[32px] font-semibold mb-10">Log in to Spotify</p>
      <div className="button-container min-w-[275px] w-[70%]">
        <ContinueWith logoPath={google} platformName={"Google"} />
        <ContinueWith logoPath={facebook} platformName={"Facebook"} />
        <ContinueWith logoPath={apple} platformName={"Apple"} />
        <ContinueWith logoPath={""} platformName={"Phone Number"} />

        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <InputFrom />
        <LoginButton />

        <div className="w-[100%] flex">
          <Link to={"/forgot-password"} className={linkStyling}>
            Forgot you password?
          </Link>
        </div>

        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      </div>
      <div className="signup pt-8 pb-16 text-[#a7a7a7] font-medium">
        Don't have an account?
        <Link className={linkStyling + " ml-2 text-white font-normal"}>
          Sign up for Spotify
        </Link>
      </div>
    </div>
  );
};

export default Hero;
