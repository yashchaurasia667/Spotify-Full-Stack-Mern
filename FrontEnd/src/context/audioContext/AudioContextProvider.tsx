import React from "react";

import AudioContext from "./AudioContext";

type props = {
  children: React.ReactNode;
};

const AudioContextProvider = ({ children }: props) => {
  const value = {};
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioContextProvider;
