import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';

jest.mock('../../components/Carousel', () => {
  return function MockCarousel() {
    return <div data-testid="carousel-mock">Componente Carousel</div>;
  };
});

jest.mock('../../components/Products/Products', () => {
  return function MockProducts() {
    return <div data-testid="products-mock">Componente Products</div>;
  };
});

describe('Página Home', () => {
  test('deve renderizar os componentes Carousel e Products', () => {
    render(<Home />);

    expect(screen.getByText('Componente Carousel')).toBeInTheDocument();
    expect(screen.getByText('Componente Products')).toBeInTheDocument();

    expect(screen.getByTestId('carousel-mock')).toBeInTheDocument();
    expect(screen.getByTestId('products-mock')).toBeInTheDocument();
  });
});
