import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ContinueWith from "../../global/continueWith";
import DividerWithText from "../../global/DividerWithText";
import GreenButton from "../../global/GreenButton";
import ErrorComponent from "../../global/Error";

import SignupContext from "../../../context/signupContext/SignupContext";

import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import facebook from "../../../assets/facebook.svg";

import step1Styles from "./Step1.module.css";

const Step1 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorVisibility, setErrorVisibility] = useState("hidden");

  const context = useContext(SignupContext);
  if (!context) throw new Error("no signup context");
  const { setStep, checkUser } = context;

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
      setErrorVisibility("hidden");
      e.currentTarget.style.borderColor = "#fff";
      return true;
    }
    e.currentTarget.style.borderColor = "#e91429";
    setError(
      "This email is invalid. Make sure it's written like example@email.com"
    );
    setErrorVisibility("visible");
    return false;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await checkUser(email)) {
      setErrorVisibility("visible");
      setError("A user with this email already exists. Please log in");
    } else {
      if (/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        localStorage.setItem("email", email);
        setStep(2);
        navigate("/signup/2");
      } else {
        setError(
          "This email is invalid. Make sure it's written like example@email.com"
        );
        setErrorVisibility("visible");
      }
    }
  };

  return (
    <div className={step1Styles.step1}>
      {/* logo and heading stuff */}
      <p className="text-5xl font-bold text-center leading-[60px] w-[60%] mx-auto">
        Sign up to start listening
      </p>

      <form onSubmit={handleNext}>
        <div className="relative w-[90%] sm:w-[63%] grid grid-rows-2 items-end mx-auto ">
          <label className="font-semibold text-[14px] pb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            required
            className={`${step1Styles.inputBox}`}
            value={email}
            onChange={(e) => {
              checkEmail(e);
            }}
            onInvalid={(e) => {
              e.preventDefault();
              setError(
                "This email is invalid. Make sure it's written like example@email.com"
              );
              setErrorVisibility("visible");
            }}
            onInput={(e) => {
              if (e.currentTarget.validity.valid) setErrorVisibility("hidden");
            }}
          />

          <ErrorComponent
            content={error}
            className={`font-medium text-sm text-text-negative ${errorVisibility}`}
            logoClass="stroke-text-negative scale-[200%]"
          />

          <Link
            to={"/signup/phone"}
            className="font-medium decoration underline text-sm mt-3 text-[#1ed760]"
          >
            Use phone number instead.
          </Link>
        </div>

        <GreenButton
          content={"Next"}
          className="sm:w-[65%] w-[90%] mx-auto mt-9 hover:scale-[1.02] hover:bg-[#3be477]"
        />
      </form>

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
    </div>
  );
};

export default Step1;
