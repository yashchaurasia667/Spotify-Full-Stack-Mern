import React from "react";

import Step1 from "../components/signup/Step1";
import Step2 from "../components/signup/Step2";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return (
    <>
      <div className="bg-[#121212] flex justify-center">
        {/* <Step1 /> */}
        <Step2 />
      </div>
    </>
  );
};

export default SignUp;
