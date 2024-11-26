import { useParams } from "react-router-dom";

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
    // if (step == 2) return <Step2 />;
    // else if (step == 3) return <Step3 />;
    // else if (step == 4) return <Step4 />;
    // else return <Step1 />;
  };

  return (
    <div className="bg-[#121212] flex justify-center">
      {/* {renderStep(parseInt(id!))} */}
      {renderStep(3)}
    </div>
  );
}

export default SignupHero;
