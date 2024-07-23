import React from "react";
import Hero from "../components/login/hero.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {
  return (
    <>
      <div className="relative w-[100%] xl:h-[100%] h-screen background bg-gradient-to-b from-[#2a2a2a] to-[#000000] flex flex-col items-center">
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default Login;
