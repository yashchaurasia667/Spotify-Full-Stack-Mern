import React from "react";

const PurpleBar = () => {
  return (
    <div className="h-[70px] p-3 bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white flex justify-between row-start-3 col-span-2">
      <div>
        <p className="font-semibold text-sm">Preview of Spotify</p>
        <p className="text-sm">
          Sign up to get unlimited songs and podcasts with occasional ads. No
          credit card needed.
        </p>
      </div>
      <button className="bg-white font-semibold text-md text-black rounded-full py-3 px-7">
        Sign up for free
      </button>
    </div>
  );
};

export default PurpleBar;
