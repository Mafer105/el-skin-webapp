import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../../config/APIConfig';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<{
    label: string;
    type: string;
  }>;
}

export interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => API_CONFIG.ENDPOINTS.PRODUCTS,
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
    }),
    getCarouselItems: builder.query<ICarouselItem[], void>({
      query: () => API_CONFIG.ENDPOINTS.CAROUSEL,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCarouselItemsQuery,
  useGetProductByIdQuery,
} = apiSlice;
