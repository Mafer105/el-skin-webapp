import './App.css';
import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
