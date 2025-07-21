import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SearchContextType {
  search: string;
  setSearch: (term: string) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');

  const contextValue = useMemo(() => ({
    search,
    setSearch
  }), [search]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};


export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};