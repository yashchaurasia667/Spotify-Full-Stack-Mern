import { HiOutlinePencil } from "react-icons/hi2";

import styles from "./profile.module.css";

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
      <div className={styles.hero}>
        <img
          src={`http://localhost:4000/uploads/${profile}`}
          height={220}
          width={220}
        />
        <button>
          <HiOutlinePencil size={60} className="" />
          <p className="font-medium">Choose photo</p>
        </button>
      </div>
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
    </div>
  );
};

export default ProfileHeader;