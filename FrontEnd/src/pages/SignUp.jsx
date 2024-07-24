import React from "react";
import Hero from "../components/signup/Hero.jsx"
import colors from "../styleSheets/colors";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return <div className={`bg-[${colors.bgDark}] text-white`}>
    <Hero />
  </div>;
};

export default SignUp;
