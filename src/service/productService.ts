import { API_CONFIG } from '../config/APIConfig';
import api from './api';
import { IProduct } from '../components/Product';

export const productService = {
  async getProducts(): Promise<IProduct[]> {
    const response = await api.get<IProduct[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
    return response.data;
  },

  async getProductById(id: string): Promise<IProduct> {
    const response = await api.get<IProduct>(
      `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
    );
    return response.data;
  },
};
