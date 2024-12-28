import { useContext, useEffect, useState } from "react";

import HomeHero from "./homeHero/HomeHero";
import Recents from "./homeHero/Recents";

import MainContext from "../../../context/mainContext/MainContext";

import styles from "./homeMain.module.css";
import { RGB } from "../../../types";

const HomeMain = () => {
  document.title = "Spotify - Web Player: Music for everyone";
  const { home_main } = styles;

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, averageImageColor } = context;

  const [gradient, setGradient] = useState<RGB>({ r: 83, g: 83, b: 83 });
  useEffect(() => {
    if (!gradient) setGradient({ r: 83, g: 83, b: 83 });
  }, [gradient]);

  return (
    <div className={home_main}>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(${gradient.r}, ${gradient.g}, ${gradient.b}, 0.3), #121212)`,
          transition: "background-color 1s ease-in-out",
          height: "40vh",
          width: "100%",
          position: "absolute",
        }}
      ></div>
      {user.email ? <Recents className="px-4" setGradient={setGradient} /> : ""}
      <HomeHero />
    </div>
  );
};

export default HomeMain;
