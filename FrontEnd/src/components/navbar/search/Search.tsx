import { Link } from "react-router-dom";
interface props {
  query: string;
}
const Search = ({ query }: props) => {
  return (
    <dialog
      open
      className="w-full absolute top-[calc(100%+6px)] z-[1000] bg-background-elevated-highlight rounded-lg overflow-hidden py-5 px-4"
    >
      <h1 className="font-bold text-xl my-5 mx-auto w-fit">
        Start searching to see results
      </h1>
      {/* {localStorage.getItem("access_token") ? (
        <h1 className="font-bold text-xl my-5 mx-auto w-fit">
          Start searching to see results
        </h1>
      ) : (
        <Link to={"http://localhost:4000/spotify/login"}>
          Link Spotify to start Searching
        </Link>
      )} */}
    </dialog>
  );
};

export default Search;
