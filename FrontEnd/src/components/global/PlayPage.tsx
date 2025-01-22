import { FaPlay } from "react-icons/fa";

import GreenButton from "./GreenButton";

const PlayPage = () => {
  return (
    <div className="w-full px-5 py-5">
      <GreenButton
        content={<FaPlay fill="#121212" size={20} />}
        className="p-5 hover:scale-105 hover:bg-[#3be477]"
      />
    </div>
  );
};

export default PlayPage;
