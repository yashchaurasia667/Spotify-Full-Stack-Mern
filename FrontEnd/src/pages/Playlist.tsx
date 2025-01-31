import { useContext, useEffect, useState } from "react";

import PlaylistHeader from "../components/playlist/PlaylistHeader";
import PlaylistContent from "../components/playlist/PlaylistContent";

import MainContext from "../context/mainContext/MainContext";

import { playlist, RGB } from "../types";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const { id } = useParams();

  const [bg, setBg] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [playlist, setPlaylist] = useState<playlist>({
    cover: "",
    name: "",
    description: "",
    owner: "",
    duration: 0,
    songs: [],
  });

  const context = useContext(MainContext);
  if (!context) throw new Error("Context is null");
  const { averageImageColor, getPlaylistDetails } = context;

  useEffect(() => {
    if (id)
      getPlaylistDetails(id).then((details) => {
        setPlaylist(details);
        averageImageColor(`/api/uploads/playlists/${details.cover}`).then(
          (color) => setBg(color)
        );
      });
  }, [id]);

  return (
    <div className="row-start-2 col-start-2 overflow-auto bg-background-base rounded-md">
      <PlaylistHeader
        bg={bg}
        cover={`/api/uploads/playlists/${playlist.cover}`}
        name={playlist.name}
        description={playlist.description}
        type="Playlist"
        length={playlist.songs.length}
        owner={playlist.owner}
        duration={playlist.duration}
      />
      <PlaylistContent bg={bg} />
    </div>
  );
};

export default Playlist;
