import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { image } from "../types";

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
  const [trackDetails, setTrackDetails] = useState<detailProps>();
  const [duration, setDuration] = useState({ hours: 0, mins: 0, seconds: 0 });

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
        // console.log(data);
        setTrackDetails(() => {
          convertToTime(data.duration_ms);
          return { ...data };
        });
      })
    );
  }, [id]);

  return (
    <div className="bg-background-base rounded-lg">
      <img src={trackDetails?.album.images[1].url} height={50} />
      <p>{trackDetails?.type}</p>
      <h1>{trackDetails?.name}</h1>
      <p>{trackDetails?.artists[0].name}</p>
      <p>{trackDetails?.album.name}</p>
      <p>{trackDetails?.album.release_date}</p>
      <p>{`${duration.hours ? duration.hours + ":" : ""}${duration.mins}:${
        duration.seconds
      }`}</p>
    </div>
  );
};

export default TrackPage;
