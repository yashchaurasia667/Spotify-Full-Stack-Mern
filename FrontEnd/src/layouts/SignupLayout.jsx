import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/global/Footer";

import spotify from "/spotifyBw.svg";

const SignupLayout = () => {
  document.querySelector("#favicon").href = "spotifyBlack.svg";
  return (
    <div className="bg-background-base">
      <div className="flex items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <Outlet />
      <Footer className="w-[300px] sm:w-full mx-auto relative sm:absolute lg:relative bottom-0" />
    </div>
  );
};

export default SignupLayout;
