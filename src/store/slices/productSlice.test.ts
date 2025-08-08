import productsReducer, {
  fetchProducts,
  carregarProdutos,
  ProductsState,
} from './productsSlice';
import { productService } from '../../service/productService';
import { IProduct } from '../../components/Product';

jest.mock('../../service/productService');

const mockedProductService = productService as jest.Mocked<typeof productService>;

const mockProducts: IProduct[] = [
  { id: '1', name: 'Caneca Coder', description: 'Uma caneca para devs.', price: 49.9, image: 'url1', tags: [{ label: 'Protection', type: 'protection' }] },
  { id: '2', name: 'Camiseta Bug', description: 'Não é um bug, é uma feature.', price: 79.9, image: 'url2',tags: [{ label: 'Protection', type: 'protection' }] },
  { id: '3', name: 'Adesivo React', description: 'Um adesivo legal de React.', price: 9.9, image: 'url3',tags: [{ label: 'Protection', type: 'protection' }] },
];

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};


describe('productsSlice extraReducers', () => {

  it('deve lidar com o estado de "pending" de fetchProducts', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('deve lidar com o estado de "fulfilled" de fetchProducts', () => {
    const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
    const loadingState = { ...initialState, loading: true };
    const state = productsReducer(loadingState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockProducts);
    expect(state.error).toBeNull();
  });

  it('deve lidar com o estado de "rejected" de fetchProducts', () => {
    const error = { message: 'Erro na API' };
    const action = { type: fetchProducts.rejected.type, error };
    const loadingState = { ...initialState, loading: true };
    const state = productsReducer(loadingState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toBe('Erro na API');
  });

});