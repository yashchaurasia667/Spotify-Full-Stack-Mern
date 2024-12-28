import RecentlyPlayed from "../RecentlyPlayed";

import { RGB } from "../../../../types";

interface props {
  className?: string;
  setGradient: (color: RGB) => void;
}
const Recents = ({ className, setGradient }: props) => {
  return (
    <div
      className={
        "grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 mt-5 overflow-hidden " +
        className
      }
    >
      <RecentlyPlayed
        cover="playlists/likedSongs.jpg"
        title="Liked Songs"
        id="id"
        onMouseOver={setGradient}
        onMouseOut={() => setGradient({ r: 83, g: 83, b: 83 })}
      />
      {/* <RecentlyPlayed cover="playlists/al.jpeg" title="Al" id="id" /> */}
    </div>
  );
};

export default Recents;
