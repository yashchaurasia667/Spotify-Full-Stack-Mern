import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FaX } from "react-icons/fa6";

import EditablePhoto from "../global/EditablePhoto";

import { RGB } from "types";

interface props {
  id: string;
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
  id,
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
  const [editCover, setEditcover] = useState<FileList | null>(null);
  const [editName, setEditname] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [ownerDetails, setOwnerDetails] = useState({
    _id: "",
    name: "",
    profile: "",
  });

  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditname(name);
    setEditDescription(description);
  }, [name, description]);

  useEffect(() => {
    if (owner)
      fetch(`/api/user/getuser?user_id=${owner}`, {
        credentials: "include",
      }).then((res) =>
        res.json().then((user) => {
          if (user) setOwnerDetails({ ...user });
        })
      );
  }, [owner]);

  const handleSubmit = async (e: React.FormEvent) => {
    const reqData = new FormData();
    editName !== name ? reqData.set("name", editName) : "";
    editDescription !== description
      ? reqData.set("description", editDescription)
      : "";
    editCover ? reqData.set("cover", editCover[0]) : "";
    e.preventDefault();

    const res = await fetch(`/api/playlist/edit?playlist_id=${id}`, {
      credentials: "include",
      method: "post",
      body: reqData,
    });

    if (res.ok) {
      // const data = await res.json();
      window.location.reload();
    }
  };

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

        <div className="flex flex-col gap-y-3">
          <p className="font-medium">{type}</p>
          <h2
            className="text-8xl font-extrabold -tracking-[0.2rem] cursor-pointer"
            onClick={() => setEditPlaylist(true)}
          >
            {name}
          </h2>
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
                src={`/api/uploads/${ownerDetails._id}/${ownerDetails.profile}`}
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

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[180px_1fr] gap-x-4 w-full"
          >
            <EditablePhoto
              profile={editCover ? URL.createObjectURL(editCover[0]) : cover}
              width={180}
              height={180}
              className="rounded-md"
              onClick={() => coverRef.current?.click()}
            />
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.length ? setEditcover(e.target.files) : ""
              }
            />
            <div className="grid grid-rows-[1fr_3fr] gap-y-4 w-full">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditname(e.target.value)}
                placeholder="Add a name"
                className="bg-[#3e3e3e] rounded-md px-4 py-2 outline-none border border-[#3e3e3e] focus:border-[#acacac] box-border"
              />
              {/* <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add an optional description"
                className="bg-[#3e3e3e] rounded-md px-4 py-2 outline-none border-[#acacac] h-full focus:border box-border"
              /> */}
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add an optional description"
                className="bg-[#3e3e3e] rounded-md px-4 py-2 outline-none border-[#acacac] h-full focus:border box-border overflow-auto resize-none"
              />
              <button
                type="submit"
                className="w-full font-medium bg-white rounded-full text-black text-lg py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PlaylistHeader;
