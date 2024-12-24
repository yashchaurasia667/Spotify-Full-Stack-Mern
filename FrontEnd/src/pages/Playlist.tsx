const Playlist = () => {
  return (
    // <div className="relative">
    //   <div className="z-0 h-1/2 w-full absolute bg-gradient-to-t from-[#00000066] to-[#00000000]"></div>
    //   <div className="px-4">
    //     <div className="flex items-center bg-[#4b3692] h-1/2 z-[1]">
    //       <div>
    //         <img
    //           src="/public/playlists/likedSongs.jpg"
    //           width={250}
    //           height={250}
    //         />
    //       </div>
    //       <div>
    //         <p>Playlist</p>
    //         <h2 className="text-8xl font-bold">Liked Songs</h2>
    //         <div>
    //           <div>
    //             <img
    //               src="/public/playlists/likedSongs.jpg"
    //               width={30}
    //               height={30}
    //               className="rounded-[50%]"
    //             />
    //             <p>Yash</p>
    //           </div>
    //           <p>784 songs</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="relative bg-[#4b3692] h-1/2 bg-gradient-to-t from-[#00000066] to-[#00000000] flex items-center">
      <div className="flex px-4">
        <img src="/public/playlists/likedSongs.jpg" width={250} height={250} />
        <div>
          <p>Playlist</p>
          <h2 className="text-8xl font-bold">Liked Songs</h2>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
