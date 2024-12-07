import { HiOutlinePencil } from "react-icons/hi";

import styles from "./profile.module.css";

interface profileProps {
  profile: string;
  width: number;
  height: number;
}

const ProfilePhoto = ({ profile, width, height }: profileProps) => {
  return (
    <div className={styles.hero}>
      <img
        src={`http://localhost:4000/uploads/${profile}`}
        height={height}
        width={width}
      />
      <button>
        <HiOutlinePencil size={60} className="" />
        <p className="font-medium">Choose photo</p>
      </button>
    </div>
  );
};

export default ProfilePhoto;
