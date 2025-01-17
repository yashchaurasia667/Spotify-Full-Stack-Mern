import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContext from "../context/mainContext/MainContext";

// interface props {
//   cover: string;
//   type: string;
//   name: string;
//   artist: string[];
//   album: string;
//   year: number;
//   duration: number;
// }

// const TrackPage = ({
//   cover,
//   type,
//   name,
//   artist,
//   album,
//   year,
//   duration,
// }: props) => {
const TrackPage = () => {
  const { id } = useParams();

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  useEffect(() => {
    console.log(user.access_token);
    document.cookie = `access_token=${user.access_token}; path=/`;
    fetch(`/api/spotify/track/?${id}`, {
      credentials: "include",
    });
  }, []);
  return <div className="bg-background-base rounded-lg"></div>;
};

export default TrackPage;
