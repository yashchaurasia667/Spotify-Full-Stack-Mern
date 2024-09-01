import React from "react";

const DividerWithText = ({
  content = "",
  colorText = "#7c7c7c",
  colorDivider = "#7c7c7c",
}) => {
  return (
    <div className="relative flex justify-center items-center my-3">
      <div
        className={`border w-[70%]`}
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
