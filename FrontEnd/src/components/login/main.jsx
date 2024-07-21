import React from "react";

const Main = () => {
  return (
    <div
      className="background bg-gradient-to-b from-[#2a2a2a] to-[#0e0e0e] flex justify-center items-center"
      style={bgStyle}
    >
      <div className="w-[50%] h-[90%] text-white bg-gradient-to-b from-[#0e0e0e] to-[#2a2a2a] rounded-[10px] flex flex-col justify-center items-center">
        <img src={spotify} className="scale-90" alt="Spotify Logo" />
        <p className="text-3xl font-semibold">Login to Spotify</p>
      </div>
    </div>
  );
};

export default Main;
