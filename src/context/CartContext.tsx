import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
  items: CartItem[];
  adicionarProduto: (produto: Omit<CartItem, 'quantity'>) => void;
  removerProduto: (produtoId: string) => void;
  updateQuantidade: (produtoId: string, quantidade: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const ADD_PRODUTO = 'ADD_PRODUTO';
export const REMOVE_PRODUTO = 'REMOVE_PRODUTO';
export const UPDATE_QUANTIDADE = 'UPDATE_QUANTIDADE';

type AddAction = {
  type: typeof ADD_PRODUTO;
  payload: Omit<CartItem, 'quantity'>;
};

type RemoveAction = {
  type: typeof REMOVE_PRODUTO;
  payload: string;
};

type UpdateAction = {
  type: typeof UPDATE_QUANTIDADE;
  payload: { produtoId: string; quantidade: number };
};

type CartAction = AddAction | RemoveAction | UpdateAction;

export const carrinhoReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
  case ADD_PRODUTO: {
    const novoProduto = action.payload;
    const produtoIndex = state.findIndex((item) => item.id === novoProduto.id);
    if (produtoIndex === -1) {
      return [...state, { ...novoProduto, quantity: 1 }];
    } else {
      return state.map((item, index) =>
        index === produtoIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
  }
  case REMOVE_PRODUTO: {
    const produtoIdParaRemover = action.payload;
    return state.filter((item) => item.id !== produtoIdParaRemover);
  }
  case UPDATE_QUANTIDADE: {
    const { produtoId, quantidade } = action.payload;
    return state.map((item) =>
      item.id === produtoId ? { ...item, quantity: quantidade } : item
    );
  }
  default:
    return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, dispatch] = useReducer(carrinhoReducer, [
    {
      id: '1',
      name: 'Produto 1',
      price: 100,
      quantity: 1,
      image: '/assets/prod8.jpg'
    },
    {
      id: '2',
      name: 'Produto 2',
      price: 200,
      quantity: 2,
      image: '/assets/prod1.jpg'
    }
  ]);

  const adicionarProduto = (produto: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: ADD_PRODUTO, payload: produto });
  };

  const removerProduto = (produtoId: string) => {
    dispatch({ type: REMOVE_PRODUTO, payload: produtoId });
  };

  const updateQuantidade = (produtoId: string, quantidade: number) => {
    dispatch({ type: UPDATE_QUANTIDADE, payload: { produtoId, quantidade } });
  };


  const contextValue = useMemo(() => ({
    items,
    adicionarProduto,
    removerProduto,
    updateQuantidade
  }), [items]);

  return <CartContext.Provider value={contextValue}>
    {children}
  </CartContext.Provider>;
};


export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};