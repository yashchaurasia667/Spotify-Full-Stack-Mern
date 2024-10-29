import React, { useState, ReactNode } from "react";

import SignupContext from "./SignupContext";

interface props {
  children: ReactNode;
}

const SignupContextProvider = ({ children }: props) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("");

  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const validateEmail = (email: string) => {
    return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const value = {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    validateEmail,
    name,
    setName,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    gender,
    setGender,
    loggedIn,
    setLoggedIn,
  };

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export default SignupContextProvider;
