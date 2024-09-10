import React from "react";

const DividerWithText = ({
  content = "",
  colorText = "#7c7c7c",
  className = "",
  borderClass = "border-background-tinted-highlight",
}) => {
  return (
    <div
      className={"relative flex justify-center items-center my-3 " + className}
    >
      <div className={`border-t-0 border w-[100%] ` + borderClass}></div>
      <div
        className={`inline absolute bg-background-base px-3`}
        style={{ color: colorText }}
      >
        {content}
      </div>
    </div>
  );
};

export default DividerWithText;
