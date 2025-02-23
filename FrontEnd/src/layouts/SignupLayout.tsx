import { Outlet, useParams } from "react-router-dom";

import Footer from "../components/global/Footer";

import spotify from "/spotifyBw.svg";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";

import styles from "../styleSheets/scrollbarVisible.module.css";
import NotFound from "../pages/NotFound";

const SignupLayout = () => {
  const favicon = document.querySelector("#favicon") as HTMLLinkElement | null;
  if (favicon) favicon.href = "spotifyBlack.svg";
  document.title = "Sign up - Spotify";

  const { id } = useParams();

  return id || !id ? (
    <div className={"bg-background-base min-h-[100vh] " + styles.scroll}>
      <div className="top-logo flex items-center justify-center">
        <img src={spotify} alt="Spofity logo" />
      </div>
      <SignupContextProvider>
        <Outlet />
      </SignupContextProvider>
      <Footer className="w-[300px] sm:w-full mx-auto relative" />
    </div>
  ) : (
    <NotFound />
  );
};

export default SignupLayout;
