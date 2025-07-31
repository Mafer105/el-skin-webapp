import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from 'react';
import { IProduct } from '../components/Product';
interface CartState {
  items: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT'; payload: { productId: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: string; quantity: number };
    }
  | { type: 'CLEAR_CART' };

interface ICartContext {
  items: CartItem[];
  adicionarProduto: (produto: IProduct) => void;
  removerProduto: (produtoId: string) => void;
  updateQuantidade: (produtoId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingProduct = state.items.find(
        (p) => p.id === action.payload.id,
      );
      if (existingProduct) {
        return {
          ...state,
          items: state.items.map((p) =>
            p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_PRODUCT': {
      return {
        ...state,
        items: state.items.filter(
          (product) => product.id !== action.payload.productId,
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: CartState = {
    items: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const adicionarProduto = (produto: IProduct) => {
    dispatch({ type: 'ADD_PRODUCT', payload: produto });
  };

  const updateQuantidade = (produtoId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId: produtoId, quantity },
      });
    } else {
      removerProduto(produtoId);
    }
  };

  const removerProduto = (produtoId: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId: produtoId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const value: ICartContext = {
    items: state.items,
    adicionarProduto,
    removerProduto,
    updateQuantidade,
    clearCart,
    totalItems,
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
