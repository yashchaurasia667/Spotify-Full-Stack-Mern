import { ReactNode, useState } from "react";
import MainContext from "./MainContext";

type contextProps = {
  children: ReactNode;
};

const MainContextProvider = ({ children }: contextProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [token, setToken] = useState("");
  const [libIcon, setLibIcon] = useState(
    <>
      <svg
        role="img"
        height="24"
        width="24"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-encore-id="icon"
        className="Svg-sc-ytk21e-0 haNxPq"
      >
        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
      </svg>
      Your Library
    </>
  );
  const minSidebarWidth = 280;
  const maxSidebarWidth = 450;

  const collapse = () => {
    if (sidebarWidth > 70) {
      setLibIcon(
        <>
          <svg
            data-encore-id="icon"
            role="img"
            height="24px"
            width="24px"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="Svg-sc-ytk21e-0 bneLcE"
          >
            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
          </svg>
        </>
      );
      return setSidebarWidth(70);
    }
    setLibIcon(
      <>
        <svg
          data-encore-id="icon"
          role="img"
          height="24"
          width="24"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="Svg-sc-ytk21e-0 haNxPq"
        >
          <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
        </svg>
        Your Library
      </>
    );
    return setSidebarWidth(350);
  };

  const value = {
    token,
    setToken,
    sidebarWidth,
    setSidebarWidth,
    minSidebarWidth,
    maxSidebarWidth,
    libIcon,
    setLibIcon,
    collapse,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
