import React, { useState } from "react";
import { Resizable } from "react-resizable";

import SideBar from "../components/home/sideBar/SideBar";
import HomeMain from "../components/home/homeMain/HomeMain";
import PurpleBar from "../components/home/PurpleBar";
import Navbar from "../components/navbar/Navbar";

import "react-resizable/css/styles.css";
import "../styleSheets/Home.css";

const Home = () => {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const onResizeSidebar = (event, { size }) => setSidebarWidth(size.width);

  const style = {
    backgroundColor: "#000",
    padding: "10px",
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: `${sidebarWidth}px 1fr`,
    gridTemplateRows: "repeat(3, auto)",
    columnGap: "10px",
  };

  return (
    <>
      <div className="parent" style={style}>
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

        <HomeMain />
        <PurpleBar />
      </div>
    </>
  );
};

export default Home;
