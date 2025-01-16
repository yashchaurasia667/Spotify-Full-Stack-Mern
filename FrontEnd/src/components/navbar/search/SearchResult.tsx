import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import GreenButton from "../../global/GreenButton";

import { spotifyObject } from "../../../types";

interface props {
  name: string;
  artists: spotifyObject[];
  cover: string;
  duration: number;
  id: string;
}

const SearchResult = ({ name, artists, cover, duration, id }: props) => {
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
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between group relative hover:bg-background-elevated-highlight cursor-pointer"
      onClick={() => navigate(`/track/${id}`)}
    >
      <div className="flex py-4 px-4">
        <img src={cover} alt={name} className="rounded-md mr-4" />
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
        className={`p-2 absolute opacity-0 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 hover:scale-110 hover:bg-[#3be477]`}
        // className={`p-2 absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 hover:bg-[#3be477]`}
      />
    </div>
  );
};

export default SearchResult;
