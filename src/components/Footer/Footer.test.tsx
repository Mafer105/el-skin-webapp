import { render, screen } from '../../test-utils'; 
import '@testing-library/jest-dom';
import Footer from './index';

jest.mock('./Icons', () => {
  return function MockIcons() {
    return <div data-testid="mock-icons" />;
  };
});

describe('Componente Footer', () => {
  test('deve renderizar todos os títulos e links das colunas', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: /Sobre a AL SKIN/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Loja AL SKIN/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Atendimento/i })).toBeInTheDocument();

    expect(screen.getByText('- quem somos')).toBeInTheDocument();
    expect(screen.getByText('- lojas físicas')).toBeInTheDocument();
    expect(screen.getByText('- oi@aiskin.com.br')).toBeInTheDocument();
    
    expect(screen.getByTestId('mock-icons')).toBeInTheDocument();
  });

  test('deve renderizar o título como um link quando "path" for fornecido', () => {
    render(<Footer />);

    const linkElement = screen.getByRole('link', { name: /Sobre a AL SKIN/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/sobre');
  });

  test('deve renderizar o título como um cabeçalho simples quando "path" for nulo', () => {
    render(<Footer />);

    const headingElement = screen.getByRole('heading', { name: /Loja AL SKIN/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H2');

    const linkElement = screen.queryByRole('link', { name: /Loja AL SKIN/i });
    expect(linkElement).not.toBeInTheDocument();
  });
});