import SearchContext from "./SearchContext";

const SearchContextProvider = ({ children }) => {
  const value = {};
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
