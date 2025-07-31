import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from './index';

describe('Componente Menu', () => {
  test('deve renderizar todos os itens da lista de menu', () => {
    render(<Menu />);

    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Tipo de pele')).toBeInTheDocument();
    expect(screen.getByText('Necessidade')).toBeInTheDocument();
    expect(screen.getByText('Ingredientes')).toBeInTheDocument();
  });

  test('deve renderizar o texto da promoção', () => {
    render(<Menu />);

    const promoText = screen.getByText(/Kits até 50% off/i);
    expect(promoText).toBeInTheDocument();

    expect(promoText.tagName).toBe('STRONG');
  });
});
