import React from "react";
import ArtistCard from "./ArtistCard";

import { home_hero } from "../homeMain.module.css";
import ArtistBar from "./ArtistBar";

const HomeHero = () => {
  return (
    <div className={`${home_hero}`}>
      <div>
        <ArtistBar main={"Popular artists"} side={"show all"} />
        <div className="flex gap-x-2">
          <ArtistCard name="Pritam" type="Artist" img="/artists/pritam.jpeg" />
        </div>
      </div>
      <div>
        <ArtistBar main={"Popular albums"} side={"show all"} />
        <div className="flex gap-x-2">
          <ArtistCard
            name="Aashiqui 2"
            type="Album"
            img="/albums/Ashiqi.jpeg"
          />
        </div>
      </div>
      <div>
        <ArtistBar main={"Popular radio"} side={"show all"} />
        <div className="flex gap-x-2">
          <ArtistCard
            name=""
            type="with Neha Kakkar, Pritam, KK and more"
            img="/radio.png"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
