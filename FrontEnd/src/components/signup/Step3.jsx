import React, { useState } from "react";

import StepCounter from "./StepCounter";

import spotify from "/spotifyBw.svg";

const Step3 = () => {
  const [name, setName] = useState("");
  return (
    <div className="bg-[#121212] w-[500px] text-white min-h-screen mt-2 relative">
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <StepCounter stepNo={2} stepName="Tell us about yourself" />
      <form className="grid grid-rows-3">
        <div className="text-sm font-semibold pb-1">
          <p>Name</p>
          <p className="font-medium text-[13px] text-[#a7a7a7]">This name will appear on your profile</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#121212] border border-[#727272] hover:border-[#fff] rounded-[4px] h-[50px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[3px]"
          />
        </div>
      </form>
    </div>
  );
};

export default Step3;
