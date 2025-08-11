import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from './Products';
import { useGetProductsQuery } from '../../store/api/apiSlice';
import { IProduct } from '../Product';
import { useSearch } from '../../hooks/useSearch';
import { useCart } from '../../hooks/useCart';

jest.mock('../../store/api/apiSlice');
jest.mock('../../hooks/useSearch');
jest.mock('../../hooks/useCart');

jest.mock('../Product', () => {
  return jest.fn(({ product, onBuyClick, onProductClick }) => (
    <div
      data-testid={`product-${product.id}`}
      onClick={() => onProductClick(product.id)}
    >
      <span>{product.name}</span>
      <button onClick={(e) => onBuyClick(product.id, e)}>Comprar</button>
    </div>
  ));
});

const mockedUseGetProductsQuery = useGetProductsQuery as jest.Mock;
const mockedUseSearch = useSearch as jest.Mock;
const mockedUseCart = useCart as jest.Mock;

const mockProducts: IProduct[] = [
  {
    id: '1',
    name: 'Caneca Coder',
    description: 'Uma caneca para devs.',
    price: 49.9,
    image: 'url1',
    tags: [{ label: 'Protection', type: 'protection' }],
  },
  {
    id: '2',
    name: 'Camiseta Bug',
    description: 'Não é um bug, é uma feature.',
    price: 79.9,
    image: 'url2',
    tags: [{ label: 'Protection', type: 'protection' }],
  },
  {
    id: '3',
    name: 'Adesivo React',
    description: 'Um adesivo legal de React.',
    price: 9.9,
    image: 'url3',
    tags: [{ label: 'Protection', type: 'protection' }],
  },
];

describe('Componente Products', () => {
  const mockAddItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseGetProductsQuery.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });
    mockedUseSearch.mockReturnValue({
      term: '',
    });
    mockedUseCart.mockReturnValue({
      addItem: mockAddItem,
    });
  });

  it('deve exibir a mensagem de "Carregando..." enquanto os produtos são buscados', () => {
    mockedUseGetProductsQuery.mockReturnValue({
        data: [],
        isLoading: true,
        error: null,
    });
    render(<Products />);
    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('deve renderizar o título e os produtos corretamente após o carregamento', () => {
    render(<Products />);

    expect(screen.getByText('nossos queridinhos estão aqui')).toBeInTheDocument();
    expect(screen.getByText('Caneca Coder')).toBeInTheDocument();
    expect(screen.getByText('Camiseta Bug')).toBeInTheDocument();
    expect(screen.getByText('Adesivo React')).toBeInTheDocument();
  });

  it('deve filtrar os produtos com base no termo de busca', () => {
    mockedUseSearch.mockReturnValue({
      term: 'caneca',
    });

    render(<Products />);

    expect(screen.getByText('Caneca Coder')).toBeInTheDocument();
    expect(screen.queryByText('Camiseta Bug')).not.toBeInTheDocument();
    expect(screen.queryByText('Adesivo React')).not.toBeInTheDocument();
  });

  it('deve exibir todos os produtos quando o termo de busca é removido', () => {
    mockedUseSearch.mockReturnValue({ term: 'caneca' });
    const { rerender } = render(<Products />);

    expect(screen.getByText('Caneca Coder')).toBeInTheDocument();
    expect(screen.queryByText('Camiseta Bug')).not.toBeInTheDocument();

    mockedUseSearch.mockReturnValue({ term: '' });
    rerender(<Products />);

    expect(screen.getByText('Caneca Coder')).toBeInTheDocument();
    expect(screen.getByText('Camiseta Bug')).toBeInTheDocument();
    expect(screen.getByText('Adesivo React')).toBeInTheDocument();
  });

  it('deve chamar a função addItem quando o botão de comprar é clicado', () => {
    window.alert = jest.fn(); 
    render(<Products />);

    const buyButton = screen.getByTestId('product-1').querySelector('button');
    expect(buyButton).toBeInTheDocument();

    fireEvent.click(buyButton!);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0]); 
    
    expect(window.alert).toHaveBeenCalledWith('Caneca Coder foi adicionado ao carrinho!');
  });
});
