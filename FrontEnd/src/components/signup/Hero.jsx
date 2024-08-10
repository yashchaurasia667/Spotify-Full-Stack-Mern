import React, { useContext } from "react";
import SignupContext from "../../context/signupContext/SignupContext";

import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Step4 from "./step4/Step4";

function Hero() {
  const { step } = useContext(SignupContext);

  const renderStep = (step) => {
    if (step == 0) return <Step1 />;
    if (step == 1) return <Step2 />;
    if (step == 2) return <Step3 />;
    if (step == 3) return <Step4 />;
  };

  return (
    <div className="bg-[#121212] flex justify-center">{renderStep(step)}</div>
  );
}

export default Hero;
