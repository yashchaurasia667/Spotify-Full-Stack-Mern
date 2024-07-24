import React from "react";

const DividerWithText = ({ content = "", colorText = "#727272", colorDivider='#727272' }) => {
  return (
    <div className="relative flex justify-center items-center my-3">
      <div className={`border w-[70%] border-[${colorDivider}]`}></div>
      <div className={`inline absolute text-[${colorText}] bg-[#121212] px-3`}>
        {content}
      </div>
    </div>
  );
};

export default DividerWithText;
