import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from './index';

const MockHomePage = () => <div>Página Inicial</div>;

describe('Página NotFound', () => {
  const renderComponent = (initialRoute = '/rota-qualquer') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<MockHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  test('deve renderizar o conteúdo de página não encontrada', () => {
    renderComponent();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Oops! Página não encontrada.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Ir para a Home/i }),
    ).toBeInTheDocument();
  });

  test('deve navegar para a página inicial ao clicar no botão "Ir para a Home"', () => {
    renderComponent();

    const homeButton = screen.getByRole('button', { name: /Ir para a Home/i });
    fireEvent.click(homeButton);
    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
  });

  test('deve navegar para a página anterior ao clicar no botão "Voltar"', () => {
    render(
      <MemoryRouter initialEntries={['/', '/rota-qualquer']}>
        <Routes>
          <Route path="/" element={<MockHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /Voltar/i });
    fireEvent.click(backButton);

    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    expect(screen.queryByText('404')).not.toBeInTheDocument();
  });
});
