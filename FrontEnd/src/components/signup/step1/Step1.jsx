import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import ContinueWith from "../../global/continueWith";
import DividerWithText from "../../global/DividerWithText";
import GreenButton from "../../global/GreenButton";
import Footer from "../../global/Footer";

import SignupContext from "../../../context/signupContext/SignupContext";

import "../../global/error.css";

import spotify from "/spotifyBw.svg";
import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import facebook from "../../../assets/facebook.svg";

const Step1 = () => {
  const inputClass = `placeholder:text-[#a7a7a7]`;

  const [error, setError] = useState("hidden");
  const { setStep, email, setEmail, validateEmail } = useContext(SignupContext);
  const emailRef = useRef();

  const checkEmail = (e) => {
    const elm = emailRef.current.classList;
    setEmail(e);
    if (validateEmail(e)) {
      setError("hidden");
      elm.remove("error");
      return;
    }
    setError("");
    elm.add("error");
  };

  const handleNext = () => {
    if(validateEmail(email))
      setStep(1)
    checkEmail(email)
  };

  return (
    <div className="text-white w-[500px]">
      <div className="bg-[#121212] grid grid-rows-1 items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <p className="text-5xl font-bold text-center leading-[48px] w-[390px] mx-auto">
        Sign up to start listening
      </p>

      <div className="relative w-[90%] sm:w-[63%] grid grid-rows-2 items-end mx-auto mt-5">
        <label htmlFor="email-input" className="font-normal text-[14px] pb-2">
          Email address
        </label>
        <input
          type="email"
          placeholder="name@domain.com"
          className={"neutral emial-input " + inputClass}
          ref={emailRef}
          value={email}
          onChange={(e) => {
            checkEmail(e.target.value);
          }}
        />
        <div
          className={
            "bg-[#121212] text-[#f15e6c] flex gap-x-2 items-center mt-2 mb-2 " +
            error
          }
        >
          <HiOutlineExclamationCircle className="scale-150" />
          <p className="text-sm">{"Incorrect username or password."}</p>
        </div>
        <Link
          to={"/signup/phone"}
          className="font-medium decoration underline text-sm mt-3 text-[#1ed760]"
        >
          Use phone number instead.
        </Link>
      </div>

      <div
        className="mt-5"
        onClick={() => {
          handleNext();
        }}
      >
        <GreenButton content={"Next"} className="sm:w-[65%]" />
      </div>

      <div className="my-9">
        <DividerWithText content="or" colorText="white" />
      </div>

      <div className="continue-with-buttons">
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
