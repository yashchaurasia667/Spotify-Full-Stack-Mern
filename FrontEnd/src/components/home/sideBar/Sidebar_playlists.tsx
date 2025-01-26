import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoGlobe } from "react-icons/go";
import Card from "./Card";

import styles from "./sideBar.module.css";

import MainContext from "../../../context/mainContext/MainContext";

const Sidebar_playlists = () => {
  const { cards, playlists, sidebar_footer, policies } = styles;
  const linkStyle = "text-[12px] text-text-subdued";

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user, sidebarWidth } = context;

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

  const getPlaylists = async (): Promise<string[]> => {
    const res = await fetch("/api/user/getplaylists", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setPlaylistId(data);
      return data;
    }
    return [];
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const [playlistId, setPlaylistId] = useState([]);

  const renderPlaylist = () => {
    return (
      <>
        {playlistId.length ? (
          playlistId
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
        <div
          className={`${sidebar_footer} ${sidebarWidth > 70 ? "" : "hidden"}`}
        >
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
  return renderPlaylist();
};

export default Sidebar_playlists;
