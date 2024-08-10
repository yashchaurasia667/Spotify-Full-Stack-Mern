import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Error = ({content}) => {
  return (
    <div className="hidden font-normal text-[#f15e6c] gap-x-2 items-center mt-2 text-sm">
      <HiOutlineExclamationCircle className="scale-150" />
      {content}
    </div>
  );
};

export default Error;
