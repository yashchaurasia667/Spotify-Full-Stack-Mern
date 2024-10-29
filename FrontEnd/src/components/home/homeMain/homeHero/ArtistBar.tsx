import { Link } from "react-router-dom";

import styles from "../homeMain.module.css";

const ArtistBar = ({ main = "", side = "" }) => {
  const { heading, side_heading } = styles;

  // const renderGroups = (mainNames, sideNames, imageNames) => {
  //   for (let i = 0; i < mainNames.length; i++) {}
  // };

  return (
    <>
      <div className="flex justify-between px-3 mt-5 mb-3">
        <Link to={"#"} className={`${heading}`}>
          {main}
        </Link>
        <Link to={"#"} className={`${side_heading}`}>
          {side}
        </Link>
      </div>
    </>
  );
};

export default ArtistBar;
