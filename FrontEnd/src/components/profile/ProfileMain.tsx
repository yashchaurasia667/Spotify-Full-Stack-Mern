import { HiOutlinePencil } from "react-icons/hi2";

import styles from "./profile.module.css";

interface profileProps {
  name: string;
  public_playlists: number;
  followers: number;
  following: number;
  profile: string;
}

const ProfileMain = ({
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
          height={250}
          width={250}
        />
        <button>
          <HiOutlinePencil size={60} className="" />
          <p className="font-medium">Choose photo</p>
        </button>
      </div>
      <div className="info">
        <p className="font-medium">Profile</p>
        <h1 className="text-8xl font-bold mt-3">{name}</h1>
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

export default ProfileMain;
