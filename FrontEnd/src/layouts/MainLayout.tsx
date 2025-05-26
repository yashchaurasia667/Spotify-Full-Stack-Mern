import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Resizable } from "react-resizable";

import Navbar from "../components/navbar/Navbar";
import Library from "../components/home/Library/Library";
import BottomPlayBar from "../components/home/bottomPlayBar/BottomPlayBar";

import "react-resizable/css/styles.css";
import styles from "../styleSheets/Home.module.css";

import MainContext from "../context/mainContext/MainContext";
import QueueSection from "../components/queueBar/QueueSection";

const MainLayout = () => {
  const favicon = document.querySelector("#favicon") as HTMLLinkElement;
  if (favicon) favicon.href = "spotifyGreen.svg";

  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(MainContext);
  if (!context) throw new Error("No Main context");
  const {
    queueOpen,
    libraryWidth,
    setLibraryWidth,
    user,
    setUser,
    minLibraryWidth,
    maxLibraryWidth,
    collapse,
  } = context;

  const style = {
    backgroundColor: "#000",
    padding: "10px",
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: `${libraryWidth}px 1fr ${queueOpen ? "300" : "0"}px`,
    gridTemplateRows: "50px repeat(2, auto)",
    columnGap: "10px",
    rowGap: "10px",
  };

  const onResizeLibrary = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number } }
  ) => {
    if (size.width > minLibraryWidth) return setLibraryWidth(size.width);
  };

  const onResizeStop = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number } }
  ) => {
    if (size.width == minLibraryWidth) return collapse();
  };

  const onResizeStart = (event: React.SyntheticEvent) => {
    if (libraryWidth == 70) {
      setLibraryWidth(minLibraryWidth + 1);
      onResizeLibrary(event, { size: { width: libraryWidth } });
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
      if (!res.ok) {
        console.error("Failed to refresh token");
        return;
      }
      const data = await res.json();
      const { access_token } = data;
      if (access_token) setToken(user._id, access_token, refresh_token);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const user_id = document.cookie;

      if (!user.email && !user.profile && user_id) {
        const res = await fetch("/api/user/getcurrentuser", {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        if (data.email) {
          setUser({
            ...data,
            profile:
              data.profile == "profile_default.png"
                ? `/api/uploads/global/${data.profile}`
                : `/api/uploads/${data._id}/${data.profile}`,
          });
        }
      }
    };
    getCurrentUser();
  }, [user]);

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.replace("#", ""));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token != null && refresh_token != null && user._id) {
      setToken(user._id, access_token, refresh_token);
      return;
    }

    if (user.refresh_token) {
      document.cookie = `access_token=${user.access_token}; path=/`;
      fetch("/api/spotify/checktokenvalidity", {
        credentials: "include",
      }).then((res) => {
        if (res.status == 401)
          if (user.refresh_token) refreshToken(user.refresh_token);
      });
    }
  }, [user]);

  return (
    <div className={styles.parent} style={style}>
      <Navbar />
      <>
        <Resizable
          width={libraryWidth}
          height={0}
          minConstraints={[minLibraryWidth, 0]}
          maxConstraints={[maxLibraryWidth, 0]}
          onResize={onResizeLibrary}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          draggableOpts={{ axis: "x" }}
        >
          <div>
            <Library sidebarWidth={libraryWidth} />
          </div>
        </Resizable>
        <Outlet />

        <QueueSection />
      </>
      <BottomPlayBar />
    </div>
  );
};

export default MainLayout;
