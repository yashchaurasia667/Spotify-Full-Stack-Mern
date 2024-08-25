import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Error = ({ content = "", className = "hidden" }) => {
  return (
    <div
      className={
        "flex font-normal text-text-negative gap-x-2 items-center mt-2 text-sm " +
        className
      }
    >
      <HiOutlineExclamationCircle className="stroke-text-negative scale-150" />
      {content}
    </div>
  );
};

export default Error;
