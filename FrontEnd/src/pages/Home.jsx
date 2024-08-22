import React, { useState } from "react";
import { Resizable } from "react-resizable";

import SideBar from "../components/home/sideBar/SideBar";
import HomeMain from "../components/home/homeMain/HomeMain";
import PurpleBar from "../components/home/PurpleBar";

import "react-resizable/css/styles.css";

const Home = () => {
  const [sidebarWidth, setSidebarWidth] = useState(350);

  const onResizeSidebar = (event, { size }) => setSidebarWidth(size.width);

  const style = {
    backgroundColor: "#000000",
    color: "white",
    padding: "10px",
    height: "100vh",
    display: "grid",
    gridTemplateRows: "auto auto",
    gridTemplateColumns: `${sidebarWidth}px 1fr`,
    columnGap: "10px",
    // overflow: "hidden",
  };

  return (
    <div style={style}>
      <Resizable
        width={sidebarWidth}
        // height={0}
        onResize={onResizeSidebar}
        minConstraints={[300, 0]}
        maxConstraints={[500, 0]}
        draggableOpts={{ axis: "x" }}
      >
        <SideBar />
      </Resizable>
      <HomeMain />
      <PurpleBar />
    </div>
  );
};

export default Home;
