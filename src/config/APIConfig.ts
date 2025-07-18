export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  TIMEOUT: parseInt(process.env.API_TIMEOUT || '') || 10000,

  ENDPOINTS: {
    CAROUSEL: '/carousel',
    PRODUCTS: '/products',
  },
  
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;