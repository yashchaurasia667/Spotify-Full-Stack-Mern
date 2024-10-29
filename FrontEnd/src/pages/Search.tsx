import Recent from "../components/search/Recent";

const Search = () => {
  document.title = "Spotify - Search";
  return (
    <div className="bg-background-base rounded-[8px] px-4 py-5">
      <Recent />
    </div>
  );
};

export default Search;
