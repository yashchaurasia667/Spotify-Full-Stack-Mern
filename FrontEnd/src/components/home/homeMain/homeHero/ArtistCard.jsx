import React from "react";

const ArtistCard = ({ name = "", type = "album", img = "" }) => {
  return (
    <div className="bg-transparent hover:bg-[#1f1f1f]">
      {img == "" ? <img src={img} alt={name} /> : ""}
      <div className="text-md text-white font-normal">{name}</div>
      <div className="text-sm text-[#b3b3b3] font-normal">{type}</div>
    </div>
  );
};

export default ArtistCard;
