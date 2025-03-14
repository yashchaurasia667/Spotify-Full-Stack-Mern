import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import ErrorComponent from "../../global/Error";
import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "./Step3.module.css";

const Step3 = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("No signup context");
  const { step, setStep } = context;

  const [ageError, setAgeError] = useState("hidden");
  const [name, setName] = useState("");
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(0);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const inputClass =
    "bg-[#121212] border border-[#727272] hover:border-[#fff] rounded-[4px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[3px] px-4 py-3";
  const labelClass = `custom-radio-button flex gap-x-3 items-center my-1`;

  useEffect(() => {
    if (step != 3) navigate("/signup/");
  }, []);

  const checkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value) e.currentTarget.style.borderColor = "#e91429";
    else e.currentTarget.style.borderColor = "#fff";
  };

  const checkYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yr = parseInt(e.target.value);
    if (yr <= 9999) {
      setYear(yr);
      e.currentTarget.style.border = "#fff";
    }
    if (!yr) e.currentTarget.style.borderColor = "#e91429";
  };

  const checkDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dy = parseInt(e.target.value);
    // const elm = dayRef.current;
    if (dy <= 31) {
      setDay(dy);
      e.currentTarget.style.borderColor = "#fff";
    }
    if (!dy) e.currentTarget.style.borderColor = "#f15e6c";
  };

  const checkAge = (day: number, month: number, year: number) => {
    const today = new Date();
    let age = today.getFullYear() - year;

    const bdayThisYear = new Date(today.getFullYear(), month - 1, day);

    if (today < bdayThisYear) age--;

    return age >= 13;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkAge(day, month, year)) {
      setAgeError("");
      return;
    }
    setAgeError("hidden");
    if (name && year && day && gender) {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("year", year.toString());
      sessionStorage.setItem("day", day.toString());
      sessionStorage.setItem("gender", gender);
      sessionStorage.setItem("month", month.toString());
      setStep(4);
      navigate("/signup/4");
      return;
    }
  };

  return (
    <div className={"w-[100%] sm:w-[500px] text-white " + styles.step3}>
      <StepCounter stepNo={2} stepName="Tell us about yourself" />

      <div className="mx-auto sm:px-[90px]">
        <form
          className="flex flex-col items-center px-4 sm:px-0"
          onSubmit={handleNext}
        >
          {/* Name Field */}
          <div className="text-sm font-semibold mt-2 w-[324px]">
            <p>Name</p>
            <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
              This name will appear on your profile
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => checkName(e)}
              className={inputClass + " w-[100%]"}
              onInvalid={(e) => (e.currentTarget.style.borderColor = "#e91429")}
            />

            {/* <ErrorComponent
              content={"Enter a name for your profile."}
              className={"text-[#f15e6c]"}
              logoClass={"stroke-[#f15e6c]"}
            /> */}
          </div>

          {/* Date of birth field */}
          <div className="text-sm font-semibold mt-4">
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
                value={year || ""}
                placeholder="yyyy"
                onChange={(e) => checkYear(e)}
                className={`w-[95px] number ${inputClass}`}
                onInvalid={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#e91429";
                }}
                required
              />
              <select
                className={inputClass + " w-[150px]"}
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                required
              >
                <option value={1}>january</option>
                <option value={2}>feburary</option>
                <option value={3}>march</option>
                <option value={4}>april</option>
                <option value={5}>may</option>
                <option value={6}>june</option>
                <option value={7}>july</option>
                <option value={8}>august</option>
                <option value={9}>september</option>
                <option value={10}>october</option>
                <option value={11}>november</option>
                <option value={12}>December</option>
              </select>

              <input
                type="number"
                placeholder="dd"
                value={day || ""}
                onChange={(e) => checkDay(e)}
                className={`${inputClass} number w-[65px]`}
                onInvalid={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#e91429";
                }}
                required
              />
            </div>
            <ErrorComponent
              content={"You are too young to be using Spotify"}
              className={ageError}
            />
          </div>

          {/* Gender field */}
          <div className="text-sm font-semibold mt-4 w-[324px]">
            <p>Gender</p>
            <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
              We use your gender to help personalise our content recommendations
              and ads for you.
            </p>
            <div className="text-[15px] flex flex-wrap gap-x-6 font-normal">
              <label className={labelClass}>
                <input
                  type="radio"
                  value={"Man"}
                  checked={gender === "Man"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.customRadioInput}
                />
                <span className={styles.customRadioIndicator}></span>
                <span>Man</span>
              </label>
              <label className={labelClass}>
                <input
                  type="radio"
                  value={"Woman"}
                  checked={gender === "Woman"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.customRadioInput}
                />
                <span className={styles.customRadioIndicator}></span>
                <span>Woman</span>
              </label>
              <label className={labelClass}>
                <input
                  type="radio"
                  value={"Non-binary"}
                  checked={gender === "Non-binary"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.customRadioInput}
                />
                <span className={styles.customRadioIndicator}></span>
                <span>Non-binary</span>
              </label>
              <label className={labelClass}>
                <input
                  type="radio"
                  value={"Something else"}
                  checked={gender === "Something else"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.customRadioInput}
                />
                <span className={styles.customRadioIndicator}></span>
                <span>Something else</span>
              </label>
              <label className={labelClass}>
                <input
                  type="radio"
                  value={"Prefer not to say"}
                  checked={gender === "Prefer not to say"}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.customRadioInput}
                />
                <span className={styles.customRadioIndicator}></span>
                <span>Prefer not to say</span>
              </label>
            </div>
          </div>
          <GreenButton
            content={"Next"}
            className={"mt-10 w-full hover:bg-[#3be477]"}
          />
        </form>
      </div>
    </div>
  );
};

export default Step3;
