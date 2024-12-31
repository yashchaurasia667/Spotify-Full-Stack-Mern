import React from "react";
import { user, RGB } from "../../types/index";

type MainContextType = {
  token: string;
  setToken: (token: string) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  user: user;
  setUser: (e: user) => void;
  minSidebarWidth: number;
  maxSidebarWidth: number;
  libIcon: JSX.Element;
  setLibIcon: (icon: JSX.Element) => void;
  collapse: () => void;
  averageImageColor: (imageElement: string) => RGB;
  clickOutside: (e: MouseEvent, ref: React.RefObject<HTMLElement>) => boolean;
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);
export default MainContext;
