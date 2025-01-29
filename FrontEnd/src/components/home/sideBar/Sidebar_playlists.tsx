import { useContext, useEffect, useMemo, useState } from "react";

import Card from "./Card";
import Sidebar_PlaylistTile from "./Sidebar_PlaylistTile";
import Sidebar_footer from "./Sidebar_footer";

import styles from "./sideBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";

import { track } from "../../../types";
import Sidebar_default_cards from "./Sidebar_default_cards";

interface playlistProps {
  _id: string;
  cover: string;
  name: string;
  owner: string;
  songs: [
    {
      song: track;
      dateAdded: Date;
    }
  ];
}

const Sidebar_playlists = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, sidebarWidth, getPlaylistDetails } = context;

  const [playlistDetails, setPlaylistDetails] = useState<playlistProps[]>([]);
  const [refresh, setRefresh] = useState(false);

  const getPlaylists = async () => {
    const res = await fetch("/api/user/getuserplaylists", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      const tmp: playlistProps[] = [];

      // Gets all the playlists of the user
      data.map(async (id: string) => {
        const details = await getPlaylistDetails(id);
        if (details) tmp.push(details);
        setPlaylistDetails(tmp);
      });
    }
  };

  useEffect(() => {
    getPlaylists();
  }, [refresh]);

  const renderPlaylists = useMemo(() => {
    return playlistDetails.map((details, index) => (
      <Sidebar_PlaylistTile
        sidebarWidth={sidebarWidth}
        cover={details.cover}
        length={details.songs.length}
        type="Playlist"
        name={details.name}
        key={index}
        id={details._id}
      />
    ));
  }, [playlistDetails]);

  return (
    <>
      {playlistDetails.length ? (
        renderPlaylists
      ) : (
        <Sidebar_default_cards email={user.email} />
      )}
      <Sidebar_footer sidebarWidth={sidebarWidth} />
    </>
  );
};

export default Sidebar_playlists;
