import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import TrackHeader from "../components/Track/TrackHeader";
import PlayPage from "../components/global/PlayPage";

import MainContext from "../context/mainContext/MainContext";

import { RGB, trackDetails } from "../types";
import { RxTriangleRight } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

const TrackPage = () => {
  const { id } = useParams();

  const [trackDetails, setTrackDetails] = useState<trackDetails>();
  const [background, setBackground] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [optionsDialog, setOptionsDialog] = useState<boolean>(false);

  const playlistRef = useRef<HTMLUListElement>(null);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { averageImageColor } = context;

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
                className="bg-background-elevated-highlight rounded-sm w-[210px] mx-0 absolute top-1/2 -translate-y-1/3 left-36"
              >
                <ul>
                  <li className="flex items-center gap-x-3 text-lg px-3 py-3 w-full hover:bg-[#3e3e3e]">
                    <FaPlus size={15} />
                    Add to Playlist
                    <RxTriangleRight size={25} />
                    <ul ref={playlistRef}></ul>
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
