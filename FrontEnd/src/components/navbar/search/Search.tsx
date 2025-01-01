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
    </dialog>
  );
};

export default Search;
