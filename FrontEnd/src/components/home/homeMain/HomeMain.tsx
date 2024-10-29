import HomeHero from "./homeHero/HomeHero";

import styles from "./homeMain.module.css";

const HomeMain = () => {
  const { home_main, home_gradient } = styles;
  document.title = "Spotify - Web Player: Music for everyone";
  return (
    <div className={home_main}>
      <div className={home_gradient}></div>
      <HomeHero />
    </div>
  );
};

export default HomeMain;
