import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <CartProvider>
        <SearchProvider>
          <AppRouter />
        </SearchProvider>
      </CartProvider>
    </>
  );
}

export default App;
