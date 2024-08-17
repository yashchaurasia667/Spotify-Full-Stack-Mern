import React from "react";

import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

import spotify from "/spotifywText.svg";

import "./pages.css";

function Pages() {
  const pageClass = "flex gap-x-6 text-[1rem] font-semibold px-[25px] py-[3px] inactive";
  return (
    <div className="pages-outer py-5">
      <Link to="/" className={pageClass}>
        <img src={spotify} />
      </Link>
      <Link to="/" className={pageClass}>
        <GoHomeFill className="scale-[175%]" />
        Home
      </Link>
      <Link to="/search" className={pageClass}>
        <IoSearch className="scale-[175%]" />
        Search
      </Link>
    </div>
  );
}

export default Pages;
