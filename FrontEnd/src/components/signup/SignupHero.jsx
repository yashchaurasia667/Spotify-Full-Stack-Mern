import React from "react";
import { useParams } from "react-router-dom";

import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Step4 from "./step4/Step4";

function SignupHero() {
  const { id } = useParams();

  const renderStep = (step) => {
    if (step == 1) return <Step1 />;
    if (step == 2) return <Step2 />;
    if (step == 3) return <Step3 />;
    if (step == 4) return <Step4 />;
  };

  return (
    <div className="bg-[#121212] flex justify-center">{renderStep(id)}</div>
  );
}

export default SignupHero;
