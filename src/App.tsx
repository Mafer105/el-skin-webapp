import './App.css';
import Carousel from './components/Carousel';
import Products from './components/Products';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Carousel/>
      <Products/>
      <Outlet /> 
    </>
    
  );
}

export default App;
