import Library from "./Library";

import styles from './sideBar.module.css'

function SideBar() {
  return (
    <div className={`${styles.sidebar}`}>
      <Library />
    </div>
  );
}

export default SideBar;
