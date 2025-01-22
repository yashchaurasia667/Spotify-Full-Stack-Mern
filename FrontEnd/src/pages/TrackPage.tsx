import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TrackHeader from "../components/Track/TrackHeader";
import PlayPage from "../components/global/PlayPage";

import MainContext from "../context/mainContext/MainContext";

import { RGB, trackDetails } from "../types";
import Track from "../components/global/Track";

const TrackPage = () => {
  const { id } = useParams();

  const [trackDetails, setTrackDetails] = useState<trackDetails>();
  const [background, setBackground] = useState<RGB>({ r: 0, g: 0, b: 0 });

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
        <PlayPage />
        <div>
          <p className="text-2xl font-bold">Lyrics</p>
          <p className="text-4xl font-extrabold py-10">We're still working on it</p>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
