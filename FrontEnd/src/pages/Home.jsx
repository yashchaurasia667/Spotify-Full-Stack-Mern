import React from "react";

import SideBar from "../components/home/sideBar/SideBar";
import HomeMain from "../components/home/homeMain/HomeMain";
import PurpleBar from "../components/home/PurpleBar";

const Home = () => {
  const style = {
    backgroundColor: "#000000",
    color: "white",
    padding: "10px 0px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    // overflow: "hidden",
  };

  return (
    // <div className="bg-[#000000] text-white py-[10px]">
    <div style={style}>
      <div className="flex">
        <SideBar />
        <HomeMain />
      </div>
      <PurpleBar />
    </div>
  );
};

export default Home;
