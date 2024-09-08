import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignupContext from "../../../context/signupContext/SignupContext";
import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";

import styles from "./step4.module.css";

const Step4 = () => {
  const navigate = useNavigate();
  const { email, password, name, year, month, day, setLoggedIn } =
    useContext(SignupContext);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          year,
          month,
          day,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error(`Failed to fetch from the Server ${error}`);
    }
  };

  return (
    <div
      className={"w-[100%] sm:w-[500px] text-white relative " + styles.step4}
    >
      <StepCounter stepNo={3} stepName="Terms & Conditions" />
      <div className="px-[30px] sm:px-[90px] mt-5">
        <form className="flex flex-col gap-y-2">
          <label className={styles.container}>
            I would prefer not to receive marketing messages from Spotify
            <input
              type="checkbox"
              className={styles.checkbox}
              name="marketing"
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>
            Share my registration data with Spotify's content providers for
            marketing purposes.
            <input type="checkbox" className={styles.checkbox} name="data" />
            <span className={styles.checkmark}></span>
          </label>
        </form>
        <div className="text-sm mt-3">
          By clicking on 'Sign up', you agree to Spotify's{"  "}
          <Link className="text-[#1fdf64] decoration underline">
            Terms and Conditions of Use
          </Link>
          .
        </div>
        <div className="text-sm mt-3">
          To learn more about how Spotify collects, uses, shares and protects
          your personal data, please see{" "}
          <Link className="text-[#1fdf64] decoration underline">
            Spotify's Privacy Policy
          </Link>
          .
        </div>
      </div>
      <GreenButton
        className="w-[85%] sm:w-[65%] mt-8 hover:bg-[#3be477]"
        content="Sign up"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Step4;
