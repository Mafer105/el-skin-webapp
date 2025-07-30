import { productService } from './productService';
import api from './api';
import { API_CONFIG } from '../config/APIConfig';
import { IProduct } from '../components/Product';

jest.mock('./api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockProducts: IProduct[] = [
  {
    id: '1',
    name: 'Produto 1',
    price: 100,
    description: 'Desc 1',
    image: '',
    tags: [],
  },
  {
    id: '2',
    name: 'Produto 2',
    price: 200,
    description: 'Desc 2',
    image: '',
    tags: [],
  },
];

const mockSingleProduct: IProduct = mockProducts[0];

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('deve chamar api.get com o endpoint correto e retornar uma lista de produtos', async () => {
      mockedApi.get.mockResolvedValue({ data: mockProducts });
      const products = await productService.getProducts();
      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.get).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.PRODUCTS);
      expect(products).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('deve chamar api.get com o ID correto e retornar um único produto', async () => {
      const productId = '1';
      mockedApi.get.mockResolvedValue({ data: mockSingleProduct });

      const product = await productService.getProductById(productId);

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.get).toHaveBeenCalledWith(
        `${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`,
      );
      expect(product).toEqual(mockSingleProduct);
    });
  });

  describe('quando a API falha', () => {
    it('deve lançar um erro quando api.get for rejeitado', async () => {
      const errorMessage = 'Network Error';
      mockedApi.get.mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProducts()).rejects.toThrow(errorMessage);
    });
  });
});
