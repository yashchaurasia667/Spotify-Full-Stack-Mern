import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import spotify from "/spotifyBw.svg";

import SignupContext from "../../../context/signupContext/SignupContext";
import StepCounter from "../StepCounter";
import GreenButton from "../../global/GreenButton";
import Footer from "../../global/Footer";

import "./step4.css";

const Step4 = () => {
  const navigate = useNavigate();
  const { email, password, name, year, month, day } = useContext(SignupContext);

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
        navigate('/')
      }
    } catch (error) {
      console.error(`Failed to fetch from the Server ${error}`);
    }
  };
  return (
    <div className="bg-[#121212] w-[500px] text-white sm:h-screen relative">
      <div className="bg-[#121212] flex justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <StepCounter stepNo={3} stepName="Terms & Conditions" />
      <div className="px-[90px] mt-5">
        <form className="flex flex-col gap-y-2">
          <label className="container">
            I would prefer not to receive marketing messages from Spotify
            <input type="checkbox" className="checkbox" name="marketing" />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Share my registration data with Spotify's content providers for
            marketing purposes.
            <input type="checkbox" className="checkbox" name="data" />
            <span className="checkmark"></span>
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
        className="sm:w-[65%] mt-8"
        content="Sign up"
        onClick={handleSubmit}
      />
      <div className="w-[300px] mx-auto sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2">
        <Footer />
      </div>
    </div>
  );
};

export default Step4;
