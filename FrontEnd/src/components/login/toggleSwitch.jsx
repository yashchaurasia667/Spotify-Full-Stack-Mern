import React from "react";
import { useState } from "react";
import "./toggleSwitch.css";

const ToggleSwitch = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <div
      className={`toggle-btn ${toggled ? "toggled" : ""}`}
      onClick={() => setToggled(!toggled)}
    >
      <div className="thumb"></div>
    </div>
  );
};

export default ToggleSwitch;
