import { Link } from "react-router-dom";
import { GoGlobe } from "react-icons/go";

import styles from "./sideBar.module.css";

interface props {
  sidebarWidth: number;
}

const Sidebar_footer = ({ sidebarWidth }: props) => {
  const { sidebar_footer, policies } = styles;
  const linkStyle = "text-[12px] text-text-subdued";

  return (
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
  );
};

export default Sidebar_footer;
