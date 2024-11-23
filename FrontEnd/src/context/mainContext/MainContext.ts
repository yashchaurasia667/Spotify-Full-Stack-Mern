import React, { ReactNode, Dispatch, SetStateAction } from "react";

type MainContextType = {
  token: string;
  setToken: (token: string) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  minSidebarWidth: number;
  maxSidebarWidth: number;
  libIcon: JSX.Element;
  setLibIcon: (icon: JSX.Element) => void;
  collapse: () => void;
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);
export default MainContext;
