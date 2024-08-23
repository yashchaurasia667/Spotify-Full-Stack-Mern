import Library from "./Library";
import Pages from "./Pages";

import "./sideBar.css";

function SideBar() {
  return (
    <>
      {/* <div className="sidebar"> */}
      <Pages />
      <Library />
      {/* </div> */}
    </>
  );
}

export default SideBar;
