import React, { useEffect } from "react";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";
import Hero from "../components/signup/Hero";

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
