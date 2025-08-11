import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../../service/productService';
import { IProduct } from '../../components/Product';

export interface ProductsState {
  items: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await productService.getProducts();
    return products;
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const product = await productService.getProductById(id);
    return product;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produtos';
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
