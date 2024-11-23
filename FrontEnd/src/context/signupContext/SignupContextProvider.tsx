import React, { useState, ReactNode } from "react";

import SignupContext from "./SignupContext";

interface props {
  children: ReactNode;
}

const SignupContextProvider = ({ children }: props) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [gender, setGender] = useState("");

  const validateEmail = (email: string) => {
    return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // const value = {
  //   step,
  //   setStep,
  //   email,
  //   setEmail,
  //   password,
  //   setPassword,
  //   validateEmail,
  //   name,
  //   setName,
  //   year,
  //   setYear,
  //   month,
  //   setMonth,
  //   day,
  //   setDay,
  //   gender,
  //   setGender,
  // };

  const value = {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
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
    validateEmail,
  };

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export default SignupContextProvider;
