import React from "react";

import SideBar from "../components/home/sideBar/SideBar";
import PurpleBar from "../components/home/PurpleBar";

const Home = () => {
  return (
    <div className="bg-[#000000] text-white py-[10px] flex flex-col">
      <div className="">
        <SideBar />
      </div>
      <PurpleBar />
    </div>
  );
};

export default Home;
