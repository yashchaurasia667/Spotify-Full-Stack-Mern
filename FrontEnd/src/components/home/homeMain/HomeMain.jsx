import React from "react";

import "./homeMain.css"
import Navbar from "./Navbar";
import HomeHero from "./homeHero/HomeHero";

const HomeMain = () => {
  return (<div className="home-main">
    <div className="home-gradient"></div>
    <Navbar />
    <HomeHero />
  </div>);
};

export default HomeMain;
