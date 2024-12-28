import { useContext, useEffect, useState, useRef } from "react";
import gsap from "gsap";

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
  const { user } = context;

  const [gradient, setGradient] = useState<RGB>({ r: 83, g: 83, b: 83 });
  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(gradientRef.current, {
      duration: 1,
      backgroundImage: `linear-gradient(to bottom, rgba(${gradient.r}, ${gradient.g}, ${gradient.b}, 0.3), #121212)`,
    });
  }, [gradient]);

  return (
    <div className={home_main}>
      <div
        ref={gradientRef}
        style={{
          background: `linear-gradient(to bottom, rgba(${gradient.r}, ${gradient.g}, ${gradient.b}, 0.3), #121212)`,
          transition: "background-color 1s ease-in-out",
          height: "40vh",
          width: "100%",
          position: "absolute",
        }}
      ></div>
      {/* <div className="h-[40vh] w-full absolute" ref={gradientRef}></div> */}
      {user.email ? <Recents className="px-4" setGradient={setGradient} /> : ""}
      <HomeHero />
    </div>
  );
};

export default HomeMain;
