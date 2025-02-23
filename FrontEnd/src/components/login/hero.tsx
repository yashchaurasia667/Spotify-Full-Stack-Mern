import { Link } from "react-router-dom";

import ContinueWith from "../global/continueWith";
import InputFrom from "./inputFrom";
import DividerWithText from "../global/DividerWithText";

import spotify from "/spotifyBw.svg";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import apple from "../../assets/apple.svg";

import SignupContextProvider from "../../context/signupContext/SignupContextProvider";
import MainContextProvider from "../../context/mainContext/MainContextProvider";

const Hero = () => {
  const linkStyling = `mx-auto mt-8 hover:text-[#1fdf64] cursor-pointer text-center underline decoration-2`;

  return (
    <div className="md:w-[735px] w-[100%] md:mt-8 text-white bg-background-base rounded-[10px] flex flex-col items-center">
      <img src={spotify} className="scale-75" alt="Spotify Logo" />
      <p className="text-[2rem] font-semibold mb-10">Log in to Spotify</p>

      <div className="w-[100%] md:w-[350px]">
        <ContinueWith logoPath={google} platformName={"Google"} />
        <ContinueWith logoPath={facebook} platformName={"Facebook"} />
        <ContinueWith logoPath={apple} platformName={"Apple"} />
        <ContinueWith logoPath={""} platformName={"Phone Number"} />
      </div>

      <DividerWithText className="w-[70%] my-8" />

      <MainContextProvider>
        <SignupContextProvider>
          <InputFrom />
        </SignupContextProvider>
      </MainContextProvider>

      <div className="w-[100%] flex">
        <Link to={"/forgot-password"} className={linkStyling}>
          Forgot you password?
        </Link>
      </div>

      <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className="pb-16 text-[#a7a7a7] font-medium">
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
