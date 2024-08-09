import React from "react";

import Step1 from "../components/signup/step1/Step1";
import Step2 from "../components/signup/step2/Step2";
import Step3 from "../components/signup/step3/Step3";
import Step4 from "../components/signup/step4/Step4";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return (
    <SignupContextProvider>
      <div className="bg-[#121212] flex justify-center">
        <Step1 />
        {/* <Step2 /> */}
        {/* <Step3 /> */}
        {/* <Step4 /> */}
      </div>
    </SignupContextProvider>
  );
};

export default SignUp;
