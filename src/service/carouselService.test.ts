import { carouselService } from './carouselService';
import api from './api';
import { API_CONFIG } from '../config/APIConfig';
import { Slide } from '../components/Carousel';

jest.mock('./api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('carouselService', () => {
  beforeEach(() => {
    mockedApi.get.mockClear();
  });

  it('deve retornar os itens do carrossel quando a API responde com sucesso', async () => {
    const mockSlides: Slide[] = [
      {
        id: '1',
        backgroundImage: 'url1.jpg',
        title: 'Imagem 1',
        subtitle: 'subtitle',
        description: 'description',
      },
      {
        id: '2',
        backgroundImage: 'url2.jpg',
        title: 'Imagem 2',
        subtitle: 'subtitle',
        description: 'description',
      },
    ];

    mockedApi.get.mockResolvedValue({ data: mockSlides });

    const result = await carouselService.getCarouselItems();

    expect(result).toEqual(mockSlides);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.CAROUSEL);
  });

  it('deve lançar um erro quando a chamada da API falha', async () => {
    const errorMessage = 'Network Error';

    mockedApi.get.mockRejectedValue(new Error(errorMessage));

    await expect(carouselService.getCarouselItems()).rejects.toThrow(
      errorMessage,
    );

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(API_CONFIG.ENDPOINTS.CAROUSEL);
  });
});
