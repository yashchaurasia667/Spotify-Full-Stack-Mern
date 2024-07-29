import React, { useState, useRef } from "react";

import StepCounter from "./StepCounter";
import Password from "./Password";
import GreenButton from "../../global/GreenButton";
import Footer from "../../global/Footer";

import spotify from "/spotifyBw.svg";

const Step2 = () => {
  return (
    <div className="bg-[#121212] w-[500px] text-white min-h-screen relative">
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <StepCounter stepNo={1} stepName={"Create a password"} />

      <div className="px-[90px] mt-6">
        <Password />
      </div>

      <div className="mt-8 flex justify-center">
        <GreenButton content={"Next"} />
      </div>

      <div className="w-[300px] mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <Footer />
      </div>
    </div>
  );
};
export default Step2;
