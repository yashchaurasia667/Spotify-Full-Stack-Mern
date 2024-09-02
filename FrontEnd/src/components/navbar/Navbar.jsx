import React from "react";
import { Link } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

import spotify from "/spotifyBw.svg";
import {
  navbar,
  searchbox,
  nav_left,
  nav_mid,
  nav_right,
} from "./navbar.module.css";

const Navbar = () => {
  return (
    // <div className={`${navbar} row-start-1 col-span-2`}>
    //   <img src={spotify} alt="logo" />
    //   <div className={`${nav_mid}`}>
    //     <Link to="/" className="">
    //       <GoHomeFill />
    //     </Link>
    //     <Link className={`${searchbox}`}>
    //       <IoSearch />
    //       <input type="text" placeholder="What do you want to play?" />
    //       <svg
    //         data-encore-id="icon"
    //         role="img"
    //         aria-hidden="true"
    //         viewBox="0 0 24 24"
    //         class="Svg-sc-ytk21e-0 bneLcE"
    //       >
    //         <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
    //         <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"></path>
    //       </svg>
    //     </Link>
    //   </div>
    //   <div className={nav_right}>
    //     <Link to={"/signup"}>Sign up</Link>
    //     <Link to={"/login"}>Log in</Link>
    //   </div>
    // </div>
    <div className={`${navbar} row-start-1 col-span-2`}>
      <Link to="/" className={`${nav_left}`}>
        <img src={spotify} alt="spotify" height="50px" />
      </Link>
      <div className={`${nav_mid}`}></div>
      <div className={`${nav_right}`}>
        <Link to={"/signup"}>Sign up</Link>
        <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
};

export default Navbar;
