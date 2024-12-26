import { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface trackProps {
  rank: number;
  name: string;
  artist: string;
  cover: string;
  album: string;
  duration: string;
}

const Track = ({ rank, name, artist, cover, album, duration }: trackProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group grid grid-cols-[0.5fr_10fr_6fr_1fr] items-center px-4 py-2 rounded-md hover:bg-[#acacac20]"
    >
      <p className="text-text-subdued">
        {hover ? <FaPlay fill="#acacac" /> : rank}
      </p>

      <div className="flex items-center gap-x-3">
        <img src={cover} width={45} height={45} className="rounded-md" />
        <div>
          <p className="text-white">{name}</p>
          <p className="text-sm text-text-subdued hover:underline hover:text-white">
            {artist}
          </p>
        </div>
      </div>

      <p className="text-text-subdued">{album}</p>

      <div className="flex gap-x-4">
        <p className="text-text-subdued">{duration}</p>
        <button className="text-text-subdued invisible -hover:visible">
          •••
        </button>
      </div>
    </div>
  );
};

export default Track;
