import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import Error from "../../global/Error";
import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "./Step3.module.css";

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
    step,
    setStep,
  } = useContext(SignupContext);

  const [ageError, setAgeError] = useState("hidden");

  const nameRef = useRef();
  const yearRef = useRef();
  const dayRef = useRef();

  const navigate = useNavigate();

  const inputClass =
    "bg-[#121212] border border-[#727272] hover:border-[#fff] rounded-[4px] items-center focus-within:outline-none focus-within:border-white focus-within:border-[2px] px-4 py-3";
  const labelClass = `custom-radio-button flex gap-x-3 items-center my-1`;

  useEffect(() => {
    if (step != 3) navigate("/signup/");
  }, []);

  const checkName = (e) => {
    setName(e);
    const elm = nameRef.current;
    if (!e) {
      elm.classList.add(styles.error);
      elm.nextSibling.classList.remove("hidden");
      return;
    }
    elm.classList.remove(styles.error);
    elm.nextSibling.classList.add("hidden");
  };

  const checkYear = (e) => {
    const elm = yearRef.current;
    if (e <= 9999) {
      setYear(parseInt(e));
      elm.classList.remove(styles.error);
    }
    if (!e) elm.classList.add(styles.error);
  };

  const checkDay = (e) => {
    const elm = dayRef.current;
    if (e <= 31) {
      setDay(parseInt(e));
      elm.classList.remove(styles.error);
    }
    if (!e) elm.classList.add(styles.error);
  };

  const checkAge = (day, month, year) => {
    const today = new Date();
    let age = today.getFullYear() - year;

    const bdayThisYear = new Date(today.getFullYear(), month - 1, day);

    if (today < bdayThisYear) age--;

    return age >= 13;
  };

  const handleNext = () => {
    if (!checkAge(day, month, year)) {
      setAgeError("");
      return;
    }
    setAgeError("hidden");
    if (name && year && day && gender) {
      setStep(4);
      navigate("/signup/4");
      return;
    }
    checkName(name);
    checkYear(year);
    checkDay(day);
  };

  return (
    <div className={"w-[100%] sm:w-[500px] text-white " + styles.step3}>
      <StepCounter stepNo={2} stepName="Tell us about yourself" />
      <div className="mx-auto sm:px-[90px]">
        <form className="flex flex-col items-center">
          {/* Name Field */}
          <div className="text-sm font-semibold mt-3 w-[324px]">
            <p>Name</p>
            <p className="font-medium text-[13px] text-[#a7a7a7] mb-2">
              This name will appear on your profile
            </p>
            <input
              type="text"
              value={name}
              ref={nameRef}
              onChange={(e) => checkName(e.target.value)}
              className={styles.neutral + " w-[100%]"}
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
                placeholder="yyyy"
                onChange={(e) => checkYear(e.target.value)}
                ref={yearRef}
                className={`w-[95px] ${styles.neutral} number`}
                required
              />
              <select
                className={inputClass + " w-[150px]"}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
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
                value={day}
                ref={dayRef}
                onChange={(e) => checkDay(e.target.value)}
                className={`${styles.neutral} number w-[65px]`}
                required
              />
            </div>
            <Error
              content={"You are too young to be using Spotify"}
              className={ageError}
            />
          </div>

          {/* Gender field */}
          <div className="text-sm font-semibold mt-[18px] w-[324px]">
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
        </form>
      </div>
      <GreenButton
        content={"Next"}
        className={"mt-10 w-[85%] sm:w-[65%] hover:bg-[#3be477]"}
        onClick={handleNext}
      />
    </div>
  );
};

export default Step3;
