import React from "react";

import ContinueWith from "../global/continueWith";
import DividerWithText from "../global/DividerWithText";
import GreenButton from "../global/GreenButton";

import spotify from "../../../public/spotifyBw.svg";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import facebook from "../../assets/facebook.svg";

const Hero = () => {
  const dividerClass = "py-6";
  return (
    <div className="w-[500px] mx-auto text-white text-center pb-5">
      <img src={spotify} alt="spotify logo" className="mx-auto scale-90" />
      <p className="text-[44px] font-bold leading-[48px] w-[390px] mx-auto">
        Sign up to start listening
      </p>

      <GreenButton content={"Next"} />

      <DividerWithText content="or" className={dividerClass} />
      <div className="continue-with-buttons">
        <ContinueWith platformName={"Google"} logoPath={google} />
        <ContinueWith platformName={"Facebook"} logoPath={facebook} />
        <ContinueWith platformName={"Apple"} logoPath={apple} />
      </div>

      <DividerWithText className={dividerClass} />
    </div>
  );
};

export default Hero;
