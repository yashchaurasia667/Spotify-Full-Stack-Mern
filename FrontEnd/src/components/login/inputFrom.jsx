import React from "react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const InputFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideBtn, setHideBtn] = useState("hidden");

  const passwordToggle = () => {
    hideBtn === "hidden" ? setHideBtn("shown") : setHideBtn("hidden");
    console.log(hideBtn);
  };

  const labelClass = "text-sm font-medium";
  const inputClass =
    "bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] mb-3 py-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]";

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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={inputClass}
      />
      {/* <button onClick={passwordToggle}>
        <FaRegEyeSlash />
      </button> */}
    </form>
  );
};

export default InputFrom;
