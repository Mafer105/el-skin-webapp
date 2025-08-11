import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
