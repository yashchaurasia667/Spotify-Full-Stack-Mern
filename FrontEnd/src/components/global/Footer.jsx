import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyling =
    "mx-auto mt-8 cursor-pointer text-center underline ";

  return (
    <div className="lg:absolute bottom-0 bg-[#121212] w-[100%] text-[#a7a7a7] text-center py-8 text-[12px]">
      This site is protected by reCAPTCHA and the Google{" "}
      <Link className={linkStyling}>Privacy Policy</Link> and <Link className={linkStyling}>Terms of Service</Link> apply.
    </div>
  );
};

export default Footer;
