import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Step4 from "./step4/Step4";

function SignupHero() {
  const { id } = useParams();

  const renderStep = (step: number) => {
    switch (step) {
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/checkuser", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      res.json().then((info) => {
        if (info) setLoggedIn(true);
      });
    });
  }, []);

  return loggedIn ? (
    <Navigate to={"/"} />
  ) : (
    <div className="bg-[#121212] flex justify-center">
      {renderStep(parseInt(id!))}
    </div>
  );
}

export default SignupHero;
