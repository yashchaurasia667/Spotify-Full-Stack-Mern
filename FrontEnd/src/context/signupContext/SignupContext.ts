import React from "react";

interface signupContext {
  step: number;
  setStep: (step: number) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (e: string) => void;
  validateEmail: (email: string) => boolean;
  name: string;
  setName: (e: string) => void;
  year: number;
  setYear: (e: number) => void;
  month: number;
  setMonth: (e: number)=> void;
  day: number;
  setDay: (e: number)=> void;
  // gender: 
}

const SignupContext = React.createContext(<signupContext | undefined>undefined);

export default SignupContext;
