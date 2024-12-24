const Playlist = () => {
  return (
    <div className="relative bg-[#4b3692] h-fit bg-gradient-to-t from-[#00000066] to-[#00000000]">
      <div className="flex gap-x-5 items-center px-4 py-5 h-full">
        <img
          src="/public/playlists/likedSongs.jpg"
          width={250}
          height={250}
          className="rounded-md shadow-[0px_0px_20px_#00000088]"
        />
        <div className="flex flex-col gap-y-3">
          <p className="font-medium">Playlist</p>
          <h2 className="text-8xl font-extrabold -tracking-[0.2rem]">
            Liked Songs
          </h2>
          <div className="flex gap-x-3 items-center">
            <div
              style={{
                width: 25,
                height: 25,
              }}
            >
              <img src="/public/radio.png" className="rounded-[50%]" />
            </div>
            <p className="text-text-subdued -tracking-wider font-medium">
              768 Songs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
