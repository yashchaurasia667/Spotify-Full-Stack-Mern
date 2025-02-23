import { useState } from "react";

import styles from "./login.module.css";

const ToggleSwitch = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <div
      className={`${styles.toggleBtn} ${toggled ? styles.toggled : ""}`}
      onClick={() => setToggled(!toggled)}
    >
      <div className={styles.thumb}></div>
    </div>
  );
};

export default ToggleSwitch;
