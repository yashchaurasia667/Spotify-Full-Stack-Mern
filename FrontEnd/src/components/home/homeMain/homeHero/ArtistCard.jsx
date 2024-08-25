import React from "react";

const ArtistCard = ({ name = "", type = "album", img = "" }) => {
  return (
    <div className="bg-transparent hover:bg-background-highlight">
      {img == "" ? <img src={img} alt={name} /> : ""}
      <div className="text-md text-white font-normal">{name}</div>
      <div className="text-sm text-text-subdued font-normal">{type}</div>
    </div>
  );
};

export default ArtistCard;
