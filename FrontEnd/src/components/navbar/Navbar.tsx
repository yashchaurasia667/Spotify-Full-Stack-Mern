import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { GoHomeFill, GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

import Search from "./search/Search";

import MainContext from "../../context/mainContext/MainContext";

import spotify from "/spotifyBw.svg";
import styles from "./navbar.module.css";

const Navbar = () => {
  const {
    navbar,
    searchbar,
    nav_left,
    nav_mid,
    nav_right,
    signup,
    login,
    premium,
    install_app,
    content_feed,
    profile_icon,
    modal,
    modal_link,
  } = styles;

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const searchRef = useRef<HTMLDialogElement | null>(null);

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { user } = context;

  // const [profile, setProfile] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleBlur = (
    // e: MouseEvent,
    e: React.FocusEvent<HTMLElement>,
    ref: React.RefObject<HTMLElement>,
    stateFunction: (state: boolean) => void
  ) => {
    if (ref.current && !ref.current.contains(e.relatedTarget as Node)) {
      stateFunction(false);
    }
  };

  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await fetch("/api/auth/logout");
    window.location.reload();
  };

  // useEffect(() => {
  //   if (searchOpen) document.addEventListener("mousedown", clickOutside);
  //   return () => document.removeEventListener("mousedown", clickOutside);
  // }, [searchOpen]);

  useEffect(() => {
    if (searchRef.current) console.log(searchRef.current);
  }, [searchRef]);

  return (
    <div className={`${navbar} row-start-1 col-span-2`}>
      <Link to="/" className={`${nav_left} w-fit`}>
        <img src={spotify} alt="spotify" height="50px" />
      </Link>
      <div className={`${nav_mid}`}>
        <NavLink to={"/"}>
          {({ isActive }) =>
            isActive ? <GoHomeFill /> : <GoHome className="fill-text-subdued" />
          }
        </NavLink>
        <div
          className={searchbar}
          onClick={() => setSearchOpen(true)}
          // onBlur={() => setSearchOpen(false)}
          onBlur={(e) => handleBlur(e, searchRef, setSearchOpen)}
        >
          {user.access_token ? (
            <Search
              open={searchOpen}
              ref={searchRef}
              query={query}
              token={user.access_token}
            />
          ) : (
            <dialog
              open={searchOpen}
              className="w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-highlight rounded-lg overflow-hidden py-5 px-4 flex justify-center"
            >
              <Link
                to={"http://localhost:4000/spotify/login"}
                className="!bg-white text-background-base px-3 py-2 rounded-full font-medium my-4"
              >
                Link Your Spotify Account to search
              </Link>
            </dialog>
          )}
          <div className="flex items-center rounded-[999px] w-[100%]">
            <IoSearch />
            <input
              type="text"
              value={query}
              placeholder="What do you want to play?"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <NavLink to={"/browse"}>
            {({ isActive }) =>
              isActive ? (
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="Svg-sc-ytk21e-0 bneLcE"
                >
                  <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path>
                </svg>
              ) : (
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="Svg-sc-ytk21e-0 bneLcE"
                >
                  <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
                  <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"></path>
                </svg>
              )
            }
          </NavLink>
        </div>
      </div>
      <div className={`${nav_right}`}>
        {user.email ? (
          <>
            <Link to={"https://open.spotify.com/premium"} className={premium}>
              Explore Premium
            </Link>
            <Link
              to={"https://open.spotify.com/download"}
              className={install_app}
            >
              <FaRegArrowAltCircleDown className="inline mr-1.5 scale-110" />
              Install App
            </Link>
            <Link to="/content-feed" className={content_feed}>
              <LuBell />
            </Link>
            <div className="relative">
              <button
                onClick={() => {
                  // console.log(dialogOpen);
                  setDialogOpen(!dialogOpen);
                }}
                onBlur={(e) => {
                  handleBlur(e, dialogRef, setDialogOpen);
                }}
                className={profile_icon}
              >
                <img
                  src={`http://localhost:4000/uploads/${user.profile}`}
                  alt=""
                />
              </button>
              <dialog
                ref={dialogRef}
                open={dialogOpen}
                className={modal}
                onClick={() => setDialogOpen(false)}
              >
                <ul className="w-full">
                  <li>
                    <Link to={"/profile"} className={modal_link}>
                      Profile
                    </Link>
                  </li>
                  {
                    // localStorage.getItem("access_token")
                    user.access_token ? (
                      ""
                    ) : (
                      <li>
                        <Link
                          to={"http://localhost:4000/spotify/login"}
                          className={modal_link}
                        >
                          Link spotify
                        </Link>
                      </li>
                    )
                  }
                  <li>
                    <button onClick={logout} className={modal_link}>
                      Logout
                    </button>
                  </li>
                </ul>
              </dialog>
            </div>
          </>
        ) : (
          <>
            <Link to={"/signup"} className={signup}>
              Sign up
            </Link>
            <Link to={"/login"} className={login}>
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
