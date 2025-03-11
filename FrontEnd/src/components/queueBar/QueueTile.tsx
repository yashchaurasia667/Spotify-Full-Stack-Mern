import { useContext } from "react";
import MainContext from "../../context/mainContext/MainContext";

interface props {
  nowPlaying?: boolean;
  spotifyId: string;
  youtubeId: string;
  cover: string;
  name: string;
  artists: string;
}

const QueueTile = ({
  nowPlaying = false,
  cover,
  name,
  artists,
  spotifyId,
  youtubeId,
}: props) => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { setCurrentlyPlaying } = context;

  return (
    <div className="flex items-center gap-x-3 p-2 group hover:bg-[#acacac18] cursor-pointer rounded-md">
      <img
        // src="/api/uploads/global/playlist_default_small.png"
        src={cover}
        width={60}
        className="rounded-md"
      />
      <div>
        <p
          className={`font-medium ${
            nowPlaying ? "text-text-bright-accent" : ""
          }`}
        >
          {name}
        </p>
        <p className="text-text-subdued hover:underline hover:text-white">
          {artists}
        </p>
      </div>
    </div>
  );
};

export default QueueTile;
