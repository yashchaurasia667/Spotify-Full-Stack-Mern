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
  const getVibrantColor = async (imgPath: string): Promise<RGB> => {
    return new Promise((reslove, reject) => {
      const img = new Image();
      img.src = imgPath;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext && canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData!.data;

        let vibrantColor = { r: 0, g: 0, b: 0 };
        let maxSaturation = 0;

        for (let i = 0; i < data.length; i += 4) {
          const rbg = {
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
          };

          const max = Math.max(rbg.r, rbg.g, rbg.b);
          const min = Math.min(rbg.r, rbg.g, rbg.b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          if (saturation > maxSaturation) {
            maxSaturation = saturation;
            vibrantColor = rbg;
          }
        }

        console.log(vibrantColor);
        reslove(vibrantColor);
        // return { r: 0, g: 0, b: 0 };
      };
      img.onerror = () => {
        reject(new Error("something went wrong"));
      };
    });
  };

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

  const get = async () => {
    if (trackDetails?.album.images[1].url) {
      const color = await getVibrantColor(trackDetails?.album.images[1].url);
      setBackground(color);
    }
  };

  useEffect(() => {
    if (trackDetails?.album.images[1].url) {
      getVibrantColor(trackDetails?.album.images[1].url).then((color) =>
        setBackground(color)
      );
      // averageImageColor(trackDetails?.album.images[2].url).then((color) =>
      //   setBackground(color)
      // );
    }
  }, [trackDetails?.album.images[1].url]);

  return (
    <div
      className="bg-background-base rounded-lg flex gap-x-6 h-[50vh] pt-24 pb-6 px-6"
      style={{
        // background: `linear-gradient(to bottom, rgba(${background.r}, ${background.g}, ${background.b}, 0.3), #121212)`,
        background: `rgb(${background.r}, ${background.g}, ${background.b})`,
      }}
    >
      <img src={trackDetails?.album.images[1].url} />
      <div>
        <p>{trackDetails?.type}</p>
        <h1>{trackDetails?.name}</h1>
        <p>{trackDetails?.artists[0].name}</p>
        <p>{trackDetails?.album.name}</p>
        <p>{trackDetails?.album.release_date}</p>
        <p>{`${duration.hours ? duration.hours + ":" : ""}${duration.mins}:${
          duration.seconds
        }`}</p>
      </div>
    </div>
  );
};

export default TrackPage;
