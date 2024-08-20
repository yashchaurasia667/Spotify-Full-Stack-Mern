import React from "react";

import SideBar from "../components/home/sideBar/SideBar";
import PurpleBar from "../components/home/PurpleBar";

const Home = () => {
  const style = {
    backgroundColor: "#000000",
    color: "white",
    padding: "10px 0px",
    height: "100vh",
    display: "grid",
    alignItems: "end",
    gridTemplateRows: `10fr 1fr`,
    gridTemplateColumns: "2fr 10fr",
  };

  return (
    // <div className="bg-[#000000] text-white py-[10px]">
    <div style={style}>
      <SideBar />
      <PurpleBar />
    </div>
  );
};

export default Home;
