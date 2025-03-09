import React from "react";
import { user, RGB, currentlyPlaying } from "../../types/index";

type MainContextType = {
  token: string;
  setToken: (token: string) => void;
  queueOpen: boolean;
  setQueueOpen: (e: boolean) => void;
  minRightBarWidth: number;
  maxRightBarWidth: number;
  libraryWidth: number;
  setLibraryWidth: (width: number) => void;
  user: user;
  setUser: (e: user) => void;
  minLibraryWidth: number;
  maxLibraryWidth: number;
  libIcon: JSX.Element;
  setLibIcon: (icon: JSX.Element) => void;
  collapse: () => void;
  averageImageColor: (imagePath: string) => Promise<RGB>;
  clickOutside: (e: MouseEvent, ref: React.RefObject<HTMLElement>) => boolean;
  createPlaylist: () => void;
  getPlaylistDetails: (id: string) => Promise<any>;
  addToPlaylist: (playlist_id: string, track_id: string) => void;
  currentlyPlaying: currentlyPlaying;
  setCurrentlyPlaying: (e: currentlyPlaying) => void;
  isPlaying: boolean;
  setIsPlaying: (e: boolean) => void;
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);
export default MainContext;
