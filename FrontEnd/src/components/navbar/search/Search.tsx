import { useState } from "react";
import { Link } from "react-router-dom";
interface props {
  query: string;
}
const Search = ({ query }: props) => {
  const [result, setResult] = useState(null);
  const searchSpotify = async (query: string) => {
    const res = await fetch("/api/spotify/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  };
  return (
    <dialog
      open
      className="w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-highlight rounded-lg overflow-hidden py-5 px-4"
    >
      {query ? (
        result
      ) : (
        <h1 className="font-bold text-xl my-5 mx-auto w-fit">
          Start searching to see results
        </h1>
      )}
    </dialog>
  );
};

export default Search;
