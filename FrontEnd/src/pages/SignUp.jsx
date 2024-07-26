import React from "react";

import Footer from "../components/global/Footer";
import Step1 from "../components/signup/Step1";
import Step2 from "../components/signup/Step2";

import spotify from "/spotifyBw.svg";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return (
    <div className={`bg-[#121212] text-white`}>
      <div className="w-[500px] mx-auto">
        <img src={spotify} alt="spotify logo" className="mx-auto scale-90" />

        {/* <Step1 /> */}
        <Step2 />
      </div>

      <div className="w-[300px] mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
