import GreenButton from "../../../components/global/GreenButton";
import { FaPlay } from "react-icons/fa";

import styles from "./homemain.module.css";

interface RecentlyPlayedProps {
  cover: string;
  title: string;
}
const RecentlyPlayed = ({ cover, title }: RecentlyPlayedProps) => {
  const { play, card } = styles;
  return (
    <div
      className={
        "flex gap-x-4 h-[70px] bg-[#7c7c7c33] rounded-md overflow-hidden relative group"
      }
    >
      <img src={cover} />
      <p className="my-auto font-bold w-[70%] overflow-hidden text-ellipsis">
        {title}
      </p>
      <GreenButton
        content={<FaPlay className="fill-background-base" />}
        className={`p-4 absolute opacity-0 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 hover:scale-110 hover:bg-[#3be477]`}
      />
    </div>
  );
};

export default RecentlyPlayed;
