import React from "react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import ToggleSwitch from "./toggleSwitch";

import colors from "../../styleSheets/colors"

const InputFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const labelClass = "text-sm font-medium";
  const inputClass =
    `bg-[${colors.bgDark}] border border-[${colors.bgLight}] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] mb-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[${colors.textGray}]`;

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
    <form action="" className="w-[90%] sm:w-[65%] mx-auto">
      <label className={labelClass}>Email or username</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email or username"
        className={inputClass+'py-3'}
      />

      <label className={labelClass}>Password</label>
      <div className={`${inputClass} flex items-center`}>
        <input
          type={type}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`bg-[${colors.bgDark}] w-[100%] h-[100%] focus:outline-none`}
        />
        <span className="hover:cursor-pointer hover:" onClick={handleToggle}>
          {icon}
        </span>
      </div>
      <div className="flex items-center mt-7">
      <ToggleSwitch />
      <label className="ml-4 text-xs">Remember me</label>
      </div>
    </form>
  );
};

export default InputFrom;
