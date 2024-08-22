import React from "react";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { GoGlobe } from "react-icons/go";

import Playlists from "./Playlists";

function Library() {
  const linkStyle = "text-[12px] text-[#a7a7a7]";
  return (
    <div className="outer library">
      <div className="lib-bar">
        <div className="bar-element inactive">
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-encore-id="icon"
            className="Svg-sc-ytk21e-0 haNxPq"
          >
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
          </svg>
          Your Library
        </div>
        <FaPlus className="bar-element inactive" />
      </div>
      <div className="playlist-container">
        <Playlists />
        <div className="sidebar-footer">
          <div className="policies">
            <Link to="#" className={linkStyle}>
              Legal
            </Link>
            <Link to="#" className={linkStyle}>
              Safety&Privacy Center
            </Link>
            <Link to="#" className={linkStyle}>
              Privacy Policy
            </Link>
            <Link to="#" className={linkStyle}>
              Cookies
            </Link>
            <Link to="#" className={linkStyle}>
              About Ads
            </Link>
            <Link to="#" className={linkStyle}>
              Accessibility
            </Link>
          </div>
          <button>
            <GoGlobe />
            English
          </button>
        </div>
      </div>
    </div>
  );
}

export default Library;
