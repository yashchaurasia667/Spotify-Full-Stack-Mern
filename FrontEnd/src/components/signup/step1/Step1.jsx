import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ContinueWith from "../../global/continueWith";
import DividerWithText from "../../global/DividerWithText";
import GreenButton from "../../global/GreenButton";
import Error from "../../global/Error";

import SignupContext from "../../../context/signupContext/SignupContext";

import styles from "../../global/error.module.css";

import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import facebook from "../../../assets/facebook.svg";

import { step1 } from "./Step1.module.css";

const Step1 = () => {
  const [error, setError] = useState("hidden");
  const [userExists, setUserExists] = useState(false);
  const { setStep, email, setEmail, validateEmail } = useContext(SignupContext);

  const emailRef = useRef();
  const navigate = useNavigate();

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

  const handleNext = async () => {
    if (validateEmail(email)) {
      try {
        const res = await fetch("/api/auth/checkuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        const data = await res.json();
        console.log(data.message);
        if (data.success) {
          setUserExists(false);
          setStep(2);
          navigate("/signup/2");
        } else {
          setUserExists(true);
        }
      } catch (error) {
        console.log(`Something went wrong checking email: ${error}`);
      }
    }
    checkEmail(email);
  };

  // useEffect(() => console.log(userExists), [userExists]);

  return (
    <div className={step1}>
      {/* logo and heading stuff */}
      <p className="text-5xl font-bold text-center leading-[60px] w-[60%] mx-auto">
        Sign up to start listening
      </p>

      <Error
        content={`A user with this email already exists. Please log in`}
        className={`font-semibold text-sm bg-essential-negative w-[80%] py-2 px-4 mx-auto ${
          userExists ? "opacity-1" : "opacity-0"
        }`}
      />

      <div className="relative w-[90%] sm:w-[63%] grid grid-rows-2 items-end mx-auto ">
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

        <Error
          content="This email is invalid. Make sure it's written like example@email.com"
          className={`font-medium text-sm text-text-negative ${error}`}
          logoClass="stroke-text-negative scale-[200%]"
        />

        <Link
          to={"/signup/phone"}
          className="font-medium decoration underline text-sm mt-3 text-[#1ed760]"
        >
          Use phone number instead.
        </Link>
      </div>

      <div className="mt-5" onClick={() => handleNext()}>
        <GreenButton
          content={"Next"}
          className="sm:w-[65%] w-[90%] mx-auto mt-4 hover:scale-[1.02] hover:bg-[#3be477]"
        />
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
    </div>
  );
};

export default Step1;
