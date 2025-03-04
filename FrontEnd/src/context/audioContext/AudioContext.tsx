import React from "react";

type AudioContextType = {
  youtubeId: string;
  setYoutubeId: (e: string) => void;
};

const AudioContext = React.createContext<AudioContextType | undefined>(
  undefined
);

export default AudioContext;
