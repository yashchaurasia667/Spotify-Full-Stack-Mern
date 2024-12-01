import { FaCheck } from "react-icons/fa";

const Requirement = ({
  requirement = "<Requirement here>",
  currState = true,
  color = "white",
}) => {
  const textColor = { color };

  return (
    <>
      <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
        <div
          // ref={checkDiv}
          className={`1 border-2  rounded-full h-3 w-3 ${
            currState ? "bg-[#1fdf64] border-[#1fdf64]" : "border-[#727272]"
          }`}
        >
          {currState ? <FaCheck fill="#121212" className="h-2 w-2" /> : ""}
        </div>
        <div className="font-medium" style={textColor}>
          {requirement}
        </div>
      </div>
    </>
  );
};

export default Requirement;
