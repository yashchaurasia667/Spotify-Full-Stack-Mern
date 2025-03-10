import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import SignupContext from "../../context/signupContext/SignupContext";

const StepCounter = ({ stepNo = 0, stepName = "" }) => {
  const gridStyle = {
    gridTemplateColumns: `${stepNo}fr ${3 - stepNo}fr`,
  };

  const context = useContext(SignupContext);
  if (!context) throw new Error("No signup context");
  const { step, setStep } = context;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/signup/${step}`);
  }, [step]);

  return (
    <>
      <div className={`w-[85%] grid mx-auto`} style={gridStyle}>
        <div className="border-2 border-[#1ed760]"></div>
        <div className="border-2 border-[#727272]"></div>
      </div>
      <div className="grid grid-cols-[1fr_10fr] text-[#a7a7a7] py-4 px-12">
        <button
          onClick={() => {
            setStep(step - 1);
          }}
        >
          <FaChevronLeft className="scale-150 hover:text-white" />
        </button>
        <div className="grid grid-rows-2 ">
          <div className="text-[#a7a7a7]">Step {stepNo} of 3</div>
          <div className="text-white font-medium text-[16px]">{stepName}</div>
        </div>
      </div>
    </>
  );
};

export default StepCounter;
