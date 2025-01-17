import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Resizable } from "react-resizable";

import Navbar from "../components/navbar/Navbar";
import Library from "../components/home/sideBar/Library";
import BottomPlayBar from "../components/home/bottomPlayBar/BottomPlayBar";

import "react-resizable/css/styles.css";
import styles from "../styleSheets/Home.module.css";

import MainContext from "../context/mainContext/MainContext";

const MainLayout = () => {
  // document.querySelector("#favicon")!.href = "spotifyGreen.svg";
  const favicon = document.querySelector("#favicon") as HTMLLinkElement;
  if (favicon) favicon.href = "spotifyGreen.svg";

  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(MainContext);
  if (!context) throw new Error("No Main context");
  const {
    sidebarWidth,
    setSidebarWidth,
    user,
    setUser,
    minSidebarWidth,
    maxSidebarWidth,
    collapse,
  } = context;

  const style = {
    backgroundColor: "#000",
    padding: "10px",
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: `${sidebarWidth}px 1fr`,
    gridTemplateRows: "50px repeat(2, auto)",
    columnGap: "10px",
    rowGap: "10px",
  };

  const onResizeSidebar = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number } }
  ) => {
    if (size.width > minSidebarWidth) return setSidebarWidth(size.width);
  };

  const onResizeStop = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number } }
  ) => {
    if (size.width == minSidebarWidth) return collapse();
  };

  const onResizeStart = (event: React.SyntheticEvent) => {
    if (sidebarWidth == 70) {
      setSidebarWidth(minSidebarWidth + 1);
      onResizeSidebar(event, { size: { width: sidebarWidth } });
    }
  };

  const setToken = async (
    id: string,
    access_token: string,
    refresh_token: string
  ) => {
    document.cookie = `access_token=${access_token}; path=/`;
    document.cookie = `refresh_token=${refresh_token}; path=/`;

    const res = await fetch("/api/user/linkspotify", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!res.ok) console.error("something went wrong");
    else navigate("/");
  };

  const refreshToken = async (refresh_token: string) => {
    try {
      const res = await fetch(
        `/api/spotify/refreshtoken?refresh_token=${refresh_token}`
      );
      const data = await res.json();
      const { access_token } = data;
      if (access_token) setToken(user._id, access_token, refresh_token);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    if (!user.email && !user.profile)
      fetch("/api/user/getuser", {
        method: "POST",
        credentials: "include",
      }).then((res) =>
        res.json().then((newUser) => {
          if (newUser.email) {
            // console.log(newUser._id);
            setUser({ ...newUser });
          }
        })
      );
  }, [user]);

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.replace("#", ""));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token != null && refresh_token != null && user._id) {
      setToken(user._id, access_token, refresh_token);
    }

    if (user.refresh_token) {
      fetch("/api/spotify/checktokenvalidity", {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) refreshToken(user.refresh_token);
      });
    }
  }, [user]);

  return (
    <div className={styles.parent} style={style}>
      <Navbar />
      <Resizable
        width={sidebarWidth}
        height={0}
        minConstraints={[minSidebarWidth, 0]}
        maxConstraints={[maxSidebarWidth, 0]}
        onResize={onResizeSidebar}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        draggableOpts={{ axis: "x" }}
      >
        <div>
          <Library
            sidebarWidth={sidebarWidth}
            // setSidebarWidth={setSidebarWidth}
          />
        </div>
      </Resizable>

      <Outlet />
      <BottomPlayBar />
    </div>
  );
};

export default MainLayout;
