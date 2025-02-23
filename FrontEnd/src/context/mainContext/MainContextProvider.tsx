import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainContext from "./MainContext";

import { user, RGB } from "../../types/index";

type contextProps = {
  children: ReactNode;
};

const MainContextProvider = ({ children }: contextProps) => {
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [token, setToken] = useState("");
  const [libIcon, setLibIcon] = useState(
    <>
      <svg
        role="img"
        height="24"
        width="24"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-encore-id="icon"
        className="Svg-sc-ytk21e-0 haNxPq"
      >
        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
      </svg>
      Your Library
    </>
  );
  const [user, setUser] = useState<user>({
    email: "",
    _id: "",
    iat: 0,
    profile: "",
    name: "",
    playlists: [],
    likedSongs: [],
    access_token: "",
    refresh_token: "",
  });
  const minSidebarWidth = 280;
  const maxSidebarWidth = 450;

  const collapse = () => {
    if (sidebarWidth > 70) {
      setLibIcon(
        <>
          <svg
            data-encore-id="icon"
            role="img"
            height="24px"
            width="24px"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="Svg-sc-ytk21e-0 bneLcE"
          >
            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
          </svg>
        </>
      );
      return setSidebarWidth(70);
    }
    setLibIcon(
      <>
        <svg
          data-encore-id="icon"
          role="img"
          height="24"
          width="24"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="Svg-sc-ytk21e-0 haNxPq"
        >
          <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
        </svg>
        Your Library
      </>
    );
    return setSidebarWidth(350);
  };

  const averageImageColor = async (imagePath: string): Promise<RGB> => {
    const img = document.createElement("img");
    img.src = imagePath;
    img.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Image failed to load"));
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext && canvas.getContext("2d");
    let imgData,
      width,
      height,
      length,
      rgb = { r: 0, b: 0, g: 0 },
      count = 0;

    if (!context) {
      throw new Error("No Canvas context");
    }

    width = canvas.width = img.width;
    height = canvas.height = img.height;

    context.drawImage(img, 0, 0);

    try {
      imgData = context.getImageData(0, 0, width, height);
    } catch (e) {
      throw new Error("Something went wrong while fetching the image data");
    }

    length = imgData.data.length;

    for (let i = 0; i < length; i += 4) {
      if (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2] > 600)
        continue;
      rgb.r += imgData.data[i];
      rgb.g += imgData.data[i + 1];
      rgb.b += imgData.data[i + 2];
      count++;
    }

    // rgb.r = Math.floor(rgb.r / count) - 50;
    // rgb.g = Math.floor(rgb.g / count) - 50;
    // rgb.b = Math.floor(rgb.b / count) - 50;
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
  };

  const clickOutside = (e: MouseEvent, ref: React.RefObject<HTMLElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) return false;
    return true;
  };

  const createPlaylist = async () => {
    const res = await fetch("/api/playlist/create", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      navigate(`/playlist/${data}`);
    }
  };

  const getPlaylistDetails = async (id: string) => {
    const res = await fetch(`/api/playlist/getplaylist?playlist_id=${id}`, {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return;
  };

  const value = {
    token,
    setToken,
    sidebarWidth,
    setSidebarWidth,
    user,
    setUser,
    minSidebarWidth,
    maxSidebarWidth,
    libIcon,
    setLibIcon,
    collapse,
    averageImageColor,
    clickOutside,
    createPlaylist,
    getPlaylistDetails,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
