import React from "react";

const Card = ({ heading = "", content = "", buttonContent = "" }) => {
  return (
    <div className="bg-[#1f1f1f] mt-6 text-white rounded-[5px] px-[20px] py-[15px]">
      <p className="font-semibold">{heading}</p>
      <p className="text-[14px] leading-8">{content}</p>
      <button className="white-card-button">{buttonContent}</button>
    </div>
  );
};

export default Card;
