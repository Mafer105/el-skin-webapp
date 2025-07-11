import NotFound from './pages/NotFound';
import Sobre from './pages/Sobre';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PaginaPadrao from './components/PaginaPadrao';

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<PaginaPadrao />} >
            < Route index element={<App />} />
            <Route path='sobre' element={<Sobre />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}