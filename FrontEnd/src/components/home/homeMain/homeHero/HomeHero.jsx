import React, { useContext, useEffect } from "react";
import ArtistCard from "./ArtistCard";

import { home_hero } from "../homeMain.module.css";
import ArtistBar from "./ArtistBar";
import Footer from "./Footer";
import MainContext from "../../../../context/mainContext/MainContext";

const HomeHero = () => {
  // const { setToken } = useContext(MainContext);

  useEffect(() => {
    // setToken(localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  }, []);

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
      <Footer />
    </div>
  );
};

export default HomeHero;
