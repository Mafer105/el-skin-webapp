import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { IProduct } from '../components/Product'; 
interface CartState {
  cart: IProduct[];
}

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT'; payload: { productId: string } }
  | { type: 'CLEAR_CART' };

interface ICartContext {
  cart: IProduct[];
  adicionarProduto: (produto: IProduct) => void;
  removerProduto: (produtoId: string) => void;
  clearCart: () => void;
}

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingProduct = state.cart.find(p => p.id === action.payload.id);
      if (existingProduct) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case 'REMOVE_PRODUCT': {
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.productId),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: CartState = {
    cart: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const adicionarProduto = (produto: IProduct) => {
    dispatch({ type: 'ADD_PRODUCT', payload: produto });
  };

  const removerProduto = (produtoId: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId: produtoId } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: ICartContext = {
    cart: state.cart,
    adicionarProduto,
    removerProduto,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCartContext deve ser usado dentro de um CartProvider');
  }

  return context;
};