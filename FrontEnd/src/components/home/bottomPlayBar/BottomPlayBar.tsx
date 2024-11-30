import { useEffect, useState } from "react";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import PurpleBar from "./PurpleBar";

import styles from "./BottomPlayBar.module.css";

const BottomPlayBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
    fetch("/api/auth/checkauth", {
      credentials: "include",
    }).then((res) =>
      res.json().then((info) => {
        if (info) setLoggedIn(true);
        else setLoggedIn(false);
      })
    );
  }, []);
  return (
    <>
      {loggedIn ? (
        <div className="h-[70px] overflow-hidden px-3 grid grid-cols-[2fr_3fr_2fr] text-white row-start-3 col-span-2">
          <div className="flex gap-x-4 items-center">
            <img
              src="/albums/rockstar.jpg"
              alt="cover"
              width={55}
              className="rounded-sm"
            />
            <div className="leading-3">
              <p className="text-sm font-medium">Tum Ho</p>
              <p className="text-sm text-text-subdued cursor-pointer hover:text-white hover:underline">
                Mohit Chauhan
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
              <button className={styles.controls}>
                <IoPlayCircle size={40} />
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
              <p>1:00</p>
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={0}
                onInput={(e) => changeColor(e.currentTarget, "#1ed760", "gray")}
                onMouseOver={(e) =>
                  changeColor(e.currentTarget, "#1ed760", "gray")
                }
                onMouseOut={(e) =>
                  changeColor(e.currentTarget, "white", "gray")
                }
                className={`${styles.progress}`}
              />
              <p>3:23</p>
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
                defaultValue={100}
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
