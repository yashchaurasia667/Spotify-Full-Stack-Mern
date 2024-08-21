import React from "react";
import { Link } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Navbar = () => {
  const linkDefault = "font-semibold text-[16px] py-3 px-8 ";
  const iconDefault = "scale-[175%] mx-3 bg-[#00000055] text-[#acacac] rounded-full";

  return (
    <div className="navbar">
      <div className="flex">
        <GoChevronLeft className={iconDefault}/>
        <GoChevronRight className={iconDefault}/>
      </div>
      <div className="flex">
        <Link
          to={"/signup"}
          className={
            linkDefault + "text-[#acacac] bg-transparent hover:text-[17px] hover:text-white"
          }
        >
          Sign up
        </Link>
        <Link
          to={"/login"}
          className={
            linkDefault +
            "bg-white text-black rounded-full hover:py-3.5 hover:bg-[#f0f0f0]"
          }
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
