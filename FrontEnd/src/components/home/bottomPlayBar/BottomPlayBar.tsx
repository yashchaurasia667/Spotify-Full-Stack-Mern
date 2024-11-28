import { useEffect, useState } from "react";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";

import PurpleBar from "./PurpleBar";

const BottomPlayBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
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
        <div className="h-[70px] overflow-hidden p-3 grid grid-cols-3 text-white row-start-3 col-span-2">
          <div className="flex gap-x-4 items-center">
            <img
              src="/albums/rockstar.jpg"
              alt="cover"
              width={55}
              className="rounded-sm"
            />
            <div className="leading-3">
              <p className="text-sm">Tum Ho</p>
              <p className="text-sm text-text-subdued cursor-pointer hover:text-white hover:underline">
                Mohit Chauhan
              </p>
            </div>
          </div>

          <div>
            <div>
              <MdSkipPrevious />
              <IoPlayCircle />
              <MdSkipNext />
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
