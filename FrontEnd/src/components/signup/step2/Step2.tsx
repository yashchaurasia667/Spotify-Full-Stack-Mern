import { useState, useContext, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import PassRequirements from "./PassRequirements";

import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "./Step2.module.css";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("No signup context");
  const { step, setStep, password, setPassword } = context;

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [letter, setLetter] = useState(false);
  const [number, setNumber] = useState(false);
  const [len, setLen] = useState(false);

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

    const passElement = passDiv.current.classList;
    if (!(letterCheck && numberCheck && lenCheck)) {
      if (passElement.contains(styles.neutral)) {
        passElement.remove(styles.neutral);
        passElement.add(styles.error);
      }
    } else {
      if (passElement.contains(styles.error)) {
        passElement.remove(styles.error);
        passElement.add(styles.neutral);
      }
    }
  };

  const handleNext = () => {
    if (
      password.match(/[a-zA-Z]/) &&
      password.match(/[\d\W]/) &&
      password.length > 9
    ) {
      setStep(3);
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

      <div className="px-[30px] sm:px-[90px] mt-6">
        <div className="text-sm font-semibold pb-1">Password</div>
        <div className={`${styles.passwordDiv} px-4`}>
          <input
            type={type}
            value={password}
            onChange={(e) => checkPass(e.target.value)}
            className="bg-[#121212] w-[100%] h-[100%] focus:outline-none"
            required
          />
          <span className="hover:cursor-pointer hover:" onClick={handleToggle}>
            {icon}
          </span>
        </div>
        <PassRequirements letter={letter} number={number} len={len} />
      </div>

      <div className="mt-8 flex justify-center">
        <GreenButton
          content={"Next"}
          className="sm:w-[65%] w-[85%] hover:bg-[#3be477]"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
export default Step2;
