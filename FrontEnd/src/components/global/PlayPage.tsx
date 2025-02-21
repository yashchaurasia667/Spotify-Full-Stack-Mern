import { FaPlay } from "react-icons/fa";

import GreenButton from "./GreenButton";
import { ReactElement } from "react";

interface props {
  elements?: ReactElement;
}

const PlayPage = ({ elements }: props) => {
  return (
    <div className="w-full px-5 py-5 relative">
      <GreenButton
        content={<FaPlay fill="#121212" size={20} />}
        className="p-5 hover:scale-105 hover:bg-[#3be477]"
      />
      <>{elements}</>
    </div>
  );
};

export default PlayPage;
