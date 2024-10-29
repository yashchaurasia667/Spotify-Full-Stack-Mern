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
