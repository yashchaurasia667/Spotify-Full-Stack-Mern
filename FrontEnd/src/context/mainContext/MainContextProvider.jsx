import { useState } from "react";
import MainContext from "./MainContext";

const MainContextProvider = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [libIcon, setLibIcon] = useState("Your Library");

  const collapse = () => {
    if (sidebarWidth > 70) {
      setLibIcon("");
      return setSidebarWidth(70);
    }
    setLibIcon("Your Library");
    return setSidebarWidth(350);
  };

  const value = {
    sidebarWidth,
    setSidebarWidth,
    libIcon,
    setLibIcon,
    collapse,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
