import { useMemo, useState } from "react";
import { spotifyObject } from "../../../types";

interface props {
  name: string;
  artists: spotifyObject[];
  cover: string;
  duration: number;
}

const SearchResult = ({ name, artists, cover, duration }: props) => {
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
  // const [time, setTime] = useState({ hours: 0, mins: 0, seconds: 0 });
  const time = convertToTime(duration);

  return (
    <div className="flex py-4 px-4 hover:bg-background-elevated-highlight cursor-pointer">
      <img src={cover} alt={name} className="rounded-md mr-4" />
      <div className="">
        <p className="font-semibold text-md">{name}</p>
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
  );
};

export default SearchResult;
