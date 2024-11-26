import React from "react";

type signupContext = {
  step: number;
  setStep: (step: number) => void;
  checkUser: (e: string) => Promise<boolean>;
};

const SignupContext = React.createContext<signupContext | undefined>(undefined);

export default SignupContext;
