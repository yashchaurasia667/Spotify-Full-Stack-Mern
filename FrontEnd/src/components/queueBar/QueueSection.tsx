import { useContext, useMemo } from "react";

import { IoIosClose } from "react-icons/io";

import QueueTile from "./QueueTile";

import MainContext from "../../context/mainContext/MainContext";

const QueueSection = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const {
    queueOpen,
    setQueueOpen,
    queue,
    currentlyPlaying,
    setCurrentlyPlaying,
  } = context;

  const queueList = useMemo(() => {
    return queue.map((track, index) => (
      <QueueTile
        cover={track.cover}
        name={track.name}
        artists={track.artists.map((artist) => artist.name).join(", ")}
      />
    ));
  }, [queue]);

  return (
    <dialog
      open={queueOpen}
      className="row-start-2 col-start-3 bg-background-base w-full h-full rounded-lg relative py-3 px-2"
    >
      <div className="flex justify-between items-center">
        <p className="text-md font-bold pl-2">Queue</p>
        <IoIosClose
          size={35}
          fill="#acacac"
          className="hover:fill-white"
          onClick={() => setQueueOpen(false)}
        />
      </div>

      <div className="mt-6">
        <p className="font-bold text-md pl-2 mb-2">Now playing</p>
        {currentlyPlaying.album.images.length ? (
          <QueueTile
            cover={currentlyPlaying.album.images[0].url}
            name={currentlyPlaying.name}
            artists={currentlyPlaying.artists
              .map((artist) => artist.name)
              .join(", ")}
          />
        ) : (
          ""
        )}
      </div>

      <div className="mt-6">
        <p className="font-bold text-md pl-2 mb-2">Next up</p>
        <div>{queueList}</div>
      </div>
    </dialog>
  );
};

export default QueueSection;
