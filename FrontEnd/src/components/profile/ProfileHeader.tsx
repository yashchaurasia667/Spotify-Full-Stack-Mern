import { useContext } from "react";

import { HiOutlinePencil } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";

import styles from "./profile.module.css";
import MainContext from "../../context/mainContext/MainContext";
import ProfilePhoto from "./ProfilePhoto";

interface profileProps {
  name: string;
  public_playlists: number;
  followers: number;
  following: number;
  profile: string;
}

const ProfileHeader = ({
  name,
  public_playlists,
  followers,
  following,
  profile,
}: profileProps) => {
  return (
    <div className={styles.hero_bg}>
      <ProfilePhoto profile={profile} width={220} height={220} />
      <div className="info">
        <p className="font-medium">Profile</p>
        <button className="text-8xl -tracking-[0.4rem] font-bold mt-3 block">
          {name}
        </button>
        <p className="mt-5 text-sm text-text-subdued inline-block">
          {public_playlists} Public Playlists •
        </p>{" "}
        <p className="text-sm inline-block">
          {followers} Followers • {following} Following
        </p>
      </div>

      <dialog open={true} className="bg-[#12121288] w-full h-[110vh] z-[1000]">
        <div className="absolute max-w-[525px] top-1/3 left-1/2 -translate-x-1/2 bg-background-elevated-highlight rounded-xl p-6">
          <div className="flex justify-between">
            <p className="text-[1.6rem] font-bold tracking-tight">
              Profile details
            </p>
            <button>
              <IoIosClose size={35} fill="#acacac" />
            </button>
          </div>
          <div className="flex gap-x-4">
            <ProfilePhoto profile={profile} width={180} height={180} />
            <div>
              <input type="text" name="" id="" />
              <button>save</button>
            </div>
          </div>
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileHeader;
