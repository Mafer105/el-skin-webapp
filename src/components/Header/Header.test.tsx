import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index';
import { CartContext } from '../../context/CartContext';
import { useSearch } from '../../hooks/useSearch';

jest.mock('../Input', () => {
  return function MockInput({ onSearchClick, ...rest }: any) {
    return <input data-testid="mock-input" {...rest} />;
  };
});
jest.mock('../Menu', () => () => <div data-testid="mock-menu">Menu</div>);
jest.mock(
  '../CartModal',
  () =>
    ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? <div data-testid="mock-cart-modal">Seu Carrinho</div> : null,
);

jest.mock('../../hooks/useSearch');

describe('Componente Header', () => {
  const mockSetSearch = jest.fn();

  const renderComponent = (search: string, totalItems = 0) => {
    (useSearch as jest.Mock).mockReturnValue({
      term: search,
      setTerm: mockSetSearch,
    });
    return render(
      <CartContext.Provider
        value={{
          items: [],
          totalItems: totalItems,
          adicionarProduto: jest.fn(),
          removerProduto: jest.fn(),
          updateQuantidade: jest.fn(),
          clearCart: jest.fn(),
        }}
      >
        <Header />
      </CartContext.Provider>,
    );
  };

  beforeEach(() => {
    mockSetSearch.mockClear();
  });

  test('deve renderizar o título e o campo de busca', () => {
    renderComponent('');

    expect(screen.getByText('AL SKIN')).toBeInTheDocument();
    expect(screen.getByTestId('mock-input')).toBeInTheDocument();
  });

  test('deve chamar setSearch quando o valor do input mudar', () => {
    renderComponent('');
    const input = screen.getByTestId('mock-input');

    fireEvent.change(input, { target: { value: 'Sérum' } });

    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith('Sérum');
  });

  test('deve abrir o modal do carrinho ao clicar no botão de carrinho', () => {
    renderComponent('');

    expect(screen.queryByTestId('mock-cart-modal')).not.toBeInTheDocument();

    const cartButton = screen.getByRole('button', { name: /carrinho/i });
    fireEvent.click(cartButton);

    expect(screen.getByTestId('mock-cart-modal')).toBeInTheDocument();
    expect(screen.getByText('Seu Carrinho')).toBeInTheDocument();
  });

  test('deve exibir o badge com a quantidade de itens', () => {
    renderComponent('', 5);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
