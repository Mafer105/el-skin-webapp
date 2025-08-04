import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock(
  './pages/Home',
  () =>
    function MockHome() {
      return <div>Página Inicial</div>;
    },
);
jest.mock(
  './pages/Sobre',
  () =>
    function MockSobre() {
      return <div>Página Sobre</div>;
    },
);
jest.mock('./pages/NotFound', () => () => <div>Página não encontrada</div>);
jest.mock('./components/Menu', () => {
  return function MockMenu() {
    const { Link } = require('react-router-dom');
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
      </nav>
    );
  };
});

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
};

describe('Testes de Roteamento do App', () => {
  test('deve renderizar a página inicial na rota raiz ("/")', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
  });

  test('deve navegar para a página Sobre ao clicar no link', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Página Inicial')).toBeInTheDocument();

    const sobreLink = screen.getByRole('link', { name: 'Sobre' });
    fireEvent.click(sobreLink);

    expect(screen.getByText('Página Sobre')).toBeInTheDocument();
    expect(screen.queryByText('Página Inicial')).not.toBeInTheDocument();
  });

  test('deve renderizar uma página de "Não Encontrado" para uma rota inválida', () => {
    const rotaInvalida = '/uma-pagina-que-nao-existe';
    renderWithRouter([rotaInvalida]);
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });
});
