import React from "react";

import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

import spotify from "/spotifywText.svg";

function Pages() {
  const linkStyle = `inactive inactive_page`;
  const iconStyle = `inactive scale-[175%]`;

  return (
    <div className={`outer pages py-5`}>
      <Link to="/" className={linkStyle}>
        <img src={spotify} />
      </Link>
      <Link to="/" className={linkStyle}>
        <GoHomeFill className={iconStyle} />
        Home
      </Link>
      <Link to="/search" className={linkStyle}>
        <IoSearch className={iconStyle} />
        Search
      </Link>
    </div>
  );
}

export default Pages;
