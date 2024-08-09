import React, { useState, useRef } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import ToggleSwitch from "./toggleSwitch";
import GreenButton from "../global/GreenButton";

const InputFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const submit = useRef();

  const labelClass = "text-sm font-medium";
  const inputClass = `bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] mb-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]`;

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaRegEye />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    console.log('here')
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data) console.log(data);
    } catch (error) {
      throw new Error(`Something went wrong... ${error}`);
    }
  };

  return (
    <>
      <form className="login w-[90%] sm:w-[65%] mx-auto">
        <label className={labelClass}>Email or username</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
          className={inputClass + "py-3"}
          required
        />

        <label className={labelClass}>Password</label>
        <div className={`${inputClass} flex items-center`}>
          <input
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`bg-[#121212] w-[100%] h-[100%] focus:outline-none`}
            required
          />
          <span className="hover:cursor-pointer hover:" onClick={handleToggle}>
            {icon}
          </span>
        </div>
        <div className="flex items-center mt-7">
          <ToggleSwitch />
          <label className="ml-4 text-xs">Remember me</label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="hidden"
          ref={submit}
        ></button>
      </form>
      <div
        className="mt-[40px]"
        onClick={() => {
          console.log(submit.current)
          submit.current.click();
        }}
      >
        <GreenButton content={"Log In"} className={"mx-auto sm:w-[65%]"} />
      </div>
    </>
  );
};

export default InputFrom;
