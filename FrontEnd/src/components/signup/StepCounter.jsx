import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

const StepCounter = ({ stepNo = 0, stepName = "" }) => {
  const gridStyle = {
    gridTemplateColumns: `${stepNo}fr ${3 - stepNo}fr`,
  };
  return (
    <>
      <div className={`w-[85%] grid mx-auto`} style={gridStyle}>
        <div className="border-2 border-[#1ed760]"></div>
        <div className="border-2 border-[#727272]"></div>
      </div>
      <div className="grid grid-cols-[1fr_10fr] text-[#a7a7a7] py-4 px-12">
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
