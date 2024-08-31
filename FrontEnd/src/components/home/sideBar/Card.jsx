import React from "react";

import { white_card_button } from "./sideBar.module.css";

const Card = ({ heading = "", content = "", buttonContent = "" }) => {
  return (
    <div className="bg-background-highlight mt-6 text-white rounded-[5px] px-[20px] py-[15px]">
      <p className="font-semibold">{heading}</p>
      <p className="text-[14px] leading-8">{content}</p>
      <button className={`${white_card_button}`}>{buttonContent}</button>
    </div>
  );
};

export default Card;
