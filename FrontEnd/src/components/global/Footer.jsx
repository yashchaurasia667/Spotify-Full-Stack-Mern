import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyling =
    "mx-auto mt-8 cursor-pointer text-center underline ";

  return (
    <div className="mt-8 bottom-0 bg-background-base w-[100%] text-text-subdued text-center py-8 text-[12px]">
      This site is protected by reCAPTCHA and the Google{" "}
      <Link className={linkStyling}>Privacy Policy</Link> and <Link className={linkStyling}>Terms of Service</Link> apply.
    </div>
  );
};

export default Footer;
