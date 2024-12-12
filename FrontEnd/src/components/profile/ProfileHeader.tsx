import { useContext, useEffect, useRef, useState } from "react";

import { IoIosClose } from "react-icons/io";

import styles from "./profile.module.css";
import ProfilePhoto from "./ProfilePhoto";

import MainContext from "../../context/mainContext/MainContext";

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
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [inputProf, setInputProf] = useState<FileList | null>(null);

  const editRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  const clickOutside = (e: MouseEvent) => {
    if (editRef.current && !editRef.current.contains(e.target as Node))
      setEditOpen(false);
  };

  const editProfile = async (e: React.FormEvent) => {
    const data = new FormData();
    data.set("name", editName);
    if (inputProf) data.set("profile", inputProf[0]);

    e.preventDefault();
    const res = await fetch("http://localhost:4000/editprofile", {
      method: "POST",
      body: data,
      credentials: "include",
    });
  };

  useEffect(() => {
    setEditName(user.name);
    if (editOpen) document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [user, editOpen]);

  return (
    <div className={styles.hero_bg}>
      <ProfilePhoto
        onClick={() => setEditOpen(true)}
        profile={`http://localhost:4000/uploads/${profile}`}
        width={220}
        height={220}
      />
      <div className="info">
        <p className="font-medium">Profile</p>
        <button
          onClick={() => setEditOpen(true)}
          className="text-8xl -tracking-[0.4rem] font-bold mt-3 block"
        >
          {name}
        </button>
        <p className="mt-5 text-sm text-text-subdued inline-block">
          {public_playlists} Public Playlists •
        </p>{" "}
        <p className="text-sm inline-block">
          {followers} Followers • {following} Following
        </p>
      </div>

      <dialog
        open={editOpen}
        className="bg-[#12121288] w-full h-[110vh] z-[1000]"
      >
        <div
          ref={editRef}
          className="absolute max-w-[525px] top-[50vh] left-1/2 -translate-x-1/2 bg-background-elevated-highlight rounded-xl p-6"
        >
          <div className="flex justify-between mb-4">
            <p className="text-[1.6rem] font-bold tracking-tight">
              Profile details
            </p>
            <button onClick={() => setEditOpen(false)}>
              <IoIosClose size={35} fill="#acacac" />
            </button>
          </div>
          <form>
            <div className="grid grid-cols-[1fr_1.5fr] gap-x-4">
              <ProfilePhoto
                profile={
                  inputProf
                    ? URL.createObjectURL(inputProf[0])
                    : `http://localhost:4000/uploads/${profile}`
                }
                width={180}
                height={180}
                onClick={() => inputRef.current?.click()}
              />
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.length ? setInputProf(e.target.files) : ""
                }
              />
              <div className="flex flex-col gap-y-3 items-end justify-center relative">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  type="text"
                  className="bg-[#3e3e3e] w-full rounded-md p-2 outline-none focus:border focus:border-[#acacac]"
                />
                <button
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                  className="px-8 py-3 bg-white text-background-base font-bold text-md rounded-full hover:scale-105"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <p className="text-xs font-bold mt-4">
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
