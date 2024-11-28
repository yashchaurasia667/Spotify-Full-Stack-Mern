import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import Playlists from "./Playlists";

import MainContext from "../../../context/mainContext/MainContext";

import styles from "./sideBar.module.css";

interface libProps {
  sidebarWidth: number;
  setSidebarWidth: (e: number) => void;
}

function Library({ sidebarWidth, setSidebarWidth }: libProps) {
  const context = useContext(MainContext);
  if (!context) throw new Error("no main context");
  const { collapse, libIcon, setLibIcon } = context;

  const { outer, library, lib_bar, bar_element, inactive, playlist_container } =
    styles;

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
