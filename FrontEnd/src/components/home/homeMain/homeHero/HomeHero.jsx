import React from "react";
import ArtistCard from "./ArtistCard";

import { home_hero, heading } from "../homeMain.module.css";

const HomeHero = () => {
  return (
    <div className={`${home_hero}`}>
      <div>
        <button className={`${heading}`}>Popular artists</button>
      </div>
      <ArtistCard name="Pritam" type="Artist" img="/pritam.jpeg" />
    </div>
  );
};

export default HomeHero;
