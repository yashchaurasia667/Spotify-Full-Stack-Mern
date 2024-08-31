import React from "react";
import { Link } from "react-router-dom";
import ArtistCard from "./ArtistCard";

import { home_hero, heading, side_heading } from "../homeMain.module.css";

const HomeHero = () => {
  return (
    <div className={`${home_hero}`}>
      <div className="flex justify-between px-3 mt-5">
        <Link className={`${heading}`}>Popular artists</Link>
        <Link className={`${side_heading}`}>show all</Link>
      </div>
      <div className="flex gap-x-2">
        <ArtistCard name="Pritam" type="Artist" img="/pritam.jpeg" />
      </div>
    </div>
  );
};

export default HomeHero;
