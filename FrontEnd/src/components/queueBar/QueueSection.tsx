import { useContext } from "react";

import { IoIosClose } from "react-icons/io";

import MainContext from "../../context/mainContext/MainContext";
import Library_PlaylistTile from "../home/Library/Library_PlaylistTile";

const QueueSection = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { queueOpen, setQueueOpen } = context;
  return (
    <dialog
      open={queueOpen}
      className="row-start-2 col-start-3 bg-background-base w-full h-full rounded-lg relative py-3 pl-4 pr-2"
    >
      <div className="flex justify-between items-center">
        <p className="text-md font-bold py-2">Queue</p>
        <IoIosClose
          size={35}
          fill="#acacac"
          className="hover:fill-white"
          onClick={() => setQueueOpen(false)}
        />
      </div>
      <div className="mt-6">
        <p className="font-bold text-md">Now playing</p>
        {/* <Library_PlaylistTile
          cover={"playlist_default.png"}
          length={0}
          type={""}
          name={""}
          id={""}
          sidebarWidth={0}
          owner={""}
        /> */}
      </div>
      <div className="mt-6">
        <p className="font-bold text-md">Next up</p>
      </div>
    </dialog>
  );
};

export default QueueSection;
