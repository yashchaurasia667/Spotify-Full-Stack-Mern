import Library from "./Library";
import Pages from "./Pages";

import {sidebar} from './sideBar.module.css'

function SideBar() {
  return (
    <div className={`${sidebar}`}>
      {/* <Pages /> */}
      <Library />
    </div>
  );
}

export default SideBar;
