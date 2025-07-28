import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from './CartContext';
import { IProduct } from '../components/Product';
import { ReactNode } from 'react';

const produto1: IProduct = { id: '1', name: 'Sérum', price: 90, description: '...', image: '...', tags: [] };
const produto2: IProduct = { id: '2', name: 'Hidratante', price: 120, description: '...', image: '...', tags: [] };

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useCartContext', () => {
  test('deve ter um carrinho vazio inicialmente', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  test('deve adicionar um produto ao carrinho', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.adicionarProduto(produto1);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe('Sérum');
  });

  test('deve remover um produto do carrinho', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.adicionarProduto(produto1);
      result.current.adicionarProduto(produto2);
    });

    expect(result.current.cart).toHaveLength(2); 
    act(() => {
      result.current.removerProduto('1');
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe('2'); 
  });
  
  test('deve limpar todos os produtos do carrinho', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.adicionarProduto(produto1);
      result.current.adicionarProduto(produto2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

  test('deve lançar um erro se usado fora do CartProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const renderHookWithoutProvider = () => renderHook(() => useCartContext());

    expect(renderHookWithoutProvider).toThrow(
      'useCartContext deve ser usado dentro de um CartProvider'
    );
    (console.error as jest.Mock).mockRestore();
  });
});