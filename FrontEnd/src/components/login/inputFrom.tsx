import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import ToggleSwitch from "./toggleSwitch";
import GreenButton from "../global/GreenButton";
import ErrorBanner from "../global/ErrorBanner";

import styles from "./login.module.css";

const InputFrom = () => {
  const { formInput } = styles;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [persistent, setPersistent] = useState(false);
  const [error, setError] = useState("");
  const [errorVisibility, setErrorVisibility] = useState("hidden");

  const submit = useRef<HTMLButtonElement>(null);

  const labelClass = "text-sm font-medium";

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

  const checkUser = async () => {
    try {
      const res = await fetch("/api/auth/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setErrorVisibility("visible");
        setError("User does not exist");
      }
      return res.ok;
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await checkUser()) {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          navigate("/");
        } else {
          setError("Incorrect Username or Password");
          setErrorVisibility("visible");
        }
      } catch (error) {
        throw new Error(`Something went wrong ${error}`);
      }
    }
  };

  // useEffect(() => console.log(persistent), [persistent]);

  return (
    <>
      <div className={`${errorVisibility} w-[95%] md:w-[70%] mb-5`}>
        <ErrorBanner content={error} />
      </div>
      <form
        className="login w-[90%] md:w-[45%] mx-auto"
        onSubmit={handleSubmit}
      >
        <label className={labelClass}>Email or username</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
          className={`${formInput}`}
          required
        />

        <label className={labelClass}>Password</label>
        <div className={`${formInput} flex items-center`}>
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
          <div onClick={() => setPersistent(!persistent)}>
            <ToggleSwitch />
          </div>
          <label className="ml-4 text-xs">Remember me</label>
        </div>

        <GreenButton
          content={"Log In"}
          className={
            "w-full mx-auto mt-10 hover:scale-[1.02] hover:bg-[#3be477]"
          }
          onClick={() => {
            if (submit.current) submit.current.click();
          }}
        />
      </form>
    </>
  );
};

export default InputFrom;
