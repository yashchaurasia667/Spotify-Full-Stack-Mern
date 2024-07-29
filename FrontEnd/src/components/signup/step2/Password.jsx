import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import PassRequirements from "./PassRequirements";

const Password = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [letter, setLetter] = useState("neutral");
  const [number, setNumber] = useState("neutral");
  const [len, setLen] = useState("neutral");

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
    pass.match(/[a-zA-Z]/) ? setLetter(true) : setLetter(false)
    pass.match(/[\d\W]/) ? setNumber(true) : setNumber(false)
    pass.length > 9 ? setLen(true) : setLen(false)
  };

  return (
    <>
      <div className="text-sm font-semibold pb-1">Password</div>
      <div className="border hover:border-[#fff] rounded-[4px] grid grid-cols-[9fr_1fr] h-[50px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[3px]">
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
      <PassRequirements letter={letter} number={number} len={len} />
    </>
  );
};

export default Password;
