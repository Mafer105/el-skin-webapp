export const theme = {
  colors: {
    primary: '#8B4A8B',
    primaryDark: '#7A3E7A',
    primaryLight: '#A855A8',
    primaryGradient: 'linear-gradient(135deg, #8B4A8B 0%, #A855A8 100%)',
    primaryGradientHover: 'linear-gradient(135deg, #7A3E7A 0%, #9333EA 100%)',

    secondary: '#007bff',

    text: {
      primary: '#333',
      secondary: '#666',
      tertiary: '#999',
      white: '#ffffff',
    },

    background: {
      white: '#ffffff',
      light: '#f8f9fa',
      gray: '#f0f0f0',
      card: '#ffffff',
    },

    border: {
      light: '#e5e5e5',
      medium: '#ddd',
      dark: '#f0f0f0',
    },

    button: {
      hover: '#f0f0f0',
      active: '#e0e0e0',
    },

    cart: {
      background: '#2d2d2d',
      item: '#3d3d3d',
      controls: '#4d4d4d',
      display: '#5d5d5d',
      overlay: 'rgba(0, 0, 0, 0.5)',
      price: '#a3e635',
      remove: '#ef4444',
    },

    tag: {
      protection: {
        bg: '#E3F2FD',
        text: '#1976D2',
      },
      face: {
        bg: '#FCE4EC',
        text: '#C2185B',
      },
    },

    promo: '#ff6b6b',

    shadow: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.08)',
      dark: 'rgba(0, 0, 0, 0.12)',
      primary: 'rgba(139, 74, 139, 0.3)',
      primaryHover: 'rgba(139, 74, 139, 0.4)',
    },
  },

  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    round: '50%',
    pill: '25px',
  },

  fontSize: {
    xs: '0.7rem', // 11px
    sm: '0.85rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '4rem', // 64px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.4,
    loose: 1.5,
  },

  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
  },

  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.6s ease',
  },

  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    primary: '0 4px 16px rgba(139, 74, 139, 0.3)',
    primaryHover: '0 8px 24px rgba(139, 74, 139, 0.4)',
    cart: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },

  zIndex: {
    dropdown: 100,
    modal: 1000,
    tooltip: 2000,
  },
} as const;

export type Theme = typeof theme;
