import React from "react";
import { user } from "../../types/index";

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
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);
export default MainContext;
