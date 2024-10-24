import { useState } from "react";

import SignupContext from "./SignupContext";

const SignupContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("");

  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const validateEmail = (e) => {
    return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(e);
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
