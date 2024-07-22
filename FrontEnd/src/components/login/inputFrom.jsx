import React from "react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import ToggleSwitch from "./toggleSwitch";

const InputFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const labelClass = "text-sm font-medium";
  const inputClass =
    "bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] mb-3 py-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]";

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaRegEye />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  const sliderStyle = {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "#fff",
    transition: ".4s",
  };

  return (
    <form action="" className="w-[65%] mx-auto">
      <label className={labelClass}>Email or username</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email or username"
        className={inputClass}
      />

      <label className={labelClass}>Password</label>
      <div className={`${inputClass} flex justify-between items-center`}>
        <input
          type={type}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-[#121212]"
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
