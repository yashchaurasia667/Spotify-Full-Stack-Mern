import { useContext } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";

import ArtistCard from "../components/global/ArtistCard";
import ArtistBar from "../components/global/ArtistBar";

import MainContext from "../context/mainContext/MainContext";

const Profile = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  return (
    <div className="rounded-[8px] overflow-auto">
      <ProfileHeader
        name="Yash"
        public_playlists={2}
        followers={2}
        following={4}
        profile={user.profile}
      />
      <div className="main_content bg-background-base h-full p-5 relative">
        <div className="absolute top-0 left-0 h-[35vh] w-[100vw] pointer-events-none bg-gradient-to-b from-[#a9b1c755] to-[#00000000]"></div>
        <div className="h-[60px]">
          <button className="text-text-subdued h-full">• • •</button>
        </div>
        <div>
          <ArtistBar
            main={
              <>
                <p className="text-2xl font-bold hover:underline">
                  Top artists this month
                </p>
                <p className="text-sm text-text-subdued font-medium hover:no-underline">
                  Only visible to you
                </p>
              </>
            }
            side={"Show all"}
          />
          <div className="grid grid-cols-10 mt-3">
            <ArtistCard
              name="Ciggerates After Sex"
              type="Artist"
              img="artists/CAS.jpg"
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
