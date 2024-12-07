import { useContext } from "react";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent";

import MainContext from "../context/mainContext/MainContext";

const Profile = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  return (
    <div className="rounded-[8px] overflow-y-auto h-full">
      <ProfileHeader
        name="Yash"
        public_playlists={2}
        followers={2}
        following={4}
        profile={user.profile}
      />
      <ProfileContent />
    </div>
  );
};

export default Profile;
