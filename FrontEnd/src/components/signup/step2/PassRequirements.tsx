import Requirement from "./Requirement";

const PassRequirements = ({letter=false, number=false, len=false}) => {
  return (
    <>
      <div className="grid gird-rows-4 gap-y-2 text-sm mt-5">
        <p className="font-semibold">Your password must contain atleast</p>
        <Requirement
          requirement="1 letter"
          currState={letter}
          color={letter ? "white" : "#f15e6c"}
        />
        <Requirement
          requirement="1 number or special character (example: # ? ! &)"
          currState={number}
          color={number ? "white" : "#f15e6c"}
        />
        <Requirement
          requirement="10 characters"
          currState={len}
          color={len ? "white" : "#f15e6c"}
        />
      </div>
    </>
  );
};

export default PassRequirements;
