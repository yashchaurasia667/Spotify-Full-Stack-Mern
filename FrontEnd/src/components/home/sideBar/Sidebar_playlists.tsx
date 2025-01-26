import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoGlobe } from "react-icons/go";
import Card from "./Card";

import styles from "./sideBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";
import { track } from "../../../types";
import Sidebar_PlaylistTile from "./Sidebar_PlaylistTile";

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

const Sidebar_playlists = () => {
  const { cards, playlists, sidebar_footer, policies } = styles;
  const linkStyle = "text-[12px] text-text-subdued";

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, sidebarWidth } = context;

  const [playlistDetails, setPlaylistDetails] = useState<playlistProps[]>([]);

  const navigate = useNavigate();

  const createPlaylist = async () => {
    const res = await fetch("/api/user/createplaylist", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      navigate(`/playlist/${data}`);
    }
  };

  const getPlaylistDetails = async (id: string) => {
    const res = await fetch(`/api/user/getplaylist?playlist_id=${id}`, {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      return data;
    }
  };

  const getPlaylists = async (): Promise<string[]> => {
    const res = await fetch("/api/user/getuserplaylists", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      data.map(async (id: string) => {
        const details = await getPlaylistDetails(id);
        if (details)
          setPlaylistDetails((prev) => {
            return [...prev, details];
          });
      });
      // setPlaylistId(data);
      // return data;
    }
    return [];
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const renderPlaylists = useMemo(() => {
    console.log(playlistDetails);
    return playlistDetails.map((details, index) => (
      <Sidebar_PlaylistTile
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
        <div className={`${cards}`}>
          {user.email ? (
            <Card
              heading={"Create your first playlist"}
              content={"It's easy, we'll help you"}
              buttonContent={"Create playlist"}
              onClick={createPlaylist}
            />
          ) : (
            ""
          )}
          <Card
            heading={"Let's find some podcasts to follow"}
            content={"We'll keep you updated on episodes"}
            buttonContent={"Browse podcasts"}
          />
          <Card
            heading="Import Playlists from Spotify"
            content="Playlists from your spotify"
            buttonContent="Import"
          />
        </div>
      )}
      <div className={`${sidebar_footer} ${sidebarWidth > 70 ? "" : "hidden"}`}>
        <div className={`${policies}`}>
          <Link to="#" className={linkStyle}>
            Legal
          </Link>
          <Link to="#" className={linkStyle}>
            Safety&Privacy Center
          </Link>
          <Link to="#" className={linkStyle}>
            Privacy Policy
          </Link>
          <Link to="#" className={linkStyle}>
            Cookies
          </Link>
          <Link to="#" className={linkStyle}>
            About Ads
          </Link>
          <Link to="#" className={linkStyle}>
            Accessibility
          </Link>
        </div>
        <button>
          <GoGlobe />
          English
        </button>
      </div>
    </>
  );
};

export default Sidebar_playlists;
