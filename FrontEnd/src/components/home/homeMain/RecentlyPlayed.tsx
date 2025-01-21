import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import GreenButton from "../../../components/global/GreenButton";

import MainContext from "../../../context/mainContext/MainContext";
import { RGB } from "../../../types";

interface RecentlyPlayedProps {
  cover: string;
  title: string;
  id: string;
  onMouseOver: (color: RGB) => void;
  onMouseOut: () => void;
}
const RecentlyPlayed = ({
  cover,
  title,
  id,
  onMouseOver,
  onMouseOut,
}: RecentlyPlayedProps) => {
  // const { play, card } = styles;

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { averageImageColor } = context;

  return (
    <Link
      to={`/playlist/${id}`}
      className={
        "flex gap-x-4 max-h-[100px] bg-[#7c7c7c33] rounded-md overflow-hidden relative group"
      }
      onMouseOver={async () => onMouseOver(await averageImageColor(cover))}
      onMouseOut={onMouseOut}
    >
      <img src={cover} className="max-h-[80px]" />
      <p className="my-auto font-bold w-[70%] overflow-hidden text-ellipsis">
        {title}
      </p>
      <GreenButton
        content={<FaPlay className="fill-background-base" />}
        className={`p-4 absolute opacity-0 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 hover:scale-110 hover:bg-[#3be477]`}
      />
    </Link>
  );
};

export default RecentlyPlayed;
