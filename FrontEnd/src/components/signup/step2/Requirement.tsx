import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

const Requirement = ({
  requirement = "<Requirement here>",
  currState = true,
  color = "white",
}) => {
  const textColor = { color };

  const [completed, setCompleted] = useState("");
  const checkDiv = useRef();

  useEffect(() => {
    if (currState === "neutral") return;
    if (currState) {
      setCompleted(<FaCheck color="#121212" className="h-2 w-2" />);
      checkDiv.current.style.backgroundColor =
        checkDiv.current.style.borderColor = "#1fdf64";
      return;
    }
    setCompleted("");
    checkDiv.current.style.borderColor = "#727272";
    checkDiv.current.style.backgroundColor = "#121212";
  }, [currState]);

  return (
    <>
      <div className="pointer-events-none grid grid-cols-[1fr_15fr] items-center">
        <div
          ref={checkDiv}
          className="1 border-2 border-[#727272] rounded-full h-3 w-3"
        >
          {completed}
        </div>
        <div className="font-medium" style={textColor}>
          {requirement}
        </div>
      </div>
    </>
  );
};

export default Requirement;
