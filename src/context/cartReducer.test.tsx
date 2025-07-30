import { cartReducer, CartItem } from './CartContext';
import { IProduct } from '../components/Product';

const produto1: IProduct = {
  id: '1',
  name: 'Sérum',
  price: 90,
  description: '...',
  image: '...',
  tags: [],
};
const produto2: IProduct = {
  id: '2',
  name: 'Hidratante',
  price: 120,
  description: '...',
  image: '...',
  tags: [],
};

const cartItem1: CartItem = { ...produto1, quantity: 1 };
const cartItem2: CartItem = { ...produto2, quantity: 1 };

describe('cartReducer', () => {
  test('deve adicionar um produto a um carrinho vazio, com quantidade 1', () => {
    const initialState = { items: [] };
    const action = { type: 'ADD_PRODUCT' as const, payload: produto1 };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual({ ...produto1, quantity: 1 });
  });

  test('deve incrementar a quantidade de um produto que já existe', () => {
    const initialState = { items: [cartItem1] };
    const action = { type: 'ADD_PRODUCT' as const, payload: produto1 };
    const newState = cartReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(2);
  });

  test('deve remover um produto do carrinho', () => {
    const initialState = { items: [cartItem1, cartItem2] };
    const action = {
      type: 'REMOVE_PRODUCT' as const,
      payload: { productId: '1' },
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(cartItem2);
  });

  test('deve limpar o carrinho', () => {
    const initialState = { items: [cartItem1, cartItem2] };
    const action = { type: 'CLEAR_CART' as const };
    const newState = cartReducer(initialState, action as any);

    expect(newState.items).toHaveLength(0);
  });
});
