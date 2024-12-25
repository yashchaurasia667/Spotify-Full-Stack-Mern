import PlaylistHeader from "../components/playlist/PlaylistHeader";

const Playlist = () => {
  return (
    <PlaylistHeader
      cover="/public/playlists/likedSongs.jpg"
      name="Liked Songs"
      type="Playlist"
      length={768}
    />
  );
};

export default Playlist;
