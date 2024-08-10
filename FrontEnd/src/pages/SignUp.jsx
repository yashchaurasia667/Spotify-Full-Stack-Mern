import React, { useContext } from "react";

import SignupContextProvider from "../context/signupContext/SignupContextProvider";
import Hero from '../components/signup/Hero'

const SignUp = () => {
  document.title = "Sign up - Spotify";

  return (
    <SignupContextProvider>
      <Hero />
    </SignupContextProvider>
  );
};

export default SignUp;
