import { useEffect } from "react";

import ArtistCard from "./ArtistCard";
import ArtistBar from "./ArtistBar";
import Footer from "./Footer";

import styles from "../homeMain.module.css";

// import MainContext from "../../../../context/mainContext/MainContext";

const HomeHero = () => {
  // const { setToken } = useContext(MainContext);

  // const checkLoggedIn = async () => {
  //   const res = await fetch("/api/auth/checkauth", {
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   if (data) console.log("logged in");
  //   else console.log("logged out");
  // };

  useEffect(() => {
    // checkLoggedIn();
  }, []);

  return (
    <div className={`${styles.home_hero}`}>
      <div>
        <ArtistBar
          main={"Popular artists"}
          side={"show all"}
          className="px-3 py-4"
        />
        <div className={`${styles.row_layout}`}>
          <ArtistCard
            name="Pritam"
            type="Artist"
            img="/artists/pritam.jpeg"
            className="w-[160px]"
          />
          <ArtistCard
            name="AR Rehman"
            type="Artist"
            img="/artists/ar_rehman.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Arijit Singh"
            type="Artist"
            img="/artists/arijit_singh.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Atif Aslam"
            type="Artist"
            img="/artists/atif_aslam.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="KK"
            type="Artist"
            img="/artists/kk.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Shrey Ghoshal"
            type="Artist"
            img="/artists/shreya_ghoshal.jpg"
            className="w-[160px]"
          />
        </div>
      </div>
      <div>
        <ArtistBar
          main={"Popular albums"}
          side={"show all"}
          className="px-3 py-4"
        />
        <div className={styles.row_layout}>
          <ArtistCard
            name="Aashiqui 2"
            type="Album"
            img="/albums/Ashiqi.jpeg"
            className="w-[160px]"
          />
          <ArtistCard
            name="jab We Met"
            type="Album"
            img="/albums/jab_we_met.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Kabir Singh"
            type="Album"
            img="/albums/kabir_singh.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Moosetape"
            type="Album"
            img="/albums/moosetape.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Rockstar"
            type="Album"
            img="/albums/rockstar.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Sajni"
            type="Album"
            img="/albums/sajni.jpg"
            className="w-[160px]"
          />
          <ArtistCard
            name="Ye Jawani Hai Deewani"
            type="Album"
            img="/albums/ye_jawani_hai_deewani.jpg"
            className="w-[160px]"
          />
        </div>
      </div>
      <div>
        <ArtistBar
          main={"Popular radio"}
          side={"show all"}
          className="px-3 py-4"
        />
        <div className={styles.row_layout}>
          <ArtistCard
            name=""
            type="with Neha Kakkar, Pritam, KK and more"
            img="/radio.png"
            className="w-[160px]"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeHero;
