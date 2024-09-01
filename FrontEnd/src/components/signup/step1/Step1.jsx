import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import ContinueWith from "../../global/continueWith";
import DividerWithText from "../../global/DividerWithText";
import GreenButton from "../../global/GreenButton";
import Footer from "../../global/Footer";

import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "../../global/error.module.css";

import spotify from "/spotifyBw.svg";
import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import facebook from "../../../assets/facebook.svg";

const Step1 = () => {
  const [error, setError] = useState("hidden");
  const { setStep, email, setEmail, validateEmail } = useContext(SignupContext);
  const emailRef = useRef();

  const checkEmail = (e) => {
    const elm = emailRef.current.classList;
    setEmail(e);
    if (validateEmail(e)) {
      setError("hidden");
      elm.remove(styles.error);
      return;
    }
    setError("");
    elm.add(styles.error);
  };

  const handleNext = () => {
    if (validateEmail(email)) setStep(1);
    checkEmail(email);
  };

  return (
    <div className="text-white w-[500px]">
      {/* logo and heading stuff */}
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <p className="text-5xl font-bold text-center leading-[60px] w-[60%] mx-auto">
        Sign up to start listening
      </p>

      <div className="relative w-[90%] sm:w-[63%] grid grid-rows-2 items-end mx-auto mt-5">
        <label className="font-semibold text-[14px] pb-2">Email address</label>
        <input
          type="email"
          placeholder="name@domain.com"
          className={`${styles.neutral} ${styles.inputDiv} px-3 outline-none placeholder:text-[#a7a7a7]`}
          ref={emailRef}
          value={email}
          onChange={(e) => {
            checkEmail(e.target.value);
          }}
        />
        <div className={"flex gap-x-2 mt-2 mb-2 " + error}>
          <HiOutlineExclamationCircle className="stroke-[#f15e6c] scale-[175%]" />
          <p className="text-[#f15e6c] text-sm font-medium">
            This email is invalid. Make sure it's written like example@email.com
          </p>
        </div>
        <Link
          to={"/signup/phone"}
          className="font-medium decoration underline text-sm mt-3 text-[#1ed760]"
        >
          Use phone number instead.
        </Link>
      </div>

      <div className="mt-5" onClick={() => handleNext()}>
        <GreenButton content={"Next"} className="sm:w-[65%]" />
      </div>

      <div className="my-9">
        <DividerWithText content="or" colorText="#fff" />
      </div>

      <div className="continue-with-buttons sm:w-[72%] w-[100%] mx-auto">
        <ContinueWith platformName={"Google"} logoPath={google} />
        <ContinueWith platformName={"Facebook"} logoPath={facebook} />
        <ContinueWith platformName={"Apple"} logoPath={apple} />
      </div>

      <div className="my-10">
        <DividerWithText />
      </div>
      <div className="text-center text-[#a7a7a7]">
        Already have an account?{" "}
        <Link to={"/login"} className="text-white deocation underline">
          Log in here.
        </Link>
      </div>
      <div className="w-[300px] mx-auto xl:relative md:absolute md:bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Step1;
