import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import PurpleBar from "./PurpleBar";

import styles from "./BottomPlayBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";

interface duration {
  hour: number;
  min: number;
  sec: number;
}

const BottomPlayBar = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, currentlyPlaying, isPlaying, setIsPlaying } = context;

  const playerRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState(0);
  const [progressBg, setProgressBg] = useState<string>("white");
  const [volume, setVolume] = useState(100.0);
  const [duration, setDuration] = useState<duration>({
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [timeStamp, setTimeStamp] = useState<duration>({
    hour: 0,
    min: 0,
    sec: 0,
  });

  const changeColor = (
    e: HTMLInputElement,
    primaryColor: string,
    secondaryColor: string
  ) => {
    const value = parseInt(e.value);
    const max = parseInt(e.max);
    const percentage = (value / max) * 100;
    e.style.background = `linear-gradient(to right, ${primaryColor} ${percentage}%, ${secondaryColor} ${percentage}%)`;
  };

  const updateProgress = () => {
    if (progressRef.current) {
      const percentage =
        (parseInt(progressRef.current.value) /
          parseInt(progressRef.current.max)) *
        100;
      setProgress(percentage);
    }
  };

  const seek = (value: number) => {
    if (currentlyPlaying.duration_ms) {
      let seekDuration = (value / 100) * currentlyPlaying.duration_ms;
      if (playerRef.current) playerRef.current.currentTime = seekDuration;

      const hr = Math.floor(seekDuration / 600000);
      seekDuration %= 600000;
      const min = Math.floor(seekDuration / 60000);
      seekDuration %= 60000;
      const sec = Math.floor(seekDuration / 1000);

      setTimeStamp({ hour: hr, min: min, sec: sec });
      setProgress(value);
      // console.log(seekDuration);
    }
  };

  useEffect(() => {
    if (currentlyPlaying.duration_ms) {
      let tmp = currentlyPlaying.duration_ms;
      const hr = Math.floor(tmp / 600000);
      tmp %= 600000;
      const min = Math.floor(tmp / 60000);
      tmp %= 60000;
      const sec = Math.floor(tmp / 1000);

      setDuration({
        hour: hr,
        min: min,
        sec: sec,
      });
    }
  }, [currentlyPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (!isPlaying) {
      playerRef.current.pause();
    } else if (isPlaying) {
      playerRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (playerRef.current && currentlyPlaying && progressRef.current) {
        const currTime = playerRef.current.currentTime;
        const duration = currentlyPlaying.duration_ms / 1000;
        const timeProgress = (currTime / duration) * 100;

        const min = Math.floor(currTime / 60);
        const sec = Math.floor(currTime % 60);

        setTimeStamp((prev) => {
          return { ...prev, min: min, sec: sec };
        });

        progressRef.current.value = timeProgress.toString();
        updateProgress();
      }
    };

    const audioElement = playerRef.current;
    if (audioElement)
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audioElement)
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPlaying, currentlyPlaying]);

  return (
    <>
      {user.email ? (
        <div className="h-[70px] overflow-hidden px-3 grid grid-cols-[2fr_3fr_2fr] text-white row-start-3 col-span-2">
          <div className="hidden">
            <audio ref={playerRef}>
              <source
                // src={`/api/youtube/stream?video_id=${currentlyPlaying.id.youtubeId}`}
                // src={`/api/youtube/stream?video_id=${"odeHP8N4LKc"}`}
                src={`/api/youtube/stream?video_id=${"u6lihZAcy4s"}`}
                type="audio/mpeg"
              />
            </audio>
          </div>
          <div className="flex gap-x-4 items-center">
            <img
              // src="/albums/rockstar.jpg"
              src={
                currentlyPlaying.album.images.length
                  ? currentlyPlaying.album.images[1].url
                  : ""
              }
              alt={currentlyPlaying.name}
              width={55}
              className="rounded-sm"
            />
            <div className="leading-3">
              <Link
                to={`/track/${currentlyPlaying.id.spotifyId}`}
                className="text-sm font-medium"
              >
                {currentlyPlaying.name}
              </Link>
              <p className="text-sm text-text-subdued cursor-pointer hover:text-white hover:underline">
                {currentlyPlaying.artists.map((artist) => artist.name + ", ")}
              </p>
            </div>
          </div>

          <div className="w-[100%]">
            <div className="flex justify-center items-center gap-x-3">
              <button className={styles.controls}>
                <MdSkipPrevious
                  className={styles.prev_next}
                  size={35}
                  fill="#a7a7a7"
                  onMouseOver={(e) => (e.currentTarget.style.fill = "white")}
                  onMouseOut={(e) => (e.currentTarget.style.fill = "#a7a7a7")}
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPlaying(!isPlaying);
                }}
                className={styles.controls}
              >
                {isPlaying ? (
                  <IoPauseCircle size={40} />
                ) : (
                  <IoPlayCircle size={40} />
                )}
              </button>
              <button className={styles.controls}>
                <MdSkipNext
                  size={35}
                  fill="#a7a7a7"
                  onMouseOver={(e) => (e.currentTarget.style.fill = "white")}
                  onMouseOut={(e) => (e.currentTarget.style.fill = "#a7a7a7")}
                />
              </button>
            </div>
            <div className="flex w-[100%] gap-x-3 justify-center items-center overflow-hidden">
              <p>{`${timeStamp.hour ? timeStamp.hour + ":" : ""}${
                timeStamp.min
              }:${String(timeStamp.sec).padStart(2, "0")}`}</p>

              {/* progress bar */}
              <input
                type="range"
                ref={progressRef}
                min={0}
                max={100}
                defaultValue={0}
                style={{
                  background: `linear-gradient(to right, ${progressBg} ${progress}%, ${"gray"} ${progress}%)`,
                }}
                onChange={(e) => {
                  // console.log(parseInt(e.target.value));
                  seek(parseInt(e.target.value));
                }}
                onMouseOver={() => setProgressBg("#1ed760")}
                onMouseOut={() => setProgressBg("white")}
              />

              <p>{`${duration.hour ? duration.hour + ":" : ""}${duration.min}:${
                duration.sec
              }`}</p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-x-4">
            <LuMic2 size={16} strokeWidth={3} stroke="#a7a7a7" />
            <HiOutlineQueueList size={20} strokeWidth={2} stroke="#a7a7a7" />
            <div className="flex items-center gap-x-2">
              <HiOutlineSpeakerWave
                size={20}
                strokeWidth={2}
                stroke="#a7a7a7"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onInput={(e) => changeColor(e.currentTarget, "#1ed760", "gray")}
                onMouseOver={(e) =>
                  changeColor(e.currentTarget, "#1ed760", "gray")
                }
                onMouseOut={(e) =>
                  changeColor(e.currentTarget, "white", "gray")
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <PurpleBar />
      )}
    </>
  );
};

export default BottomPlayBar;
