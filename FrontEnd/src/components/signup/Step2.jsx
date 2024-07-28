import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye, FaCheck } from "react-icons/fa";

import StepCounter from "./StepCounter";
import GreenButton from "../global/GreenButton";
import Footer from "../global/Footer";
import "./Step2.css";

import spotify from "/spotifyBw.svg";

const Step2 = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [lenColor, setLenColor] = useState("#fff");
  const [letterColor, setLetterColor] = useState("#fff");
  const [digitColor, setDigitColor] = useState("#fff");
  const [passBorder, setPassBorder] = useState("#727272");
  const [content, setContent] = useState(
    <FaCheck className="h-2 w-2 text-[#121212]" />
  );

  const lenStyle = { color: lenColor };
  const letterStyle = { color: letterColor };
  const digitStyle = { color: digitColor };
  const borderStyle = { borderColor: passBorder };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaRegEye />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  const checkPass = (pswd) => {
    setPassword(pswd);

    const letter = pswd.match(/[a-zA-Z]/);
    const specialDigit = pswd.match(/[\d\W]/);
    const len = pswd.length >= 10;

    letter
      ? () => {
          setLetterColor("#fff");
        }
      : setLetterColor("#f15e6c");
    specialDigit ? setDigitColor("#fff") : setDigitColor("#f15e6c");
    len ? setLenColor("#fff") : setLenColor("#f15e6c");

    !len || !letter || !specialDigit
      ? setPassBorder("#e91429")
      : setPassBorder("#727272");
  };

  return (
    <div className="bg-[#121212] w-[500px] text-white min-h-screen relative">
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <StepCounter stepNo={1} stepName={"Create a password"} />

      <div className="px-[90px] mt-6">
        <div className="text-sm font-semibold pb-1">Password</div>
        <div
          style={borderStyle}
          className="border hover:border-[#fff] rounded-[4px] grid grid-cols-[9fr_1fr] h-[50px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[3px]"
        >
          <input
            type={type}
            value={password}
            onChange={(e) => checkPass(e.target.value)}
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
            <div className="border-2 border-[#727272] rounded-full h-3 w-3">
              {content}
            </div>
            <div style={letterStyle} className="font-medium">
              1 letter
            </div>
          </div>
          <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
            <div className="border-2 border-[#727272] rounded-full h-3 w-3">
              {content}
            </div>
            <div style={digitStyle} className="font-medium">
              1 number or special character (example: # ? ! &)
            </div>
          </div>
          <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
            <div className="border-2 border-[#727272] rounded-full h-3 w-3">
              {content}
            </div>
            <div style={lenStyle} className="font-medium">
              10 characters
            </div>
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
