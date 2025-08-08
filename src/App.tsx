import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routes';
import { store } from './store';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
