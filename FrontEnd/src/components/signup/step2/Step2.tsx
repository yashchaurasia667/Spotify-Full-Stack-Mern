import React, { useState, useContext, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import PassRequirements from "./PassRequirements";

import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "./Step2.module.css";

const Step2 = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("No signup context");
  const { step, setStep } = context;

  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [letter, setLetter] = useState(false);
  const [number, setNumber] = useState(false);
  const [len, setLen] = useState(false);
  const [error, setError] = useState("#fff");

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<FaRegEye />);
      return;
    }
    setType("password");
    setIcon(<FaRegEyeSlash />);
  };

  const checkPass = (pass: string) => {
    setPassword(pass);
    const letterCheck = pass.match(/[a-zA-Z]/);
    const numberCheck = pass.match(/[\d\W]/);
    const lenCheck = pass.length > 9;

    letterCheck ? setLetter(true) : setLetter(false);
    numberCheck ? setNumber(true) : setNumber(false);
    lenCheck ? setLen(true) : setLen(false);

    if (!(letterCheck && numberCheck && lenCheck)) {
      setError("#e91429");
      return false;
    }
    setError("#fff");
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPass(password)) {
      setStep(3);
      sessionStorage.setItem("password", password);
      navigate("/signup/3");
    }
  };

  useEffect(() => {
    if (step != 2) navigate("/signup/");
  }, []);

  return (
    <div
      className={"bg-[#121212] w-[500px] text-white relative " + styles.step2}
    >
      <StepCounter stepNo={1} stepName={"Create a password"} />

      <form onSubmit={handleNext}>
        <div className="px-[30px] sm:px-[90px] mt-6">
          <div className="text-sm font-semibold pb-1">Password</div>
          <div
            className={`${styles.passwordDiv} px-4`}
            style={{
              borderColor: error,
            }}
          >
            <input
              type={type}
              value={password}
              onChange={(e) => checkPass(e.target.value)}
              className="bg-[#121212] w-[100%] h-[100%] focus:outline-none"
              onInvalid={(e) => e.preventDefault()}
              required
            />
            <span
              className="hover:cursor-pointer hover:"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>

          <PassRequirements letter={letter} number={number} len={len} />
        </div>

        <div className="mt-8 flex justify-center">
          <GreenButton
            content={"Next"}
            className="sm:w-[65%] w-[85%] hover:bg-[#3be477]"
            // onClick={handleNext}
          />
        </div>
      </form>
    </div>
  );
};
export default Step2;
