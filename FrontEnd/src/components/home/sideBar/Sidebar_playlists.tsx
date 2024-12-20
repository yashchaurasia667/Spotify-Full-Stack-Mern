import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GoGlobe } from "react-icons/go";
import Card from "./Card";

import styles from "./sideBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";

const Sidebar_playlists = () => {
  const { cards, playlists, sidebar_footer, policies } = styles;
  const linkStyle = "text-[12px] text-text-subdued";

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, sidebarWidth } = context;

  const renderPlaylist = () => {
    if (!user.email)
      return (
        <>
          <div className={`${cards}`}>
            <Card
              heading={"Create your first playlist"}
              content={"It's easy, we'll help you"}
              buttonContent={"Create playlist"}
            />
            <Card
              heading={"Let's find some podcasts to follow"}
              content={"We'll keep you updated on episodes"}
              buttonContent={"Browse podcasts"}
            />
          </div>
          <div
            className={`${sidebar_footer} ${sidebarWidth > 70 ? "" : "hidden"}`}
          >
            <div className={`${policies}`}>
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
        </>
      );
    return <div className={`${playlists}`}>logged in</div>;
  };
  return renderPlaylist();
};

export default Sidebar_playlists;
