import { forwardRef, useEffect, useMemo, useState } from "react";

import SearchResult from "./SearchResult";

import { spotifyObject, image } from "../../../types";

type props = {
  query: string;
  // ref: React.ForwardedRef<HTMLDialogElement>;
  token?: string;
};
interface album extends spotifyObject {
  album_type: string;
  artists: spotifyObject[];
  images: image[];
  is_playable: boolean;
  release_date: string;
  total_tracks: number;
}

interface resultProps extends spotifyObject {
  album: album;
  artists: spotifyObject[];
  duration_ms: number;
  explicit: boolean;
  is_playable: boolean;
  track_number: number;
}

const Search = forwardRef<HTMLDialogElement, props>(({ query, token }, ref) => {
  const [results, setResults] = useState<resultProps[]>([]);
  const [type, setType] = useState("Track");
  const [limit, setLimit] = useState(10);

  const searchSpotify = async (query: string, type: string, limit: number) => {
    document.cookie = `access_token=${token}; path=/;`;
    try {
      const res = await fetch(
        `/api/spotify/search/?query=${query}&type=${type}&limit=${limit}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          // body: JSON.stringify({
          //   query: query,
          //   type: "track",
          //   limit: 20,
          // }),
        }
      );
      const data = await res.json();
      setResults(data.tracks.items);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    if (query) {
      searchSpotify(query, type, limit);
    }
  }, [query]);

  const renderRes = useMemo(() => {
    return results.map((track, index) => (
      <SearchResult
        key={index}
        name={track.name}
        artists={track.artists}
        cover={track.album.images[2].url}
        duration={track.duration_ms}
      />
    ));
  }, [results]);

  return (
    <dialog
      ref={ref}
      open
      className="max-h-[50vh] w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-press rounded-lg overflow-auto"
    >
      <div>
        <label>
          Type:
          <input type="text" value={type} />
        </label>
      </div>
      {query ? (
        renderRes
      ) : (
        <h1 className="font-bold text-xl my-5 mx-auto w-fit">
          Start searching to see results
        </h1>
      )}
    </dialog>
  );
});

export default Search;
