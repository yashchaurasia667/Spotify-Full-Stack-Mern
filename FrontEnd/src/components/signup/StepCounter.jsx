import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

const StepCounter = ({
  stepNo = 0,
  stepName = "",
  color1 = "#727272",
  color2 = "#727272",
  color3 = "#727272",
}) => {
  const div1 = { borderColor: color1 };
  const div2 = { borderColor: color2 };
  const div3 = { borderColor: color3 };

  return (
    <>
      <div className="w-[90%] grid grid-cols-3">
        <div className="border-2" style={div1}></div>
        <div className="border-2" style={div2}></div>
        <div className="border-2" style={div3}></div>
      </div>
      <div className="grid grid-cols-[1fr_10fr] text-[#a7a7a7] py-4 px-8">
        <button>
          <FaChevronLeft className="scale-150 hover:text-white" />
        </button>
        <div className="grid grid-rows-2 ">
          <div>Step {stepNo} of 3</div>
          <div className="text-white font-medium text-[16px]">{stepName}</div>
        </div>
      </div>
    </>
  );
};

export default StepCounter;
