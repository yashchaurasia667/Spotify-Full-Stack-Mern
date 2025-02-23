import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BarProps {
  main: ReactNode;
  side: ReactNode;
  className?: string;
}

const ArtistBar = ({ main, side, className }: BarProps) => {

  return (
    <>
      <div className={`flex justify-between ${className}`}>
        <Link to={"#"} className="text-2xl font-bold hover:underline">
          {main}
        </Link>
        <Link to={"#"} className="text-text-subdued hover:underline">
          {side}
        </Link>
      </div>
    </>
  );
};

export default ArtistBar;
