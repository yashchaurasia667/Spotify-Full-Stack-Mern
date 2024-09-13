import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Resizable } from "react-resizable";

import Navbar from "../components/navbar/Navbar";
import Library from "../components/home/sideBar/Library";
import BottomPlayBar from "../components/home/bottomPlayBar/BottomPlayBar";

import "react-resizable/css/styles.css";
import { parent } from "../styleSheets/Home.module.css";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";

const MainLayout = () => {
  document.querySelector("#favicon").href = "spotifyGreen.svg";
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const onResizeSidebar = (event, { size }) => {
    if (size.width < 280) return setSidebarWidth(70);
    // if (size.width > 250) return setSidebarWidth("250");
    if (size.width > 270) setSidebarWidth(size.width);
  };

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

  return (
    <div className={parent} style={style}>
      <SignupContextProvider>
        <Navbar />
        <Resizable
          width={sidebarWidth}
          height={0}
          minConstraints={[270, 0]}
          maxConstraints={[450, 0]}
          onResize={onResizeSidebar}
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
