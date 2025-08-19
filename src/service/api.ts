import { API_CONFIG } from '../config/APIConfig';
import { IProduct } from '../components/Product'; 
import { Slide } from '../components/Carousel'; 

export async function getProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar produtos');
    }

    return res.json();
  } catch (error) {
    console.error('[API_ERROR] getProducts:', error);
    return []; 
  }
}

export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);

    if (!res.ok) {
      throw new Error(`Falha ao buscar o produto com id: ${id}`);
    }

    return res.json();
  } catch (error) {
    console.error('[API_ERROR] getProductById:', error);
    return null;
  }
}

export async function getCarouselItems(): Promise<Slide[]> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAROUSEL}`, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar itens do carrossel');
    }

    return res.json();
  } catch (error) {
    console.error('[API_ERROR] getCarouselItems:', error);
    return [];
  }
}