import React from "react";

const DividerWithText = ({ content = "", colorText = "essential-subdued", colorDivider='essential-subdued' }) => {
  return (
    <div className="relative flex justify-center items-center my-3">
      <div className={`border w-[70%] border-[${colorDivider}]`}></div>
      <div className={`inline absolute text-[${colorText}] bg-background-base px-3`}>
        {content}
      </div>
    </div>
  );
};

export default DividerWithText;
