import cartReducer, { addItem, CartState, clearCart, ICartItem, removeItem, updateQuantity } from './cartSlice';
 
const estadoAnterior: CartState = {
  items: [],
};
 
const mockItem: Omit<ICartItem, 'quantity'> = {
  id: '1',
  name: 'Produto Teste',
  price: 99.99,
  image: '/test.jpg',
};
 
const mockItemCarrinho: ICartItem = {
  ...mockItem,
  quantity: 1,
};
 
describe('cartSlice', () => {
 
  it('deve retornar o estado inicial', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });
 
  it('deve adicionar um novo item ao carrinho', () => {
    const novoEstado = cartReducer(estadoAnterior, addItem({ id: '1', name: 'Item 1', price: 100, image: '' }));
    expect(novoEstado.items.length).toBe(1);
    expect(novoEstado.items[0].id).toBe('1');
    expect(novoEstado.items[0].quantity).toBe(1);
  });
 
  it('deve incrementar à quantidade se o item já existe no carrinho', () => {
    let novoEstado = cartReducer(estadoAnterior, addItem({ id: '1', name: 'Item 1', price: 100, image: '' }));
    novoEstado = cartReducer(novoEstado, addItem({ id: '1', name: 'Item 1', price: 100, image: '' }));
    expect(novoEstado.items.length).toBe(1);
    expect(novoEstado.items[0].id).toBe('1');
    expect(novoEstado.items[0].quantity).toBe(2);
  });
 
  it('deve incrementar à quantidade se o item já existe no carrinho', () => {
    let novoEstado = cartReducer(estadoAnterior, addItem({ id: '1', name: 'Item 1', price: 100, image: '' }));
    novoEstado = cartReducer(novoEstado, addItem({ id: '2', name: 'Item 2', price: 100, image: '' }));
    expect(novoEstado.items.length).toBe(2);
    expect(novoEstado.items[0].id).toBe('1');
    expect(novoEstado.items[0].quantity).toBe(1);
    expect(novoEstado.items[1].quantity).toBe(1);
  });
 
  it('deve remover item do carrinho', () => {
    const previousState = {
      items: [mockItemCarrinho],
    };
 
    const actual = cartReducer(previousState, removeItem({ id: '1' }));
    expect(actual.items).toHaveLength(0);
  });
 
  it('não deve fazer nada se item não existir', () => {
    const previousState = {
      items: [mockItemCarrinho],
    };
 
    const actual = cartReducer(previousState, removeItem({ id: '2' }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(mockItemCarrinho);
  });
 
  it('deve atualizar quantidade do item', () => {
    const previousState = {
      items: [mockItemCarrinho],
    };
 
    const actual = cartReducer(previousState, updateQuantity({ id: '1', quantity: 3 }));
    expect(actual.items[0].quantity).toBe(3);
  });
 
  it('deve remover item quando quantidade for 0', () => {
    const previousState = {
      items: [mockItemCarrinho],
    };
 
    const actual = cartReducer(previousState, updateQuantity({ id: '1', quantity: 0 }));
    expect(actual.items).toHaveLength(0);
  });
 
  it('não deve fazer nada se item não existir', () => {
    const previousState = {
      items: [mockItemCarrinho],
    };
 
    const actual = cartReducer(previousState, updateQuantity({ id: '2', quantity: 5 }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(mockItemCarrinho);
  });
 
  describe('clearCart', () => {
    it('deve limpar todos os itens do carrinho', () => {
      const previousState = {
        items: [
          mockItemCarrinho,
          { ...mockItemCarrinho, id: '2', name: 'Produto 2' },
        ],
      };
 
      const actual = cartReducer(previousState, clearCart());
      expect(actual.items).toHaveLength(0);
    });
 
    it('deve manter estado vazio se carrinho já estiver vazio', () => {
      const actual = cartReducer(estadoAnterior, clearCart());
      expect(actual.items).toHaveLength(0);
    });
 
    it('deve lidar com múltiplas operações sequenciais', () => {
      // Adicionar primeiro item
      let state = cartReducer(estadoAnterior, addItem(mockItem));
      expect(state.items).toHaveLength(1);
 
      // Adicionar segundo item
      const secondItem = { ...mockItem, id: '2', name: 'Produto 2' };
      state = cartReducer(state, addItem(secondItem));
      expect(state.items).toHaveLength(2);
 
      // Atualizar quantidade do primeiro item
      state = cartReducer(state, updateQuantity({ id: '1', quantity: 3 }));
      expect(state.items[0].quantity).toBe(3);
 
      // Remover segundo itema
      state = cartReducer(state, removeItem({ id: '2' }));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('1');
 
      // Limpar carrinho
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });
});