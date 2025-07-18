import './App.css';
import AppRouter from './routes';
import { SearchContext } from './context/SearchContext';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState('');
  return (
    <Router> 
      <SearchContext.Provider value={{ search, setSearch }}>
        <AppRouter />
      </SearchContext.Provider>
    </Router>
  );
}

export default App;
