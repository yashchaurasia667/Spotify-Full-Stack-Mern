import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignupContext from "../../../context/signupContext/SignupContext";
import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";

import styles from "./step4.module.css";

const Step4 = () => {
  const navigate = useNavigate();

  const context = useContext(SignupContext);
  if (!context) throw new Error("No signup context");
  const { step } = context;

  useEffect(() => {
    if (step != 4) navigate("/signup/");
  }, []);

  const handleSubmit = async () => {
    // const email = localStorage.getItem("email");
    // const password = localStorage.getItem("password");

    const { email, password, name, gender } = sessionStorage;
    let { year, month, day } = sessionStorage;
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    try {
      const res = await fetch("/api/auth/signup", {
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
          gender,
        }),
      });

      if (res.ok) {
        fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("year");
        sessionStorage.removeItem("month");
        sessionStorage.removeItem("day");
        sessionStorage.removeItem("gender");
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
            Share my registration data with Spotify&apos;s content providers for
            marketing purposes.
            <input type="checkbox" className={styles.checkbox} name="data" />
            <span className={styles.checkmark}></span>
          </label>
        </form>
        <div className="text-sm mt-3">
          By clicking on &apos;Sign up&apos;, you agree to Spotify&apos;s{"  "}
          <a className="text-[#1fdf64] decoration underline">
            Terms and Conditions of Use
          </a>
          .
        </div>
        <div className="text-sm mt-3">
          To learn more about how Spotify collects, uses, shares and protects
          your personal data, please see{" "}
          <a className="text-[#1fdf64] decoration underline">
            Spotify&apos;s Privacy Policy
          </a>
          .
        </div>
      </div>
      <GreenButton
        className="w-[85%] sm:w-[65%] ml-[50%] -translate-x-1/2 mt-8 hover:bg-[#3be477]"
        content="Sign up"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Step4;
