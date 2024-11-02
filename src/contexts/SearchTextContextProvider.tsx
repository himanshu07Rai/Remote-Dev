import { createContext, useState } from "react";
import { useDebounce } from "../utils/hooks";

type SearchTextContextType = {
  searchText: string | null;
  handleSearchTextChange: (searchText: string) => void;
  debouncedSearchText: string;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

const SearchTextContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, debouncedSearchText, handleSearchTextChange }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
