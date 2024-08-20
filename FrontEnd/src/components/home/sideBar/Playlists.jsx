import React from "react";
import Card from "./Card";

const Playlists = ({ loggenIn = false }) => {
  const renderPlaylist = () => {
    if (!loggenIn)
      return (
        <div className="cards">
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
    return <div>logged in</div>;
  };
  return renderPlaylist();
};

export default Playlists;
