import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartModal from './index';
import { CartContext, CartItem } from '../../context/CartContext';

const mockRemoverProduto = jest.fn();
const mockUpdateQuantidade = jest.fn();
const mockOnClose = jest.fn();

const mockItems = [
  { id: '1', name: 'Produto A', price: 50, image: 'img-a.jpg', quantity: 2 },
  { id: '2', name: 'Produto B', price: 100, image: 'img-b.jpg', quantity: 1 },
];

describe('Componente CartModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('não deve renderizar quando isOpen for false', () => {
    render(
      <CartContext.Provider
        value={{
          items: [],
          adicionarProduto: jest.fn(),
          removerProduto: jest.fn(),
          updateQuantidade: jest.fn(),
          clearCart: jest.fn(),
          totalItems: 0,
        }}
      >
        <CartModal isOpen={false} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('deve renderizar a mensagem de carrinho vazio', () => {
    const mockContextValue = {
      items: [],
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });

  test('deve renderizar os itens do carrinho e o total', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(screen.getByText('R$ 200,00')).toBeInTheDocument();
  });

  test('deve chamar onClose ao clicar no botão de fechar', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const closeButton = screen.getByRole('button', { name: 'Fechar carrinho' });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('deve chamar onClose ao pressionar a tecla Escape', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('deve chamar updateQuantidade ao aumentar a quantidade', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const increaseButtons = screen.getAllByRole('button', {
      name: /Aumentar quantidade/i,
    });
    fireEvent.click(increaseButtons[0]);
    expect(mockUpdateQuantidade).toHaveBeenCalledWith('1', 3);
  });

  test('deve chamar updateQuantidade ao diminuir a quantidade (quando > 1)', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const decreaseButtons = screen.getAllByRole('button', {
      name: /Diminuir quantidade/i,
    });
    fireEvent.click(decreaseButtons[0]);
    expect(mockUpdateQuantidade).toHaveBeenCalledWith('1', 1);
  });

  test('deve chamar removerProduto ao diminuir a quantidade (quando = 1)', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const decreaseButtons = screen.getAllByRole('button', {
      name: /Diminuir quantidade/i,
    });
    fireEvent.click(decreaseButtons[1]);
    expect(mockRemoverProduto).toHaveBeenCalledWith('2');
    expect(mockUpdateQuantidade).not.toHaveBeenCalled();
  });

  test('deve chamar removerProduto ao clicar no ícone da lixeira', () => {
    const mockContextValue = {
      items: mockItems,
      removerProduto: mockRemoverProduto,
      updateQuantidade: mockUpdateQuantidade,
      adicionarProduto: jest.fn(),
      clearCart: jest.fn(),
      totalItems: 3,
    };

    render(
      <CartContext.Provider value={mockContextValue}>
        <CartModal isOpen={true} onClose={mockOnClose} />
      </CartContext.Provider>,
    );
    const trashButtons = screen.getAllByRole('button', {
      name: /Remover .* do carrinho/i,
    });
    fireEvent.click(trashButtons[0]);
    expect(mockRemoverProduto).toHaveBeenCalledWith('1');
  });
});
