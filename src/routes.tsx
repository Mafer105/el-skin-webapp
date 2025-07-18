import NotFound from './pages/NotFound';
import Sobre from './pages/Sobre';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function AppRouter() {
  return (
    <main>
      <Header />
      <Routes>
        < Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}