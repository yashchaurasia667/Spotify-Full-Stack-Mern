import React, { useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Error = ({ content = "", className = "", logoClass = "" }) => {
  useEffect(() => {}, [className]);
  return (
    <div className={"flex font-normal gap-x-2 items-center mt-2 " + className}>
      <HiOutlineExclamationCircle className={`scale-150 ${logoClass}`} />
      {content}
    </div>
  );
};

export default Error;
