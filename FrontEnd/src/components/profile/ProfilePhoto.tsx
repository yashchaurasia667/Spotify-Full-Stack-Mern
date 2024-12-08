import { HiOutlinePencil } from "react-icons/hi";

import styles from "./profile.module.css";

interface profileProps {
  profile: string;
  width: number;
  height: number;
  onClick?: () => void;
}

const ProfilePhoto = ({
  profile,
  width,
  height,
  onClick = () => {},
}: profileProps) => {
  return (
    <div onClick={() => onClick()} className={styles.hero}>
      <img
        src={`http://localhost:4000/uploads/${profile}`}
        height={height}
        width={width}
      />
      <div>
        <HiOutlinePencil size={60} className="" />
        <p className="font-medium">Choose photo</p>
      </div>
    </div>
  );
};

export default ProfilePhoto;
