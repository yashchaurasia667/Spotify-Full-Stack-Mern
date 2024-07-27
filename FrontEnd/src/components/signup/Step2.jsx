import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import StepCounter from "./StepCounter";
import GreenButton from "../global/GreenButton";
import Footer from "../global/Footer";

import spotify from "/spotifyBw.svg"

const Step2 = () => {
  const [password, setPassword] = useState();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaRegEye />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  return (
    <div className="bg-[#121212] w-[500px] text-white min-h-screen relative">
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <StepCounter stepNo={1} stepName={"Create a password"} />

      <div className="px-[90px] mt-6">
        <div className="text-sm font-semibold pb-1">Password</div>
        <div className="border border-[#727272] hover:border-[#fff] rounded-[4px] grid grid-cols-[9fr_1fr] h-[50px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[3px]">
          <input
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#121212] w-[100%] h-[100%] px-4 focus:outline-none"
            required
          />
          <span className="hover:cursor-pointer hover:" onClick={handleToggle}>
            {icon}
          </span>
        </div>

        <div className="grid gird-rows-4 gap-y-2 text-sm mt-5">
          <p className="font-semibold">Your password must contain atleast</p>
          <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
            <div className="border-2 border-[#727272] rounded-full h-3 w-3" ></div>
            <div>1 letter</div>
          </div>
          <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
            <div className="border-2 border-[#727272] rounded-full h-3 w-3" ></div>
            <div>1 number or special character (example: # ? ! &)</div>
          </div>
          <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
            <div className="border-2 border-[#727272] rounded-full h-3 w-3" ></div>
            <div>10 characters</div>
          </div>
        </div>
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
