import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/global/Footer";

import spotify from "/spotifyBw.svg";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";

import { scroll } from "../styleSheets/scrollbarVisible.module.css";

const SignupLayout = () => {
  document.querySelector("#favicon").href = "spotifyBlack.svg";
  document.title = "Sign up - Spotify";

  return (
    <div className={"bg-background-base " + scroll}>
      <div className="top-logo flex items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <SignupContextProvider>
        <Outlet />
      </SignupContextProvider>
      <Footer className="w-[300px] sm:w-full mx-auto relative" />
    </div>
  );
};

export default SignupLayout;
