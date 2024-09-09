import React from "react";

const DividerWithText = ({
  content = "",
  colorText = "#7c7c7c",
  colorDivider = "#7c7c7c",
  width = "100%",
}) => {
  return (
    <div
      className="relative flex justify-center items-center my-3"
      style={{ width }}
    >
      <div
        className={`border ${width}`}
        style={{ border: `1px solid ${colorDivider}` }}
      ></div>
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
