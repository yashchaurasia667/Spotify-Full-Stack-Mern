import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import Error from "../../global/error";
import Footer from "../../global/Footer";
import SignupContext from "../../../context/signupContext/SignupContext";

import "../../global/error.css";
import "./Step3.css";

import spotify from "/spotifyBw.svg";

const Step3 = () => {
  const {
    name,
    setName,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    gender,
    setGender,
    setStep,
  } = useContext(SignupContext);

  const nameRef = useRef();
  const yearRef = useRef();
  const dayRef = useRef();
  const genderRef = useRef();

  const inputClass =
    "bg-[#121212] border border-[#727272] hover:border-[#fff] rounded-[4px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[2px] px-4 py-3";
  const labelClass = "custom-radio-button flex gap-x-3 items-center my-1";

  const checkName = (e) => {
    setName(e);
    const elm = nameRef.current;
    if (!e) {
      elm.classList.add("error");
      elm.nextSibling.style.display = "flex";
      return;
    }
    elm.classList.remove("error");
    elm.nextSibling.style.display = "none";
  };

  const checkYear = (e) => {
    const elm = yearRef.current;
    if (e <= 9999) {
      setYear(e);
      elm.classList.remove("error");
    }
    if (!e) elm.classList.add("error");
  };

  const checkDay = (e) => {
    const elm = dayRef.current;
    if (e <= 99) {
      setDay(e);
      elm.classList.remove("error");
    }
    if (!e) elm.classList.add("error");
  };

  const handleNext = () => {
    if (name && year && day && gender) {
      setStep(3);
      return;
    }
    checkName(name);
    checkYear(year);
    checkDay(day);
  };

  return (
    <>
      <div className="bg-[#121212] w-[500px] text-white">
        <div className="bg-[#121212] flex justify-center">
          <img src={spotify} alt="Spofity logo" />
        </div>
        <StepCounter stepNo={2} stepName="Tell us about yourself" />
        <div className="px-[90px]">
          <form className="flex flex-col">
            {/* Name Field */}
            <div className="text-sm font-semibold mt-3 w-[325px]">
              <p>Name</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                This name will appear on your profile
              </p>
              <input
                type="text"
                value={name}
                ref={nameRef}
                onChange={(e) => checkName(e.target.value)}
                className={"neutral w-[100%]"}
              />
              <Error content={"Enter a name for your profile."} />
            </div>

            {/* Date of birth field */}
            <div className="text-sm font-semibold mt-6">
              <p>Date of birth</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                Why do we need your date of birth?{" "}
                <Link to="/signup" className="decoration underline">
                  Learn more.
                </Link>
              </p>

              <div className="flex gap-x-2">
                <input
                  type="number"
                  value={year}
                  placeholder="YYYY"
                  onChange={(e) => checkYear(e.target.value)}
                  ref={yearRef}
                  className={" w-[95px] neutral number"}
                  required
                />
                <select
                  className={inputClass + " w-[150px]"}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  <option value="1">January</option>
                  <option value="2">Feburary</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <input
                  type="number"
                  placeholder="dd"
                  value={day}
                  ref={dayRef}
                  onChange={(e) => checkDay(e.target.value)}
                  className={"neutral number w-[65px]"}
                  required
                />
              </div>
            </div>

            {/* Gender field */}
            <div className="text-sm font-semibold mt-[18px]">
              <p>Gender</p>
              <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
                We use your gender to help personalise our content
                recommendations and ads for you.
              </p>
              <div className="text-[15px] flex flex-wrap gap-x-6 font-normal">
                <label className={labelClass}>
                  <input
                    type="radio"
                    value={"Man"}
                    checked={gender === "Man"}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-radio-input"
                  />
                  <span className="custom-radio-indicator"></span>
                  <span>Man</span>
                </label>
                <label className={labelClass}>
                  <input
                    type="radio"
                    value={"Woman"}
                    checked={gender === "Woman"}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-radio-input"
                  />
                  <span className="custom-radio-indicator"></span>
                  <span>Woman</span>
                </label>
                <label className={labelClass}>
                  <input
                    type="radio"
                    value={"Non-binary"}
                    checked={gender === "Non-binary"}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-radio-input"
                  />
                  <span className="custom-radio-indicator"></span>
                  <span>Non-binary</span>
                </label>
                <label className={labelClass}>
                  <input
                    type="radio"
                    value={"Something else"}
                    checked={gender === "Something else"}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-radio-input"
                  />
                  <span className="custom-radio-indicator"></span>
                  <span>Something else</span>
                </label>
                <label className={labelClass}>
                  <input
                    type="radio"
                    value={"Prefer not to say"}
                    checked={gender === "Prefer not to say"}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-radio-input"
                  />
                  <span className="custom-radio-indicator"></span>
                  <span>Prefer not to say</span>
                </label>
                <div>
                  <Error content="Please select a gender" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <GreenButton
          content={"Next"}
          className={"mt-10 sm:w-[65%]"}
          onClick={handleNext}
        />
        <div className="w-[300px] mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Step3;
