import React, { useState } from "react";

import AudioContext from "./AudioContext";

type props = {
  children: React.ReactNode;
};

const AudioContextProvider = ({ children }: props) => {
  const [youtubeId, setYoutubeId] = useState<string>();
  // const playTrack = async (youtubeId: string) => {
  //   const res = await fetch(`/api/youtube/stream?video_id=${youtubeId}`, {
  //     credentials: "include",
  //   });
  //   if (!res.ok) console.error("Failed to play the track");
  // };

  const value = {
    youtubeId,
    setYoutubeId
  };
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioContextProvider;
