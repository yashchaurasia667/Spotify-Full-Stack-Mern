import React from "react";

type signupContext = {
  step: number;
  setStep: (step: number) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (e: string) => void;
  name: string;
  setName: (e: string) => void;
  year: number;
  setYear: (e: number) => void;
  month: number;
  setMonth: (e: number) => void;
  day: number;
  setDay: (e: number) => void;
  gender: string;
  setGender: (e: string) => void;
  validateEmail: (e: string) => boolean;
  checkUser: (e: string) => Promise<boolean>;
};

const SignupContext = React.createContext<signupContext | undefined>(undefined);

export default SignupContext;
