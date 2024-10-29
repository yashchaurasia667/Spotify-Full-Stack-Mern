import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Resizable } from "react-resizable";

import Navbar from "../components/navbar/Navbar";
import Library from "../components/home/sideBar/Library";
import BottomPlayBar from "../components/home/bottomPlayBar/BottomPlayBar";

import "react-resizable/css/styles.css";
import { parent } from "../styleSheets/Home.module.css";

import MainContext from "../context/mainContext/MainContext";
import SignupContextProvider from "../context/signupContext/SignupContextProvider";

const MainLayout = () => {
  document.querySelector("#favicon").href = "spotifyGreen.svg";
  const {
    sidebarWidth,
    setSidebarWidth,
    minSidebarWidth,
    maxSidebarWidth,
    collapse,
  } = useContext(MainContext);

  const style = {
    backgroundColor: "#000",
    padding: "10px",
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: `${sidebarWidth}px 1fr`,
    gridTemplateRows: "50px repeat(2, auto)",
    columnGap: "10px",
    rowGap: "10px",
  };

  const onResizeSidebar = (event, { size }) => {
    if (size.width > minSidebarWidth) return setSidebarWidth(size.width);
  };

  const onResizeStop = (event, { size }) => {
    if (size.width == minSidebarWidth) return collapse();
  };

  const onResizeStart = (event) => {
    if (sidebarWidth == 70) {
      setSidebarWidth(minSidebarWidth + 1);
      onResizeSidebar(event, { size: { width: sidebarWidth } });
    }
  };

  return (
    <div className={parent} style={style}>
      <SignupContextProvider>
        <Navbar />
        <Resizable
          width={sidebarWidth}
          height={0}
          minConstraints={[minSidebarWidth, 0]}
          maxConstraints={[maxSidebarWidth, 0]}
          onResize={onResizeSidebar}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          draggableOpts={{ axis: "x" }}
        >
          <div>
            <Library
              sidebarWidth={sidebarWidth}
              setSidebarWidth={setSidebarWidth}
            />
          </div>
        </Resizable>

        <Outlet />
        <BottomPlayBar />
      </SignupContextProvider>
    </div>
  );
};

export default MainLayout;
