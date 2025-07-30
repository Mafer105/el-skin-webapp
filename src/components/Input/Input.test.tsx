import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './index';

describe('Componente Input', () => {
  const mockOnChange = jest.fn();
  const mockOnSearchClick = jest.fn();

  test('deve renderizar com valor e placeholder padrão', () => {
    render(
      <Input
        value="Teste"
        onChange={mockOnChange}
        aria-label="Campo de busca"
      />,
    );

    const inputElement = screen.getByLabelText(
      'Campo de busca',
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('Teste');
    expect(inputElement.placeholder).toBe('O que você está procurando?');
  });

  test('deve usar o placeholder customizado quando fornecido', () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        placeholder="Digite aqui..."
        aria-label="Busca customizada"
      />,
    );
    expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
  });

  test('deve chamar onChange quando o usuário digita', () => {
    render(
      <Input value="" onChange={mockOnChange} aria-label="Campo de busca" />,
    );

    const inputElement = screen.getByLabelText('Campo de busca');
    fireEvent.change(inputElement, { target: { value: 'Sérum' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('deve renderizar o botão de busca se onSearchClick for fornecido', () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        aria-label="Campo de busca"
        onSearchClick={mockOnSearchClick}
      />,
    );

    const searchButton = screen.getByRole('button', { name: 'Pesquisar' });
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  test('não deve renderizar o botão de busca se onSearchClick não for fornecido', () => {
    render(
      <Input value="" onChange={mockOnChange} aria-label="Campo de busca" />,
    );

    const searchButton = screen.queryByRole('button', { name: 'Pesquisar' });
    expect(searchButton).not.toBeInTheDocument();
  });
});
