import React from "react";

type AudioContextType = {};

const AudioContext = React.createContext<AudioContextType | undefined>(
  undefined
);

export default AudioContext;
