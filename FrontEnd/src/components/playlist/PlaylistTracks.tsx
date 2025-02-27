import { useEffect, useMemo, useState } from "react";

import Track from "../global/Track";

import { track, trackDetails } from "../../types";

interface props {
  playlist_id: string;
}

const PlaylistTracks = ({ playlist_id }: props) => {
  const [tracks, setTracks] = useState<trackDetails[]>([]);

  const getTracks = async () => {
    try {
      const res = await fetch(
        `/api/playlist/tracks?playlist_id=${playlist_id}`
      );
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
  }, [playlist_id]);

  const displayTracks = useMemo(() => {
    return tracks.map((track, index) => {
      // console.log(track.album.images);
      return (
        <Track
          key={index}
          playlist_id={playlist_id}
          track_id={track.id}
          index={index + 1}
          name={track.name}
          artist={track.artists.map((artist) => artist.name).join(", ")}
          cover={track.album.images[2].url}
          album={track.album.name}
          duration_ms={track.duration_ms}
        />
      );
    });
  }, [tracks]);

  return (
    <div className="mb-4">
      <>{displayTracks}</>
      {/* <Track
        id="gugugaga"
        index={1}
        name="asdfa"
        artist="asdfafdadf"
        cover="asdhfasdf"
        album="aasdfasdff"
        duration_ms={12341234}
      /> */}
    </div>
  );
};

export default PlaylistTracks;
