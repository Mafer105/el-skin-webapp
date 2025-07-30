import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from './Products';
import { productService } from '../../service/productService';
import { SearchContext } from '../../context/SearchContext';
import { CartContext } from '../../context/CartContext';

jest.mock('../../service/productService');
const mockedProductService = productService as jest.Mocked<
  typeof productService
>;

const mockProducts = [
  {
    id: '1',
    name: 'Produto Teste 1',
    description: 'Descrição A',
    price: 10,
    image: '',
    tags: [],
  },
  {
    id: '2',
    name: 'Produto Teste 2',
    description: 'Descrição B',
    price: 20,
    image: '',
    tags: [],
  },
];

describe('Componente Products', () => {
  const mockAdicionarProduto = jest.fn();
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    mockedProductService.getProducts.mockResolvedValue(mockProducts);
    mockAdicionarProduto.mockClear();
    (window.alert as jest.Mock).mockClear();
  });

  const renderComponent = (search: string) => {
    return render(
      <CartContext.Provider
        value={{
          items: [],
          totalItems: 0,
          adicionarProduto: mockAdicionarProduto,
          removerProduto: jest.fn(),
          updateQuantidade: jest.fn(),
          clearCart: jest.fn(),
        }}
      >
        <SearchContext.Provider
          value={{ search: search, setSearch: jest.fn() }}
        >
          <Products />
        </SearchContext.Provider>
      </CartContext.Provider>,
    );
  };

  test('deve buscar e renderizar a lista de produtos', async () => {
    renderComponent('');

    expect(
      screen.getByText('nossos queridinhos estão aqui'),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Produto Teste 1')).toBeInTheDocument();
      expect(screen.getByText('Produto Teste 2')).toBeInTheDocument();
    });
  });

  test('deve filtrar produtos com base na busca', async () => {
    renderComponent('Teste 1');

    await waitFor(() => {
      expect(screen.getByText('Produto Teste 1')).toBeInTheDocument();
      expect(screen.queryByText('Produto Teste 2')).not.toBeInTheDocument();
    });
  });

  test('deve chamar adicionarProduto e mostrar um alerta ao clicar em comprar', async () => {
    renderComponent('');

    const comprarButtons = await screen.findAllByRole('button', {
      name: /comprar/i,
    });

    fireEvent.click(comprarButtons[0]);

    expect(mockAdicionarProduto).toHaveBeenCalledTimes(1);
    expect(mockAdicionarProduto).toHaveBeenCalledWith(mockProducts[0]);

    expect(window.alert).toHaveBeenCalledWith(
      'Produto Teste 1 foi adicionado ao carrinho!',
    );
  });
});
