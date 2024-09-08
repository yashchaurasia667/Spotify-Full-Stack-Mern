import React, { useContext } from "react";

import StepCounter from "../StepCounter";
import Password from "./Password";
import GreenButton from "../../global/GreenButton";

import SignupContext from "../../../context/signupContext/SignupContext";

import { step2 } from "./Step2.module.css";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
  const { setStep, password, checkPass } = useContext(SignupContext);
  const navigate = useNavigate();

  const handleNext = () => {
    if (
      password.match(/[a-zA-Z]/) &&
      password.match(/[\d\W]/) &&
      password.length > 9
    ) {
      setStep(2);
      navigate("/signup/3");
    }
  };

  return (
    <div className={"bg-[#121212] w-[500px] text-white relative " + step2}>
      <StepCounter stepNo={1} stepName={"Create a password"} />

      <div className="px-[30px] sm:px-[90px] mt-6">
        <Password />
      </div>

      <div className="mt-8 flex justify-center">
        <GreenButton
          content={"Next"}
          className="sm:w-[65%] w-[85%] hover:bg-[#3be477]"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
export default Step2;
