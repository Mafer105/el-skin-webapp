import { renderHook } from '@testing-library/react';
import { useCart } from './useCart';
import { act } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../store/slices/searchSlice';
import cartReducer from '../store/slices/cartSice';
import { ReactNode } from 'react';

const createTestStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      cart: cartReducer,
    },
  });

const createWrapper = (store: ReturnType<typeof createTestStore>) => {
  const TestWrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  TestWrapper.displayName = 'TestWrapper';
  return TestWrapper;
};

it('deve inicializar corretamente o carrinho vazio', () => {
  // Arrange
  const store = createTestStore();
  const wrapper = createWrapper(store);

  // Act
  const { result } = renderHook(() => useCart(), { wrapper });

  // Assert
  expect(result.current.items).toEqual([]);
  expect(result.current.getTotalItems()).toBe(0);
  expect(result.current.totalPrice).toBe(0);
});

it('deve adicionar um item ao carrinho', () => {
  // Arrange
  const store = createTestStore();
  const wrapper = createWrapper(store);

  // Arrange
  const { result } = renderHook(() => useCart(), { wrapper });

  // Act
  const newItem = {
    id: '1',
    name: 'Produto Teste',
    price: 99.99,
    image: '/test.jpg',
  };

  act(() => {
    result.current.addItem(newItem);
  });

  // Assert
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0]).toEqual({
    ...newItem,
    quantity: 1,
  });
  expect(result.current.totalPrice).toBe(99.99);
});

it('deve adicionar um item ao carrinho', () => {
  // Arrange
  const store = createTestStore();
  const wrapper = createWrapper(store);

  // Act
  const { result } = renderHook(() => useCart(), { wrapper });

  // Act
  const newItem = {
    id: '1',
    name: 'Produto Teste',
    price: 99.99,
    image: '/test.jpg',
  };

  act(() => {
    result.current.addItem(newItem);
  });

  act(() => {
    result.current.addItem(newItem);
  });

  // Assert
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0]).toEqual({
    ...newItem,
    quantity: 2,
  });
  expect(result.current.totalPrice).toBe(199.98);
});
