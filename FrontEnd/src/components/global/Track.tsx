import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SlTrash } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RxTriangleRight } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";

import DividerWithText from "./DividerWithText";

import MainContext from "../../context/mainContext/MainContext";

interface trackProps {
  playlist_id?: string;
  track_id: string;
  index: number;
  name: string;
  artist: string;
  cover: string;
  album: string;
  duration_ms: number;
}

const Track = ({
  playlist_id,
  track_id,
  index,
  name,
  artist,
  cover,
  album,
  duration_ms,
}: trackProps) => {
  const [hover, setHover] = useState(false);
  const [optionsDialog, setOptionsDialog] = useState(false);

  const navigate = useNavigate();

  const convertToTime = (durationMs: number) => {
    const hours = Math.floor(durationMs / 600000);
    durationMs %= 600000;
    const mins = Math.floor(durationMs / 60000);
    durationMs %= 60000;
    const seconds = Math.floor(durationMs / 1000);
    return { hours: hours, mins: mins, seconds: seconds };
  };

  const duration = convertToTime(duration_ms);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, addToPlaylist, createPlaylist } = context;

  const playlists = useMemo(() => {
    return user.playlists.map((pl, index) => (
      <li
        key={index}
        className="hover:bg-[#3e3e3e] px-2 py-3 text-md"
        onClick={() => addToPlaylist(pl._id, track_id!)}
      >
        {pl.name}
      </li>
    ));
  }, [user.playlists]);

  const removeTrack = async () => {
    if (!playlist_id) return;
    const res = await fetch(
      `/api/playlist/removetrack?playlist_id=${playlist_id}&track_index=${index}`,
      { credentials: "include" }
    );
    if (res.ok) {
      toast.success("Removed from Playlist", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {/* OUTERMOST DIV */}
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group grid grid-cols-[0.5fr_10fr_6fr_1fr] items-center px-4 py-2 rounded-md hover:bg-[#acacac20] relative"
      >
        <p className="text-text-subdued">
          {hover ? <FaPlay fill="#acacac" /> : index}
        </p>

        {/* NAME AND ARTIST */}
        <div className="flex items-center gap-x-3">
          <img src={cover} width={45} height={45} className="rounded-md" />

          <div>
            <p
              onClick={() => navigate(`/track/${track_id}`)}
              className="text-white hover:underline hover:cursor-pointer"
            >
              {name}
            </p>
            <p className="text-sm text-text-subdued hover:underline hover:text-white">
              {artist}
            </p>
          </div>
        </div>

        <p className="text-text-subdued text-sm">{album}</p>

        {/* DURATION AND OPTIONS */}
        <div className="flex gap-x-4">
          <p className="text-text-subdued text-sm">
            {`${duration.hours ? duration.hours + ":" : ""}
          ${duration.mins}:${duration.seconds}`}
          </p>

          <button
            onClick={() => setOptionsDialog(!optionsDialog)}
            className="text-text-subdued invisible group-hover:visible"
          >
            •••
          </button>
        </div>

        <dialog
          open={optionsDialog}
          className="absolute z-50 top-0 w-full bg-transparent"
          onMouseLeave={() => setOptionsDialog(false)}
          onClick={() => setOptionsDialog(false)}
        >
          <ul className="bg-background-elevated-highlight p-1 rounded-md w-fit absolute right-0">
            <li className="text-md px-3 py-3 w-full hover:bg-[#3e3e3e] relative">
              <div className="flex items-center gap-x-3 group">
                <FaPlus size={15} />
                <p>Add to Playlist</p>
                <RxTriangleRight size={25} />
              </div>

              <ul className="overflow-hidden p-1 absolute rounded-md right-[calc(100%_-_5px)] shadow-[0px_0px_20px_#000000] bottom-1 bg-background-elevated-highlight min-w-[220px] hover:visible group-hover:visible invisible max-h-[200px]">
                <li
                  className="hover:bg-[#3e3e3e] px-2 py-3 text-md flex items-center gap-x-3"
                  onClick={createPlaylist}
                >
                  <FaPlus size={15} />
                  <p>New Playlist</p>
                </li>
                <DividerWithText />
                <>{playlists}</>
              </ul>
            </li>

            <li
              onClick={removeTrack}
              className="flex items-center gap-x-2 px-2 py-3 hover:bg-[#3e3e3e]"
            >
              <SlTrash />
              Remove from this Playlist
            </li>
          </ul>
        </dialog>
      </div>
    </>
  );
};

export default Track;
