import { useContext } from "react";

import PlaylistHeader from "../components/playlist/PlaylistHeader";
import PlaylistContent from "../components/playlist/PlaylistContent";

import MainContext from "../context/mainContext/MainContext";

const Playlist = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("Context is null");
  const { averageImageColor } = context;
  const bg = averageImageColor("/playlists/likedSongs.jpg");

  return (
    <div className="row-start-2 col-start-2 overflow-auto relative bg-background-base rounded-md">
      <PlaylistHeader
        bg={bg}
        cover="/playlists/likedSongs.jpg"
        name="Liked Songs"
        type="Playlist"
        length={768}
      />
      <PlaylistContent bg={bg} />
    </div>
  );
};

export default Playlist;
