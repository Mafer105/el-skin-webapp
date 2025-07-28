import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index';
import { SearchContext } from '../../context/SearchContext';
import { CartContext } from '../../context/CartContext'; 

jest.mock('../Input', () => {
  return function MockInput({ onSearchClick, ...rest }: any) {
    return <input data-testid="mock-input" {...rest} />;
  };
});
jest.mock('../Menu', () => () => <div data-testid="mock-menu">Menu</div>);
jest.mock('../CartModal', () => ({ isOpen }: { isOpen: boolean }) => 
  isOpen ? <div data-testid="mock-cart-modal">Seu Carrinho</div> : null
);

describe('Componente Header', () => {
  const mockSetSearch = jest.fn();

  const renderComponent = (search: string) => {
    return render(
      <CartContext.Provider value={{ cart: [], adicionarProduto: jest.fn(), removerProduto: jest.fn(), clearCart: jest.fn() }}>
        <SearchContext.Provider value={{ search: search, setSearch: mockSetSearch }}>
          <Header />
        </SearchContext.Provider>
      </CartContext.Provider>
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
    
    const cartButton = screen.getByRole('button'); 
    fireEvent.click(cartButton);

    expect(screen.getByTestId('mock-cart-modal')).toBeInTheDocument();
    expect(screen.getByText('Seu Carrinho')).toBeInTheDocument();
  });
});