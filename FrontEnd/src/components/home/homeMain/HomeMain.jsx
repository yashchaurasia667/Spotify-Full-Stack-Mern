import React from "react";

import "./homeMain.css"
import Navbar from "./Navbar";
import HomeHero from "./homeHero/HomeHero";

const HomeMain = () => {
  return (<div className="home-main">
    <Navbar />
    <div className="h-[20%] bg-gradient-to-b from-[#535353] to-[#121212]"></div>
    {/* <div className="bg-red-50 h-screen"></div> */}
    {/* <HomeHero /> */}
  </div>);
};

export default HomeMain;
