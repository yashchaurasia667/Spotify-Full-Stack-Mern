import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import Sidebar_playlists from "./Sidebar_playlists";

import MainContext from "../../../context/mainContext/MainContext";

import styles from "./sideBar.module.css";
import { useNavigate } from "react-router-dom";

interface libProps {
  sidebarWidth: number;
  // setSidebarWidth: (e: number) => void;
}

function Library({ sidebarWidth }: libProps) {
  const context = useContext(MainContext);
  if (!context) throw new Error("no main context");
  const { collapse, libIcon } = context;

  const { outer, library, lib_bar, bar_element, inactive, playlist_container } =
    styles;

  const navigate = useNavigate();

  const createPlaylist = async () => {
    const res = await fetch("/api/playlist/create", {
      credentials: "include",
    });
    const data = await res.json();
    navigate(`/playlist/${data}`);
  };

  return (
    <div
      className={`${outer} ${library} ${sidebarWidth > 70 ? "px-[10px]" : ""}`}
    >
      <div className={`${lib_bar}`}>
        <button className={`${bar_element} ${inactive}`} onClick={collapse}>
          {libIcon}
        </button>
        <FaPlus
          className={`${bar_element} ${inactive} ${
            sidebarWidth > 70 ? "visible" : "hidden"
          }`}
          onClick={() => {
            createPlaylist();
          }}
        />
      </div>
      <div className={`${playlist_container}`}>
        <Sidebar_playlists />
      </div>
    </div>
  );
}

export default Library;
