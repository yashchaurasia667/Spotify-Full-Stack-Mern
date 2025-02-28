import React, { useState, ReactNode } from "react";

import SignupContext from "./SignupContext";

interface props {
  children: ReactNode;
}

const SignupContextProvider = ({ children }: props) => {
  const [step, setStep] = useState(1);

  const checkUser = async (email: string) => {
    try {
      const res = await fetch("/api/user/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return res.ok;
      // if (!res.ok) {
      //   console.log(res);
      //   throw new Error("Failed to check user");
      // }
      // return await res.json();
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  };

  const value = {
    step,
    setStep,
    checkUser,
  };

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export default SignupContextProvider;
