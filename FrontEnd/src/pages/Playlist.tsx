import { useContext } from "react";

import PlaylistHeader from "../components/playlist/PlaylistHeader";

import MainContext from "../context/mainContext/MainContext";

const Playlist = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("Context is null");
  const { averageImageColor } = context;
  const bg = averageImageColor("/public/playlists/al.jpeg");

  return (
    <PlaylistHeader
      bg={bg}
      cover="/public/playlists/al.jpeg"
      name="Liked Songs"
      type="Playlist"
      length={768}
    />
  );
};

export default Playlist;
