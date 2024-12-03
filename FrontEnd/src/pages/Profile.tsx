import { useContext } from "react";
import ProfileMain from "../components/profile/ProfileMain";

import MainContext from "../context/mainContext/MainContext";

const Profile = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  return (
    <div className="rounded-[8px] overflow-hidden">
      <ProfileMain
        name="Yash"
        public_playlists={2}
        followers={2}
        following={4}
        profile={user.profile}
      />
    </div>
  );
};

export default Profile;
