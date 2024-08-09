import React, { useState } from "react";

import SignupContext from "./SignupContext";

const SignupContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  return <SignupContext.Provider value={{step, setStep}}>{children}</SignupContext.Provider>;
};

export default SignupContextProvider;
