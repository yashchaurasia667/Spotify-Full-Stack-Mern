import React from "react";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";
import Hero from "../components/signup/SignupHero";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  document.querySelector("#favicon").href = "spotifyBlack.svg";

  return (
    <SignupContextProvider>
      <Hero />
    </SignupContextProvider>
  );
};

export default SignUp;
