import React,{ createContext, useState, ReactNode, } from "react";

interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode; 
}

export const SearchProvider: React.FC<SearchProviderProps>  = ({children}) => {
  const [search, setSearch] = useState<string>("")

  return(
    <SearchContext.Provider value={{search, setSearch}}>
      {children}
    </SearchContext.Provider>
  )
}

