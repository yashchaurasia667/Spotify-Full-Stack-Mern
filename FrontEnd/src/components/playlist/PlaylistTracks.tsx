import { useEffect, useMemo, useState } from "react";

import Track from "../global/Track";

import { track, trackDetails } from "../../types";

interface props {
  id: string;
}

const PlaylistTracks = ({ id }: props) => {
  const [tracks, setTracks] = useState<trackDetails[]>([]);

  const getTracks = async () => {
    try {
      const res = await fetch(`/api/playlist/tracks?playlist_id=${id}`);
      if (!res.ok) throw new Error("Something went Wrong");
      const songs = await res.json();

      const trackPromises = songs.map(
        async (track: { _id: string; song: string }) => {
          const trackRes = await fetch(`/api/spotify/track?id=${track.song}`, {
            credentials: "include",
          });
          if (!trackRes) throw new Error("Failed to get Track Details");
          return trackRes.json();
        }
      );

      setTracks(await Promise.all(trackPromises));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, [id]);

  const displayTracks = useMemo(() => {
    return tracks.map((track, index) => {
      console.log(track.album.images);
      return (
        <Track
          key={index}
          id={track.id}
          index={index + 1}
          name={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
          cover={track.album.images[2].url}
          album={track.album.name}
          duration={track.duration_ms.toString()}
        />
      );
    });
  }, [tracks]);

  return (
    <div>
      <>{displayTracks}</>
      {/* <Track
        id="gugugaga"
        index={1}
        name="asdfa"
        artist="asdfafdadf"
        cover="asdhfasdf"
        album="aasdfasdff"
        duration="asdfasdf"
      /> */}
    </div>
  );
};

export default PlaylistTracks;
