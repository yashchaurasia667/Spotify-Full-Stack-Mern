import React from "react";
import { Link } from "react-router-dom";

import { heading, side_heading } from "../homeMain.module.css";

const ArtistBar = ({ main="", side="" }) => {
  return (
    <div className="flex justify-between px-3 mt-5 mb-3">
      <Link className={`${heading}`}>{main}</Link>
      <Link className={`${side_heading}`}>{side}</Link>
    </div>
  );
};

export default ArtistBar;
