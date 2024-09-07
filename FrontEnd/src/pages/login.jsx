import React from "react";
import Hero from "../components/login/hero.jsx";
import Footer from "../components/global/Footer.jsx";

const Login = () => {
  document.title = "Log In - Spotify";

  document.querySelector("#favicon").href = "spotifyBlack.svg";
  return (
    <>
      <div className="relative w-[100%] background bg-gradient-to-b from-[#2a2a2a] to-[#000000] flex flex-col items-center">
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default Login;
