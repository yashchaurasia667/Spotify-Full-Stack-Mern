import React from "react";
import Hero from "../components/login/hero.jsx";

const bgStyle = {
  widht: "100vw",
  height: "100vh",
};

const Login = () => {
  return (
    <>
      <div
        className="background bg-gradient-to-b from-[#2a2a2a] to-[#0e0e0e] flex flex-col items-center"
        style={bgStyle}
      >
        <Hero />
      </div>
    </>
  );
};

export default Login;
