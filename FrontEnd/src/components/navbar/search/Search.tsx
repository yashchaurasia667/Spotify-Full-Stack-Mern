import { forwardRef, useEffect, useMemo, useState } from "react";

import SearchResult from "./SearchResult";

import { spotifyObject, image } from "../../../types";

type props = {
  open: boolean;
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

const Search = forwardRef<HTMLDialogElement, props>(
  ({ query, token, open }, ref) => {
    const [results, setResults] = useState<resultProps[]>([]);
    const [type, setType] = useState("track");
    const [limit, setLimit] = useState(10);

    const searchSpotify = async (
      query: string,
      type: string,
      limit: number
    ) => {
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
        console.log(data);
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
          id={track.id}
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
        open={open}
        className="max-h-[50vh] w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-press rounded-lg overflow-auto"
      >
        {/* <div>
        <label>
          Type:
          <select value={type} className="bg-background-elevated-press">
            <option value="all" onChange={()=> setType("")}>All</option>
            <option value="track" onChange={()=> setType()}>Track</option>
            <option value="album" onChange={()=> setType()}>Album</option>
            <option value="playlist" onChange={()=> setType()}>Playlist</option>
            <option value="show" onChange={()=> setType()}>Show</option>
            <option value="episode" onChange={()=> setType()}>Episode</option>
            <option value="audiobook" onChange={()=> setType()}>Audio Book</option>
            <option value="artist" onChange={()=> setType()}>Artist</option>
          </select>
        </label>
      </div> */}
        {query ? (
          renderRes
        ) : (
          <h1 className="font-bold text-xl my-5 mx-auto w-fit py-5">
            Start searching to see results
          </h1>
        )}
      </dialog>
    );
  }
);

export default Search;
