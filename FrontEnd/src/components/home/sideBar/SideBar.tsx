import Library from "./Library";

import {sidebar} from './sideBar.module.css'

function SideBar() {
  return (
    <div className={`${sidebar}`}>
      <Library />
    </div>
  );
}

export default SideBar;
