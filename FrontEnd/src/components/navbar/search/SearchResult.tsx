import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaPlay } from "react-icons/fa";
import GreenButton from "../../global/GreenButton";

import { trackDetails } from "../../../types";

import MainContext from "../../../context/mainContext/MainContext";

const SearchResult = ({
  name,
  artists,
  album,
  duration_ms,
  id,
}: trackDetails) => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { setCurrentlyPlaying } = context;

  const displayArtist = useMemo(() => {
    return artists.map((artist) => artist.name + ", ");
  }, [artists]);

  const convertToTime = (durationMs: number) => {
    const hours = Math.floor(durationMs / 600000);
    durationMs %= 600000;
    const mins = Math.floor(durationMs / 60000);
    durationMs %= 60000;
    const seconds = Math.floor(durationMs / 1000);
    return { hours, mins, seconds };
  };

  const time = convertToTime(duration_ms);
  const navigate = useNavigate();

  const searchAndPlay = async () => {
    const searchRes = await fetch(
      `/api/youtube/ytsearch?name=${name}&artist=${artists[0]}`,
      { credentials: "include" }
    );

    if (!searchRes.ok) console.error("Failed to get youtube id");
    const ytId = await searchRes.json();

    setCurrentlyPlaying({
      id: {
        spotifyId: id,
        youtubeId: ytId,
      },
      album: album,
      artists: artists,
      duration_ms: duration_ms,
      name: name,
      type: "track",
    });
  };

  return (
    <div className="flex justify-between group relative hover:bg-background-elevated-highlight cursor-pointer">
      <div className="flex py-4 px-4" onClick={() => navigate(`/track/${id}`)}>
        <img src={album.images[2].url} alt={name} className="rounded-md mr-4" />
        <div className="w-9/12 text-ellipsis">
          <p className="font-semibold text-md w-full overflow-hidden">{name}</p>
          <div className="flex justify-between">
            <p className="mr-3">{displayArtist}</p>
            <p>
              {time.hours ? time.hours + ":" : ""}
              {time.mins + ":"}
              {time.seconds}
            </p>
          </div>
        </div>
      </div>
      <GreenButton
        content={
          <FaPlay
            style={{
              fill: "#121212",
              scale: "80%",
            }}
          />
        }
        onClick={() => searchAndPlay()}
        className={`p-2 absolute opacity-0 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 hover:scale-110 hover:bg-[#3be477]`}
        // className={`p-2 absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 hover:bg-[#3be477]`}
      />
    </div>
  );
};

export default SearchResult;
