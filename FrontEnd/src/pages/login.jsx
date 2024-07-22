import React from "react";
import Hero from "../components/login/hero.jsx";
import Footer from "../components/Footer.jsx";

const bgStyle = {
  widht: "100vw",
  height: "100%",
};

const Login = () => {
  return (
    <>
      <div
        className="background bg-gradient-to-b from-[#2a2a2a] to-[#000000] flex flex-col items-center"
        style={bgStyle}
      >
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default Login;
