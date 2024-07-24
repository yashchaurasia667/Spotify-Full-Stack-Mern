import React from "react";
import Hero from "../components/signup/Hero.jsx";
import Footer from "../components/global/Footer.jsx";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  return (
    <div className={`bg-[#121212] text-white`}>
      <Hero />
      <div className="w-[300px] mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
