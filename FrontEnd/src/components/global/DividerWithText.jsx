import React from "react";

const DividerWithText = ({ content = "", color = "#727272" }) => {
  return (
    <div className="relative flex justify-center items-center my-3">
      <div className={`border w-[70%] border-[${color}]`}></div>
      <div className={`inline absolute text-[${color}] bg-[#121212] px-3`}>
        {content}
      </div>
    </div>
  );
};

export default DividerWithText;
