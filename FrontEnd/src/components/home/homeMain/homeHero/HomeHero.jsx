import React from "react";
import ArtistCard from "./ArtistCard";

import { home_hero } from "../homeMain.module.css";

const HomeHero = () => {
  return (
    <div className={`${home_hero}`}>
      <ArtistCard name="Pritam" type="Artist" img="/pritam.jpeg" />
    </div>
  );
};

export default HomeHero;
