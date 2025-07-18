import { createContext } from 'react';

export const SearchContext = createContext<{search: string, setSearch: (x: string) => void}>({
  search: '',
  setSearch: () => null
});