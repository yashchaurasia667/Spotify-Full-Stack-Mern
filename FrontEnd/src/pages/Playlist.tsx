import { useContext } from "react";

import PlaylistHeader from "../components/playlist/PlaylistHeader";
import PlaylistContent from "../components/playlist/PlaylistContent";

import MainContext from "../context/mainContext/MainContext";

const Playlist = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("Context is null");
  const { averageImageColor } = context;
  const bg = averageImageColor("/playlists/al.jpeg");

  return (
    <div>
      <PlaylistHeader
        bg={bg}
        cover="/playlists/al.jpeg"
        name="Liked Songs"
        type="Playlist"
        length={768}
      />
      <PlaylistContent bg={bg} />
    </div>
  );
};

export default Playlist;
