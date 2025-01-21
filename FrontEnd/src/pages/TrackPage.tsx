import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainContext from "../context/mainContext/MainContext";

import { image, RGB } from "../types";

interface detailProps {
  album: {
    name: string;
    href: string;
    images: image[];
    release_date: string;
  };
  artists: {
    name: string;
    href: string;
  }[];
  duration_ms: number;
  name: string;
  type: string;
}

const TrackPage = () => {
  const { id } = useParams();

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { averageImageColor } = context;

  const [trackDetails, setTrackDetails] = useState<detailProps>();
  const [duration, setDuration] = useState({ hours: 0, mins: 0, seconds: 0 });
  const [background, setBackground] = useState<RGB>({ r: 0, g: 0, b: 0 });

  const convertToTime = (durationMs: number) => {
    const hours = Math.floor(durationMs / 600000);
    durationMs %= 600000;
    const mins = Math.floor(durationMs / 60000);
    durationMs %= 60000;
    const seconds = Math.floor(durationMs / 1000);
    setDuration({ hours, mins, seconds });
  };

  useEffect(() => {
    fetch(`/api/spotify/track/?id=${id}`, {
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        setTrackDetails(() => {
          convertToTime(data.duration_ms);
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
    <>
      <div
        className="bg-background-base rounded-lg flex items-center gap-x-6 h-[50vh] pt-24 pb-6 px-6"
        style={{
          background: `linear-gradient(to bottom, rgba(${background.r}, ${background.g}, ${background.b}, 0.9), rgba(${background.r}, ${background.g}, ${background.b}, 0.5))`,
        }}
      >
        <img
          src={trackDetails?.album.images[1].url}
          className="rounded-md shadow-[0px_0px_20px_#00000088] h-full"
        />
        <div className="font-medium -tracking-wide">
          <p>
            {trackDetails?.type
              ? trackDetails?.type.charAt(0).toUpperCase() +
                trackDetails?.type.slice(1)
              : "Error"}
          </p>
          <h1 className="text-8xl font-extrabold -tracking-wider">
            {trackDetails?.name}
          </h1>
          <div className="flex gap-x-1">
            <p>{trackDetails?.artists[0].name}</p>
            <span
              className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
              data-encore-id="text"
              data-separator="true"
            >
              •
            </span>
            <p>{trackDetails?.album.name}</p>
            <span
              className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
              data-encore-id="text"
              data-separator="true"
            >
              •
            </span>
            <p className="text-text-subdued">
              {trackDetails?.album.release_date}
            </p>
            <span
              className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
              data-encore-id="text"
              data-separator="true"
            >
              •
            </span>
            <p className="text-text-subdued">{`${
              duration.hours ? duration.hours + ":" : ""
            }${duration.mins}:${duration.seconds}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
