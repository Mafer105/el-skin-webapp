import { useCallback, useMemo } from 'react';
import { fetchProductById, fetchProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const loadProductById = useCallback(
    (id: string) => {
      dispatch(fetchProductById(id));
    },
    [dispatch],
  );

  const getProductById = useCallback(
    (id: string) => {
      return items.find((product: { id: string }) => product.id === id);
    },
    [items],
  );

  const filteredProducts = useCallback(
    (searchTerm: string) => {
      if (!searchTerm) return items;

      return items.filter(
        (product: { name: string; description: string }) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    },
    [items],
  );

  const totalProducts = useMemo(() => items.length, [items]);

  return {
    products: items,
    loading,
    error,
    loadProducts,
    loadProductById,
    getProductById,
    filteredProducts,
    totalProducts,
  };
};
