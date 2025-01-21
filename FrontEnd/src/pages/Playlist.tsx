import { useContext, useState } from "react";

import PlaylistHeader from "../components/playlist/PlaylistHeader";
import PlaylistContent from "../components/playlist/PlaylistContent";

import MainContext from "../context/mainContext/MainContext";

import { RGB } from "../types";

const Playlist = () => {
  const [bg, setBg] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const context = useContext(MainContext);
  if (!context) throw new Error("Context is null");
  const { averageImageColor } = context;
  averageImageColor("/playlists/likedSongs.jpg").then((color) => setBg(color));

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
