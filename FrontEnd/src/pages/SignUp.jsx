import React from "react";

import Step1 from "../components/signup/Step1";
import Step2 from "../components/signup/step2/Step2";
import Step3 from "../components/signup/Step3";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return (
    <>
      <div className="bg-[#121212] flex justify-center">
        {/* <Step1 /> */}
        {/* <Step2 /> */}
        <Step3/>
      </div>
    </>
  );
};

export default SignUp;
