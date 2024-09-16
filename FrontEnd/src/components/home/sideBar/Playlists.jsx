import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { GoGlobe } from "react-icons/go";
import Card from "./Card";

import {
  cards,
  playlists,
  sidebar_footer,
  policies,
} from "./sideBar.module.css";

import SignupContext from "../../../context/signupContext/SignupContext";
import MainContext from "../../../context/mainContext/MainContext";

const Playlists = () => {
  const linkStyle = "text-[12px] text-text-subdued";

  const { loggedIn } = useContext(SignupContext);
  const { sidebarWidth } = useContext(MainContext);

  // useEffect(() => console.log(loggedIn), [loggedIn]);

  const renderPlaylist = () => {
    if (!loggedIn)
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

export default Playlists;
