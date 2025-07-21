import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
  items: CartItem[];
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
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

  const contextValue = useMemo(() => ({
    items
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