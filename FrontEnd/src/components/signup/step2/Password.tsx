import React, { useRef, useState, useContext } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import PassRequirements from "./PassRequirements";

import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "../../global/error.module.css";

const Password = () => {
  const { password, setPassword } = useContext(SignupContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [letter, setLetter] = useState("neutral");
  const [number, setNumber] = useState("neutral");
  const [len, setLen] = useState("neutral");
  const passDiv = useRef();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<FaRegEye />);
      return;
    }
    setType("password");
    setIcon(<FaRegEyeSlash />);
  };

  const checkPass = (pass) => {
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

  return (
    <>
      <div className="text-sm font-semibold pb-1">Password</div>
      <div ref={passDiv} className={`${styles.inputDiv} ${styles.neutral} px-4`}>
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
    </>
  );
};

export default Password;
