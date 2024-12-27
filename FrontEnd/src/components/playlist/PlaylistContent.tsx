import { FaPlay } from "react-icons/fa";
import GreenButton from "../global/GreenButton";
import Track from "../global/Track";
import { RGB } from "types";

interface PlaylistContentProps {
  bg: RGB;
}

const PlaylistContent = ({ bg }: PlaylistContentProps) => {
  return (
    <div
      className="w-full min-h-[100%] relative"
      // style={{ backgroundColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})` }}
    >
      <div
        className="h-1/2 w-full absolute bg-transparent bg-gradient-to-b"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.3), #00000000)`,
        }}
      ></div>
      <div className="w-full px-5 py-5">
        <GreenButton
          content={<FaPlay fill="#121212" size={20} />}
          className="p-5"
        />
      </div>
      <Track
        rank={1}
        name="Lovers Rock"
        artist="TV Girl"
        cover="https://i.scdn.co/image/ab67616d00004851e1bc1af856b42dd7fdba9f84"
        album="French Exit"
        duration="3:00"
      />
    </div>
  );
};

export default PlaylistContent;
