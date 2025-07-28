import { cartReducer } from './CartContext'; 
import { IProduct } from '../components/Product';

const produto1: IProduct = { id: '1', name: 'Sérum', price: 90, description: '...', image: '...', tags: [] };
const produto2: IProduct = { id: '2', name: 'Hidratante', price: 120, description: '...', image: '...', tags: [] };

describe('cartReducer', () => {
  test('deve adicionar um produto a um carrinho vazio', () => {
    const initialState = { cart: [] };
    const action = { type: 'ADD_PRODUCT' as const, payload: produto1 };
    const newState = cartReducer(initialState, action);
    
    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0]).toEqual(produto1);
  });

  test('não deve adicionar um produto que já existe', () => {
    const initialState = { cart: [produto1] };
    const action = { type: 'ADD_PRODUCT' as const, payload: produto1 };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toHaveLength(1);
  });

  test('deve remover um produto do carrinho', () => {
    const initialState = { cart: [produto1, produto2] };
    const action = { type: 'REMOVE_PRODUCT' as const, payload: { productId: '1' } };
    const newState = cartReducer(initialState, action);

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0]).toEqual(produto2); 
  });

  test('deve limpar o carrinho', () => {
    const initialState = { cart: [produto1, produto2] };
    const action = { type: 'CLEAR_CART' as const };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toHaveLength(0);
  });
});