import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import TrackHeader from "../components/Track/TrackHeader";
import PlayPage from "../components/global/PlayPage";

import MainContext from "../context/mainContext/MainContext";

import { RGB, trackDetails } from "../types";
import { RxTriangleRight } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import DividerWithText from "../components/global/DividerWithText";

const TrackPage = () => {
  const { id } = useParams();

  const [trackDetails, setTrackDetails] = useState<trackDetails>();
  const [background, setBackground] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [optionsDialog, setOptionsDialog] = useState<boolean>(false);

  const playlistRef = useRef<HTMLUListElement>(null);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, createPlaylist, averageImageColor } = context;

  const addToPlaylist = async (e: React.MouseEvent, playlist_id: string) => {
    e.preventDefault();
    const res = await fetch(
      `/api/playlist/addtoplaylist?playlist_id=${playlist_id}&track_id=${id}`,
      {
        credentials: "include",
      }
    );
    if (res.ok) {
    }
  };

  useEffect(() => {
    fetch(`/api/spotify/track/?id=${id}`, {
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        setTrackDetails(() => {
          return { ...data };
        });
      })
    );
  }, [id]);

  useEffect(() => {
    if (trackDetails?.album.images[2].url)
      averageImageColor(trackDetails?.album.images[2].url).then((color) =>
        setBackground(color)
      );
  }, [trackDetails?.album.images[1].url]);

  const playlists = useMemo(() => {
    return user.playlists.map((pl, index) => (
      <li key={index} className="hover:bg-[#3e3e3e] px-2 py-3 text-md">
        {pl.name}
      </li>
    ));
  }, [user.playlists]);

  return (
    <div className="bg-background-base overflow-auto rounded-lg">
      <TrackHeader
        background={background}
        duration_ms={trackDetails?.duration_ms}
        trackDetails={trackDetails}
      />
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(${background.r}, ${background.g}, ${background.b}, 0.2), #00000000)`,
          maxHeight: "20vh",
          padding: "0 1rem",
        }}
      >
        <PlayPage
          elements={
            <>
              <button
                className="text-lg ml-5 text-text-subdued hover:text-white hover:scale-105"
                onClick={() => setOptionsDialog(!optionsDialog)}
              >
                • • •
              </button>
              <dialog
                open={optionsDialog}
                className="bg-background-elevated-highlight rounded-md w-[200px] mx-0 absolute top-1/3 -translate-y-1/3 left-36 p-1"
              >
                <ul>
                  <li className="flex items-center gap-x-3 text-md px-3 py-3 w-full hover:bg-[#3e3e3e] relative group">
                    <FaPlus size={15} />
                    <p>Add to Playlist</p>
                    <RxTriangleRight size={25} />
                    <ul
                      ref={playlistRef}
                      className="hidden overflow-hidden p-1 absolute rounded-md left-[calc(100%_-_5px)] shadow-[0px_0px_20px_#000000] top-1 bg-background-elevated-highlight w-[220px] hover:block group-hover:block max-h-[200px]"
                    >
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
                </ul>
              </dialog>
            </>
          }
        />
        <div>
          <p className="text-2xl font-bold">Lyrics</p>
          <p className="text-4xl font-extrabold py-10">
            We're still working on it
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
