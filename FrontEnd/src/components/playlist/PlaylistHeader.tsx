import { RGB } from "types";
import EditablePhoto from "../global/EditablePhoto";
import { FaX } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface props {
  bg: RGB;
  cover: string;
  name: string;
  description: string;
  type: string;
  owner: string;
  length: number;
  duration: number;
}

const PlaylistHeader = ({
  bg,
  cover,
  name,
  description,
  type,
  owner,
  length,
  duration,
}: props) => {
  const [editPlaylist, setEditPlaylist] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [ownerDetails, setOwnerDetails] = useState({
    _id: "",
    name: "",
    profile: "",
  });

  useEffect(() => {
    fetch("/api/user/getuser", {
      credentials: "include",
    }).then((res) =>
      res.json().then((user) => {
        if (user) setOwnerDetails({ ...user });
      })
    );
  }, [owner]);

  return (
    <div
      className="h-fit bg-gradient-to-t from-[#00000066] to-[#00000000]"
      style={{ backgroundColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})` }}
    >
      <div className="flex gap-x-5 items-center px-4 py-5 h-full">
        <EditablePhoto
          profile={cover}
          width={230}
          height={230}
          className="rounded-lg"
          onClick={() => setEditPlaylist(true)}
        />

        <dialog
          open={editPlaylist}
          className="w-full h-full top-0 left-0 bg-[#000000cc] z-[1000]"
        >
          <div className="absolute bg-background-elevated-highlight rounded-lg w-[500px] p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between mb-6">
              <p className="text-2xl font-bold">Edit details</p>
              <button onClick={() => setEditPlaylist(false)}>
                <FaX />
              </button>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-x-4 w-full">
              <EditablePhoto
                profile={cover}
                width={180}
                height={180}
                className="rounded-md"
              />
              <div className="grid grid-rows-[1fr_3fr] gap-y-4 w-full">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Add a name"
                  className="bg-[#3e3e3e] rounded-md px-4 py-2 outline-none border-[#acacac] focus:border"
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add an optional description"
                  className="bg-[#3e3e3e] rounded-md px-4 py-2 outline-none border-[#acacac] h-full focus:border"
                />
                <button className="w-full font-medium bg-white rounded-full text-black text-lg py-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        </dialog>

        <div className="flex flex-col gap-y-3">
          <p className="font-medium">{type}</p>
          <h2 className="text-8xl font-extrabold -tracking-[0.2rem]">{name}</h2>
          <p>{description}</p>
          <div className="flex gap-x-3 items-center">
            <div
              className="flex"
              style={{
                width: 25,
                height: 25,
              }}
            >
              <img
                src={`http://localhost:4000/uploads/${ownerDetails.profile}`}
                className="rounded-[50%] object-cover"
              />
            </div>

            <Link to={`/user/${owner}`} className="hover:underline">
              {ownerDetails.name}
            </Link>

            {duration ? (
              <p className="text-text-subdued -tracking-wider font-medium">
                {duration}
              </p>
            ) : (
              ""
            )}
            <p className="text-text-subdued -tracking-wider font-medium">
              {length + " Songs"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
