import { useContext, useEffect, useState, useRef } from "react";
import gsap from "gsap";

import HomeHero from "./homeHero/HomeHero";
import Recents from "./homeHero/Recents";

import MainContext from "../../../context/mainContext/MainContext";

import styles from "./homeMain.module.css";
import { RGB } from "../../../types";
import { useNavigate, useLocation } from "react-router-dom";

const HomeMain = () => {
  document.title = "Spotify - Web Player: Music for everyone";
  const { home_main } = styles;

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  const location = useLocation();
  const navigate = useNavigate();

  const [gradient, setGradient] = useState<RGB>({ r: 83, g: 83, b: 83 });
  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(gradientRef.current, {
      duration: 1,
      backgroundImage: `linear-gradient(to bottom, rgba(${gradient.r}, ${gradient.g}, ${gradient.b}, 0.3), #121212)`,
    });
  }, [gradient]);

  const setToken = async (
    id: string,
    access_token: string,
    refresh_token: string
  ) => {
    document.cookie = `access_token=${access_token}; path=/`;
    document.cookie = `refresh_token=${refresh_token}; path=/`;

    const res = await fetch("/api/user/linkspotify", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!res.ok) console.error("something went wrong");
    else navigate("/");
  };

  const refreshToken = async (refresh_token: string) => {
    try {
      const res = await fetch(
        `/api/spotify/refreshtoken?refresh_token=${refresh_token}`
      );
      const data = await res.json();
      const { access_token } = data;
      if (access_token) setToken(user._id, access_token, refresh_token);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.replace("#", ""));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token != null && refresh_token != null && user._id) {
      setToken(user._id, access_token, refresh_token);
      //   fetch("/api/user/linkspotify", {
      //     method: "post",
      //     credentials: "include",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       id: user._id,
      //       access_token: access_token,
      //       refresh_token: refresh_token,
      //     }),
      //   }).then((res) => {
      //     if (res.ok) navigate("/");
      //   });
    }

    // if (user.refresh_token) {
    //   fetch("/api/spotify/checktokenvalidity", {
    //     credentials: "include",
    //   }).then((res) => {
    // if (!res.ok) refreshToken(user.refresh_token);
    // });
    // }
  }, [user]);

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
