import React, { useState } from "react";

import SignupContext from "./SignupContext";

const SignupContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const value = {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export default SignupContextProvider;
