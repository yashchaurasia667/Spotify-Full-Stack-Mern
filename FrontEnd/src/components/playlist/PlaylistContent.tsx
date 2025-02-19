import { FaPlay } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";

import GreenButton from "../global/GreenButton";
import Track from "../global/Track";

import { RGB } from "types";
import { useRef, useState } from "react";

interface PlaylistContentProps {
  bg: RGB;
}

const PlaylistContent = ({ bg }: PlaylistContentProps) => {
  const [optionsDialog, setOptionsDialog] = useState(false);
  const optionsRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="w-full relative">
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.3), #00000000)`,
          maxHeight: "50vh",
          padding: "0 1rem",
        }}
      >
        <div className="w-full px-5 py-5 relative">
          <GreenButton
            content={<FaPlay fill="#121212" size={20} />}
            className="p-5 hover:scale-105 hover:bg-[#3be477]"
          />
          <button
            className="text-lg ml-5 text-text-subdued hover:text-white hover:scale-105"
            onClick={() => setOptionsDialog(!optionsDialog)}
          >
            • • •
          </button>
          <dialog
            ref={optionsRef}
            open={optionsDialog}
            className="bg-background-elevated-highlight rounded-sm w-[150px] mx-0 absolute top-1/2 -translate-y-1/3 left-36"
          >
            <ul>
              <li className="flex items-center gap-x-3 text-lg px-3 py-3 w-full hover:bg-[#3e3e3e]">
                <CiCircleMinus strokeWidth={1} />
                Delete
              </li>
            </ul>
          </dialog>
        </div>

        <Track
          rank={1}
          name="Lovers Rock"
          artist="TV Girl"
          cover="https://i.scdn.co/image/ab67616d00004851e1bc1af856b42dd7fdba9f84"
          album="French Exit"
          duration="3:00"
        />
      </div>
    </div>
  );
};

export default PlaylistContent;
