import React, { useContext } from "react";
import Card from "./Card";

import { cards, playlists } from "./sideBar.module.css";

import SignupContext from "../../../context/signupContext/SignupContext";

const Playlists = () => {
  const { loggedIn } = useContext(SignupContext);
  console.log(loggedIn);
  const renderPlaylist = () => {
    if (!loggedIn)
      return (
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
      );
    return <div className={`${playlists}`}>logged in</div>;
  };
  return renderPlaylist();
};

export default Playlists;
