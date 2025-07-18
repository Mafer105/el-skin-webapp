import api from './api';
import { API_CONFIG } from '../config/APIConfig';
import { Slide } from '../components/Carousel';

export const carouselService = {
  async getCarouselItems(): Promise<Slide[]> {
    const response = await api.get<Slide[]>(API_CONFIG.ENDPOINTS.CAROUSEL);
    return response.data;
  },
};