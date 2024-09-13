import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import Playlists from "./Playlists";

import MainContext from "../../../context/mainContext/MainContext";

import {
  outer,
  library,
  lib_bar,
  bar_element,
  inactive,
  playlist_container,
} from "./sideBar.module.css";

function Library({ sidebarWidth, setSidebarWidth }) {
  const { collapse, libIcon, setLibIcon } = useContext(MainContext);

  return (
    <div className={`${outer} ${library}`}>
      <div className={`${lib_bar}`}>
        <button className={`${bar_element} ${inactive}`} onClick={collapse}>
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
          {libIcon}
        </button>
        <FaPlus
          className={`${bar_element} ${inactive} ${
            sidebarWidth > 70 ? "visible" : "hidden"
          }`}
        />
      </div>
      <div className={`${playlist_container}`}>
        <Playlists />
      </div>
    </div>
  );
}

export default Library;
