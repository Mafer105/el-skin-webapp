import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { ReactElement, FC, ReactNode } from 'react';

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & MemoryRouterProps;

const customRender = (
  ui: ReactElement,

  { initialEntries, ...options }: CustomRenderOptions = {},
) => {
  const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <CartProvider>
        <SearchProvider>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </SearchProvider>
      </CartProvider>
    );
  };

  render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
