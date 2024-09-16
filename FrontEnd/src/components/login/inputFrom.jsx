import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import ToggleSwitch from "./toggleSwitch";
import GreenButton from "../global/GreenButton";

const InputFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [persistent, setPersistent] = useState(false);

  const submit = useRef();

  const labelClass = "text-sm font-medium";
  const inputClass = `bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] mb-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]`;

  const navigate = useNavigate();

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
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.jwtToken);
        navigate("/");
      }
    } catch (error) {
      throw new Error(`Something went wrong... ${error}`);
    }
  };

  useEffect(() => console.log(persistent), [persistent]);

  return (
    <>
      <form className="login w-[90%] md:w-[45%] mx-auto">
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
          <ToggleSwitch onClick={() => setPersistent(!persistent)} />
          <label className="ml-4 text-xs">Remember me</label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="hidden"
          ref={submit}
        ></button>
      </form>
      <GreenButton
        content={"Log In"}
        className={
          "w-[90%] md:w-[45%] mx-auto mt-10 hover:scale-[1.02] hover:bg-[#3be477]"
        }
        onClick={() => submit.current.click()}
      />
    </>
  );
};

export default InputFrom;
