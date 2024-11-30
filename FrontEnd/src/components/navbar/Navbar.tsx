import { Link, NavLink, useNavigate } from "react-router-dom";

import { GoHomeFill, GoHome } from "react-icons/go";
import { IoFastFood, IoSearch } from "react-icons/io5";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

import spotify from "/spotifyBw.svg";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";

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
  } = styles;

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (email) {
      console.log("getuser");
      fetch("/api/auth/getuser", {
        method: "post",
        credentials: "include",
      }).then((res) =>
        res.json().then((user) => {
          if (user) {
            console.log(user.profile);
            setProfile(user.profile);
          } else setLoggedIn(false);
        })
      );
    } else {
      console.log("checkauth");
      fetch("/api/auth/checkauth", {
        credentials: "include",
      }).then((res) =>
        res.json().then((info) => {
          if (info) {
            setEmail(info.email);
            setLoggedIn(true);
          } else setLoggedIn(false);
        })
      );
    }
  }, [email]);

  return (
    <div className={`${navbar} row-start-1 col-span-2`}>
      <Link to="/" className={`${nav_left}`}>
        <img src={spotify} alt="spotify" height="50px" />
      </Link>
      <div className={`${nav_mid}`}>
        <NavLink to={"/"}>
          {({ isActive }) =>
            isActive ? <GoHomeFill /> : <GoHome className="fill-text-subdued" />
          }
        </NavLink>
        <div className={searchbar} onClick={() => navigate("/search")}>
          <div className="flex items-center rounded-[999px] w-[100%]">
            <IoSearch />
            <input type="text" placeholder="What do you want to play?" />
          </div>
          <NavLink to={"/search"}>
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
        {loggedIn ? (
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
            <div className={profile_icon}>
              <img src={`http://localhost:4000/uploads/${profile}`} alt="" />
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
