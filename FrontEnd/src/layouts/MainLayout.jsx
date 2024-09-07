import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Resizable } from "react-resizable";

import SideBar from "../components/home/sideBar/SideBar";
import Navbar from "../components/navbar/Navbar";

import "react-resizable/css/styles.css";
import "../styleSheets/Home.css";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";
import BottomPlayBar from "../components/home/bottomPlayBar/BottomPlayBar";

const MainLayout = () => {
  document.querySelector("#favicon").href = "spotifyGreen.svg";
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const onResizeSidebar = (event, { size }) => setSidebarWidth(size.width);

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
    <div className="parent" style={style}>
      <SignupContextProvider>
        <Navbar />
        <Resizable
          width={sidebarWidth}
          height={0}
          minConstraints={[280, 0]}
          maxConstraints={[450, 0]}
          onResize={onResizeSidebar}
          draggableOpts={{ axis: "x" }}
        >
          <div>
            <SideBar />
          </div>
        </Resizable>

        <Outlet />
        <BottomPlayBar />
      </SignupContextProvider>
    </div>
  );
};

export default MainLayout;
