import React from "react";

import {Link} from 'react-router-dom'
import spotify from "/spotifyBw.svg";

const Home = () => {
  return (
    <div className="bg-[#121212] text-white h-screen">
      {/* Menu */}
      <div>
        <Link to="/" className="flex items-center">
          <img src={spotify} className="scale-50" />
          Spotify
        </Link>
      </div>
    </div>
  );
};

export default Home;
