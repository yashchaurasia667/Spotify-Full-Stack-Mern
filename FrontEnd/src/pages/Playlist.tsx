const Playlist = () => {
  return (
    <div className="flex ">
      <div>
        <img src="/public/playlists/likedSongs.jpg" width={250} height={250} />
      </div>
      <div>
        <p>Playlist</p>
        <h2>Liked Songs</h2>
        <div>
          <div>
            <img
              src="/public/playlists/likedSongs.jpg"
              width={30}
              height={30}
              className="rounded-[50%]"
            />
            <p>Yash</p>
          </div>
          <p>784 songs</p>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
