import styled, { css } from 'styled-components';

const tagStyles = {
  protection: css`
    background-color: #e3f2fd;
    color: #1976d2;
  `,
  face: css`
    background-color: #fce4ec;
    color: #c2185b;
  `,
};

type TagType = keyof typeof tagStyles;
interface TagProps {
  tagType: TagType;
}

const Container = styled.a`
  width: 240px;
  height: 400px;
  margin-bottom: 100px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 5px;
  object-fit: cover;
`;

const Name = styled.p`
  font-size: 20px;
  margin: 12px 0 4px;
`;

const Description = styled.p`
  width: 220px;
  font-size: 16px;
  color: #878787;
  margin: 0;
  flex-grow: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`;

const Tag = styled.span<TagProps>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  ${({ tagType }) => tagStyles[tagType]}
`;

const Price = styled.h2`
  font-size: 20px;
  margin: 0;
  flex-grow: 1;
`;

const BuyButton = styled.button`
  background-color: #7045f5;
  height: 40px;
  width: 132px;
  color: white;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;
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

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
}

const Product: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onBuyClick,
}) => {
  const formatPrice = (price: number): string => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <Container
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onProductClick(product.id);
      }}
    >
      <ProductImage src={product.image} alt="imagem do produto" />

      <Name>
        <strong>{product.name}</strong>
      </Name>

      <Description>{product.description}</Description>

      <ButtonsContainer>
        <Tag tagType={'protection'}>Protection</Tag>
        <Tag tagType={'face'}>Face</Tag>
      </ButtonsContainer>

      <ButtonsContainer>
        <Price>{formatPrice(product.price)}</Price>
        <BuyButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick(product.id, e);
          }}
        >
          Comprar
        </BuyButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Product;
