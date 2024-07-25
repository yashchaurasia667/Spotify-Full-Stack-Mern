import React, { useState } from "react";
import { Link } from "react-router-dom";

import ContinueWith from "../global/continueWith";
import DividerWithText from "../global/DividerWithText";
import GreenButton from "../global/GreenButton";

import spotify from "/spotifyBw.svg";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import facebook from "../../assets/facebook.svg";

const Hero = () => {
  const inputClass = `bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]`;
  const [email, setEmail] = useState("");
  return (
    <div className="w-[500px] mx-auto text-white">
      <img src={spotify} alt="spotify logo" className="mx-auto scale-90" />
      <p className="text-[44px] font-bold text-center leading-[48px] w-[390px] mx-auto">
        Sign up to start listening
      </p>

      <div className="relative w-[63%] grid grid-rows-2 items-end mx-auto mt-5">
        <label htmlFor="email-input" className="font-normal text-[14px] pb-2">
          Email address
        </label>
        <input
          type="email"
          placeholder="name@domain.com"
          className={`email-input ${inputClass}`}
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <Link
          to={"/signup/phone"}
          className="font-medium decoration underline text-sm mt-3 text-[#1ed760]"
        >
          Use phone number instead.
        </Link>
      </div>

      <div className="mt-5">
        <GreenButton content={"Next"} />
      </div>

      <div className="my-9">
        <DividerWithText content="or" colorText="white" />
      </div>

      <div className="continue-with-buttons">
        <ContinueWith platformName={"Google"} logoPath={google} />
        <ContinueWith platformName={"Facebook"} logoPath={facebook} />
        <ContinueWith platformName={"Apple"} logoPath={apple} />
      </div>

      <div className="my-10">
        <DividerWithText />
      </div>
      <div className="text-center text-[#a7a7a7]">
        Already have an account? <Link to={'/login'} className="text-white deocation underline">Log in here.</Link>
      </div>
    </div>
  );
};

export default Hero;
