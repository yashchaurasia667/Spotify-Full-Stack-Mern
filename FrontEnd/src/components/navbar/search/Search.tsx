import { useEffect, useState } from "react";
interface props {
  query: string;
  token?: string;
}
const Search = ({ query, token }: props) => {
  const [result, setResult] = useState(null);
  const searchSpotify = async (query: string) => {
    document.cookie = `access_token=${token}; path=/;`;
    const res = await fetch("/api/spotify/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        type: "track",
        limit: 20,
      }),
    });
  };

  useEffect(() => {
    if (query) {
      console.log(query);
      searchSpotify(query);
    }
  }, [query]);

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
