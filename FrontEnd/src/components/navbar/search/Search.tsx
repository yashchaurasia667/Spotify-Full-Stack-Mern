import { forwardRef, useEffect, useState } from "react";

import SearchResult from "./SearchResult";
type props = {
  query: string;
  // ref: React.ForwardedRef<HTMLDialogElement>;
  token?: string;
};

type externalUrl = {
  spotify: string;
};

type spotifyObject = {
  external_urls: externalUrl;
  href: string;
  id: string;
  name: string;
  uri: string;
  type: string;
};

type image = {
  height: number;
  width: number;
  url: string;
};

interface resultProps extends spotifyObject {
  album: {
    album_type: string;
    artists: [
      spotifyObject
      //   {
      //   external_urls: externalUrl;
      //   href: string;
      //   id: string;
      //   name: string;
      //   type: string;
      //   uri: string;
      // }
    ];
    images: [image];
    is_playable: boolean;
    release_date: string;
    total_tracks: number;
  };
  artists: [spotifyObject];
  duration_ms: number;
  explicit: boolean;
  // external_urls: externalUrl;
}

// interface resultProps {
//   album: {
//     album_type: string;
//     artists: [
//       {
//         external_urls: { spotify: string };
//         href: string;
//         id: string;
//         type: string;
//         uri: string;
//       }
//     ];
//     external_urls: {
//       spotify: string;
//     };
//   };
// }

const Search = forwardRef<HTMLDialogElement, props>(({ query, token }, ref) => {
  const [results, setResults] = useState([{}]);
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
    const data = await res.json();
    setResults(data.tracks.items);
    console.log(data.tracks.items[0]);
    // console.log(data.tracks.items[1].external_urls.spotify);
    // console.log(data.tracks.items);
  };

  useEffect(() => {
    if (query) {
      searchSpotify(query);
    }
  }, [query]);

  useEffect(() => {
    // console.log(results);
  }, [results]);

  return (
    <dialog
      ref={ref}
      open
      className="w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-highlight rounded-lg overflow-hidden py-5 px-4"
    >
      {query ? (
        // results
        "results"
      ) : (
        <h1 className="font-bold text-xl my-5 mx-auto w-fit">
          Start searching to see results
        </h1>
      )}
    </dialog>
  );
});

export default Search;
