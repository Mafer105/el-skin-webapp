import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product, { IProduct } from './index';

const mockProduct: IProduct = {
  id: '1',
  name: 'Sérum Hidratante',
  description: 'Um sérum para hidratação profunda.',
  price: 89.9,
  image: 'image-url.jpg',
  tags: [{ label: 'Vegano', type: 'normal' }],
};

describe('Componente Product', () => {
  const mockOnProductClick = jest.fn();
  const mockOnBuyClick = jest.fn();

  beforeEach(() => {
    mockOnProductClick.mockClear();
    mockOnBuyClick.mockClear();
  });

  test('deve renderizar as informações do produto corretamente', () => {
    render(
      <Product
        product={mockProduct}
        onProductClick={mockOnProductClick}
        onBuyClick={mockOnBuyClick}
      />,
    );

    expect(screen.getByText('Sérum Hidratante')).toBeInTheDocument();
    expect(
      screen.getByText('Um sérum para hidratação profunda.'),
    ).toBeInTheDocument();
    expect(screen.getByText('R$ 89,90')).toBeInTheDocument();
    expect(screen.getByText('Vegano')).toBeInTheDocument();
    expect(screen.getByAltText('imagem do produto')).toHaveAttribute(
      'src',
      'image-url.jpg',
    );
  });

  test('deve chamar onProductClick quando o card do produto for clicado', () => {
    render(
      <Product
        product={mockProduct}
        onProductClick={mockOnProductClick}
        onBuyClick={mockOnBuyClick}
      />,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(mockOnProductClick).toHaveBeenCalledTimes(1);
    expect(mockOnProductClick).toHaveBeenCalledWith(mockProduct.id);
  });

  test('deve chamar onBuyClick quando o botão "Comprar" for clicado', () => {
    render(
      <Product
        product={mockProduct}
        onProductClick={mockOnProductClick}
        onBuyClick={mockOnBuyClick}
      />,
    );

    const comprarButton = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(comprarButton);

    expect(mockOnBuyClick).toHaveBeenCalledTimes(1);
    expect(mockOnBuyClick).toHaveBeenCalledWith(
      mockProduct.id,
      expect.any(Object),
    );
    expect(mockOnProductClick).not.toHaveBeenCalled();
  });
});
