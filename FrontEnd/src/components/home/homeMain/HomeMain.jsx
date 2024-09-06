import React from "react";

import HomeHero from "./homeHero/HomeHero";

import { home_main, home_gradient } from "./homeMain.module.css";

const HomeMain = () => {
  return (
    <div className={home_main}>
      <div className={home_gradient}></div>
      <HomeHero />
    </div>
  );
};

export default HomeMain;
