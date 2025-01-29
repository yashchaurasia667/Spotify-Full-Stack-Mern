import { useContext } from "react";
import Card from "./Card";

import MainContext from "../../../context/mainContext/MainContext";

import styles from "./sideBar.module.css";

interface props {
  email?: string;
}

const Sidebar_default_cards = ({ email }: props) => {
  const context = useContext(MainContext);
  if (!context) throw new Error("no main context");
  const { createPlaylist } = context;

  return (
    <div className={`${styles.cards}`}>
      {email ? (
        <Card
          heading={"Create your first playlist"}
          content={"It's easy, we'll help you"}
          buttonContent={"Create playlist"}
          onClick={() => {
            createPlaylist();
          }}
        />
      ) : (
        ""
      )}
      <Card
        heading={"Let's find some podcasts to follow"}
        content={"We'll keep you updated on episodes"}
        buttonContent={"Browse podcasts"}
      />
      <Card
        heading="Import Playlists from Spotify"
        content="Playlists from your spotify"
        buttonContent="Import"
      />
    </div>
  );
};

export default Sidebar_default_cards;
