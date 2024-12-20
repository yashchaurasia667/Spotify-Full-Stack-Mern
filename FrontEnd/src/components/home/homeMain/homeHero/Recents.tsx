import RecentlyPlayed from "../RecentlyPlayed";

const Recents = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-4 mt-5 overflow-hidden">
      <RecentlyPlayed cover="playlists/likedSongs.jpg" title="Liked Songs" />
      <RecentlyPlayed cover="playlists/likedSongs.jpg" title="Liked Songs" />
      <RecentlyPlayed cover="playlists/likedSongs.jpg" title="Liked Songs" />
    </div>
  );
};

export default Recents;
