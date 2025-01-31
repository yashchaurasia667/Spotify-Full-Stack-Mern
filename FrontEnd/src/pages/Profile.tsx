import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent";

import MainContext from "../context/mainContext/MainContext";

const Profile = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;
  const [redirect, setRedirect] = useState(false);
  const [playlists, setPlaylists] = useState<string[]>(user.playlists);

  // useEffect(() => {
  //   fetch("/api/user/getcurrentuser", {
  //     credentials: "include",
  //   }).then((res) =>
  //     res.json().then((data) => {
  //       if (!data) setRedirect(true);
  //       else setPlaylists(user.playlists);
  //     })
  //   );
  // }, []);

  return redirect ? (
    <Navigate to={"/login"} replace />
  ) : (
    <div className="rounded-[8px] overflow-y-auto h-full">
      <ProfileHeader
        name={user.name}
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
