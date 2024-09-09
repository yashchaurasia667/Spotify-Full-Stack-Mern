import React from "react";
import { Link } from "react-router-dom";

import DividerWithText from "../../../global/DividerWithText";

import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  const headingClass = "font-semibold text-md";
  const columnStyle = "flex flex-col gap-y-3";
  const linkStyle =
    "text-text-subdued hover:underline hover:text-text-base text-sm";

  return (
    <footer>
      <div className="grid grid-cols-5 px-4 mt-8">
        <div className={columnStyle}>
          <p className={headingClass}>Company</p>
          <Link
            className={linkStyle}
            to={"https://www.spotify.com/in-en/about-us/contact/"}
          >
            About
          </Link>
          <Link className={linkStyle} to={"https://www.lifeatspotify.com/"}>
            Jobs
          </Link>
          <Link className={linkStyle} to={"https://newsroom.spotify.com/"}>
            For the Record
          </Link>
        </div>
        <div className={columnStyle}>
          <p className={headingClass}>Communities</p>
          <Link className={linkStyle} to={"https://artists.spotify.com/home"}>
            For Artists
          </Link>
          <Link className={linkStyle} to={"https://developer.spotify.com/"}>
            Developers
          </Link>
          <Link className={linkStyle} to={"https://ads.spotify.com/en-IN/"}>
            Advertising
          </Link>
          <Link
            className={linkStyle}
            to={"https://investors.spotify.com/home/default.aspx"}
          >
            Investors
          </Link>
          <Link className={linkStyle} to={"https://spotifyforvendors.com/"}>
            Vendors
          </Link>
        </div>
        <div className={columnStyle}>
          <p className={headingClass}>Useful links</p>
          <Link className={linkStyle} to={"https://support.spotify.com/in-en/"}>
            Support
          </Link>
          <Link
            className={linkStyle}
            to={"https://www.spotify.com/in-en/download/windows/"}
          >
            Free Mobile App
          </Link>
        </div>
        <div className={columnStyle}>
          <p className={headingClass}>Spotify Plans</p>
          <Link
            className={linkStyle}
            to={
              "https://www.spotify.com/in-en/premium/?ref=spotifycom_footer_premium_individual"
            }
          >
            Premium Individual
          </Link>
          <Link
            className={linkStyle}
            to={
              "https://www.spotify.com/in-en/duo/?ref=spotifycom_footer_premium_duo"
            }
          >
            Premium Duo
          </Link>
          <Link
            className={linkStyle}
            to={
              "https://www.spotify.com/in-en/family/?ref=spotifycom_footer_premium_family"
            }
          >
            Premium Family
          </Link>
          <Link
            className={linkStyle}
            to={
              "https://www.spotify.com/in-en/student/?ref=spotifycom_footer_premium_student"
            }
          >
            Premium Student
          </Link>
          <Link
            className={linkStyle}
            to={
              "https://www.spotify.com/in-en/free/?ref=spotifycom_footer_free"
            }
          >
            Spotify Free
          </Link>
        </div>
        <div>
          <button className="bg-decorative-subdued p-3 rounded-[50%] mx-1 hover:bg-[#727272] cursor-default">
            <FaInstagram className="scale-[120%]" />
          </button>
          <button className="bg-decorative-subdued p-3 rounded-[50%] mx-1 hover:bg-[#727272] cursor-default">
            <FaTwitter className="scale-[120%]" />
          </button>
          <button className="bg-decorative-subdued p-3 rounded-[50%] mx-1 hover:bg-[#727272] cursor-default">
            <FaFacebook className="scale-[120%]" />
          </button>
        </div>
      </div>
      <DividerWithText />
      <div></div>
    </footer>
  );
};

export default Footer;
