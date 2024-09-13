import { useState } from "react";

const MainContextProvider = () => {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const value = {
    sidebarWidth,
    setSidebarWidth,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
