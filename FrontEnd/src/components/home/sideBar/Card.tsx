import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa6";

import { white_card_button } from "./sideBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";

const Card = ({ heading = "", content = "", buttonContent = "" }) => {
  const { sidebarWidth } = useContext(MainContext);
  return sidebarWidth > 70 ? (
    <div
      className={`bg-background-highlight mt-6 text-white rounded-[5px] px-[20px] py-[15px] `}
    >
      <p className="font-semibold">{heading}</p>
      <p className="text-[14px] leading-8">{content}</p>
      <button className={`${white_card_button}`}>{buttonContent}</button>
    </div>
  ) : (
    <div className="bg-white cursor-pointer my-3 rounded-[4px] h-[45px] flex items-center hover:bg-zinc-300">
      <FaPlus className="fill-background-base mx-auto scale-[125%]" />
    </div>
  );
};

export default Card;