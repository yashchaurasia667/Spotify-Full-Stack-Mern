import React from "react";

import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

import spotify from "/spotifywText.svg";

function Pages() {
  return (
    <div className="outer pages py-5">
      <Link to="/" className={"inactive-page inactive"}>
        <img src={spotify} />
      </Link>
      <Link to="/" className={"inactive-page inactive"}>
        <GoHomeFill className="scale-[175%]" />
        Home
      </Link>
      <Link to="/search" className={"inactive-page inactive"}>
        <IoSearch className="scale-[175%]" />
        Search
      </Link>
    </div>
  );
}

export default Pages;
