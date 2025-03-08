import { useContext, useEffect, useMemo, useState } from "react";

import Library_PlaylistTile from "./Library_PlaylistTile";
import Library_footer from "./Library_footer";

import MainContext from "../../../context/mainContext/MainContext";

import { track } from "../../../types";
import Library_default_cards from "./Library_default_cards";

interface playlistProps {
  _id: string;
  cover: string;
  name: string;
  owner: string;
  songs: [
    {
      song: track;
      dateAdded: Date;
    }
  ];
}

const Library_playlists = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, setUser, libraryWidth, getPlaylistDetails } = context;

  const [playlistDetails, setPlaylistDetails] = useState<playlistProps[]>([]);

  const getUserPlaylists = async () => {
    const res = await fetch("/api/user/playlists", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      const tmp: playlistProps[] = [];
      // const user_playlists_tmp: { _id: string; name: string }[] = [];

      // Gets all the playlists of the user
      for (const id of data) {
        const details = await getPlaylistDetails(id);
        if (details) {
          tmp.push({ ...details });
        }
      }
      setPlaylistDetails(tmp);
      setUser({
        ...user,
        playlists: [
          ...tmp.map((playlist: playlistProps) => {
            // console.log({ _id: playlist._id, name: playlist.name });
            return { _id: playlist._id, name: playlist.name };
          }),
        ],
      });
      // console.log(user);
    }
  };

  useEffect(() => {
    if (user._id) getUserPlaylists();
    // console.log("user playlists");
    // console.log(userplaylists);
  }, [user._id, window.location.href]);

  const renderPlaylists = useMemo(() => {
    return playlistDetails.map((details, index) => (
      <Library_PlaylistTile
        owner={details.owner}
        sidebarWidth={libraryWidth}
        cover={details.cover}
        length={details.songs.length}
        type="Playlist"
        name={details.name}
        key={index}
        id={details._id}
      />
    ));
  }, [playlistDetails]);

  return (
    <>
      {playlistDetails.length ? (
        renderPlaylists
      ) : (
        <Library_default_cards email={user.email} />
      )}
      <Library_footer sidebarWidth={libraryWidth} />
    </>
  );
};

export default Library_playlists;
