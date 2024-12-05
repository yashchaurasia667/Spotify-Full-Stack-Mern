import { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "../homeMain.module.css";

interface BarProps {
  main: ReactNode;
  side: ReactNode;
  className?: string;
}

const ArtistBar = ({ main, side, className = "" }: BarProps) => {
  const { heading, side_heading } = styles;

  // const renderGroups = (mainNames, sideNames, imageNames) => {
  //   for (let i = 0; i < mainNames.length; i++) {}
  // };

  return (
    <>
      <div className={`flex justify-between ${className}`}>
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
