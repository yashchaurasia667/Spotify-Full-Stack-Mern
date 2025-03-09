import { useContext } from "react";

import { IoIosClose } from "react-icons/io";

import QueueTile from "./QueueTile";

import MainContext from "../../context/mainContext/MainContext";

const QueueSection = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { queueOpen, setQueueOpen, queue } = context;

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
        <QueueTile
          nowPlaying={true}
          cover={"/api/uploads/global/playlist_default_small.png"}
          name={"name"}
          artists={"Artists"}
        />
      </div>

      <div className="mt-6">
        <p className="font-bold text-md pl-2 mb-2">Next up</p>
      </div>
    </dialog>
  );
};

export default QueueSection;
