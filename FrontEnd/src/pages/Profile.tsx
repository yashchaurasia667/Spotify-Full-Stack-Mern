import { useContext } from "react";
import MainContext from "../context/mainContext/MainContext";

const Profile = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  return (
    <div>
      <div className="main bg-[#a9b1c7]">
        <img src={`http://localhost:4000/uploads/${user.profile}`} alt="" />
        <p>Profile</p>
        <h1>Name</h1>
        <p>3 Public Playlists • 2 Followers • 4 Following</p>
      </div>
    </div>
  );
};

export default Profile;
