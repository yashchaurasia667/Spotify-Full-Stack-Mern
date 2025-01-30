import { HiOutlinePencil } from "react-icons/hi";

import styles from "./profile.module.css";

interface Props {
  profile: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}

const EditablePhoto = ({
  profile,
  width,
  height,
  className,
  onClick = () => {},
}: Props) => {
  return (
    <div
      onClick={() => onClick()}
      style={{
        width,
        height,
      }}
      className="cursor-pointer relative group"
    >
      <img
        src={profile}
        className={`object-cover w-full h-full shadow-[0px_0px_20px_#00000088] group-hover:brightness-[25%] ${className}`}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center invisible group-hover:visible">
        <HiOutlinePencil size={60} className="" />
        <p className="font-medium">Choose photo</p>
      </div>
    </div>
  );
};

export default EditablePhoto;
