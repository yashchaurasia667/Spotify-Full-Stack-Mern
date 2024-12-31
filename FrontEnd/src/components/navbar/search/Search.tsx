interface props {
  open: boolean;
}
const Search = () => {
  return (
    <dialog
      open
      className="w-full absolute rounded-lg top-full z-[1000] bg-background-elevated-highlight"
    >
      search box
    </dialog>
  );
};

export default Search;
