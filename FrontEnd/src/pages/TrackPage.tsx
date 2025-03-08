import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { RxTriangleRight } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import TrackHeader from "../components/Track/TrackHeader";
import PlayPage from "../components/global/PlayPage";
import DividerWithText from "../components/global/DividerWithText";
import NotFound from "./NotFound";

import MainContext from "../context/mainContext/MainContext";

import { RGB, trackDetails } from "../types";

const TrackPage = () => {
  const { id } = useParams();

  const [trackDetails, setTrackDetails] = useState<trackDetails>();
  const [background, setBackground] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [optionsDialog, setOptionsDialog] = useState<boolean>(false);
  const [ytId, setYtId] = useState<string>("");
  const [notFound, setNotfound] = useState(false);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const {
    user,
    createPlaylist,
    averageImageColor,
    addToPlaylist,
    setCurrentlyPlaying,
    setIsPlaying,
  } = context;

  useEffect(() => {
    setYtId("");
    const getTrackDetails = async () => {
      const res = await fetch(`/api/spotify/track/?id=${id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        setNotfound(true);
        return;
      }
      const data = await res.json();
      setTrackDetails({ ...data });
    };

    getTrackDetails();
  }, [id]);

  useEffect(() => {
    const searchYoutube = async (name: string, artist: string) => {
      const res = await fetch(
        `/api/youtube/ytsearch?name=${name}&artist=${artist}`
      );
      if (!res.ok) {
        setNotfound(true);
        return;
      }
      const data = await res.json();
      setYtId(data);
    };

    if (trackDetails?.name && trackDetails.artists.length != 0)
      searchYoutube(trackDetails?.name, trackDetails?.artists[0].name);
  }, [trackDetails]);

  useEffect(() => {
    if (trackDetails?.album.images[2].url)
      averageImageColor(trackDetails?.album.images[2].url).then((color) =>
        setBackground(color)
      );
  }, [trackDetails?.album.images[1].url]);

  const playlists = useMemo(() => {
    return user.playlists.map((pl, index) => (
      <li
        key={index}
        className="hover:bg-[#3e3e3e] px-2 py-3 text-md"
        onClick={() => addToPlaylist(pl._id, id!)}
      >
        {pl.name}
      </li>
    ));
  }, [user.playlists]);

  return notFound ? (
    <NotFound />
  ) : (
    <div className="bg-background-base overflow-auto rounded-lg">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />

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
          onClick={() => {
            if (trackDetails && ytId) {
              setCurrentlyPlaying({
                ...trackDetails,
                id: {
                  youtubeId: ytId,
                  spotifyId: trackDetails.id,
                },
              });
              setIsPlaying(true);
            }
          }}
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
                onMouseLeave={() => setOptionsDialog(false)}
                className="bg-background-elevated-highlight rounded-md w-[200px] mx-0 absolute top-1/3 -translate-y-1/3 left-36 p-1"
              >
                <ul>
                  <li className="flex items-center gap-x-3 text-md px-3 py-3 w-full hover:bg-[#3e3e3e] relative group">
                    <FaPlus size={15} />
                    <p>Add to Playlist</p>
                    <RxTriangleRight size={25} />
                    <ul className="hidden overflow-hidden p-1 absolute rounded-md left-[calc(100%_-_5px)] shadow-[0px_0px_20px_#000000] top-1 bg-background-elevated-highlight w-[220px] hover:block group-hover:block max-h-[200px]">
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
