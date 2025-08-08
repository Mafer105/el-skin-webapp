import { useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import { productService } from '../../service/productService';
import { useCart } from '../../hooks/useCart';
import styled from 'styled-components';
import { useSearch } from '../../hooks/useSearch';
import { useProducts } from '../../hooks/useProducts';

const Container = styled.section`
  width: 80%;
  margin: 0 auto;
`;
const Title = styled.h3`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 100px;
  justify-self: center;
`;

export default function Products() {
  const { products, loadProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const { term } = useSearch();
  const { addItem } = useCart();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);
  useEffect(() => {
    if (term) {
      setFilteredProducts(
        products.filter(
          (product: { name: string; description: string }) =>
            product.name.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts([...products]);
    }
  }, [term, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const productToAdd = products.find(
      (p: { id: string }) => p.id === productId,
    );
    if (productToAdd) {
      addItem(productToAdd);
      alert(`${productToAdd.name} foi adicionado ao carrinho!`);
    }
  };

  return (
    <Container>
      <Title>nossos queridinhos estão aqui</Title>
      <Grid>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onBuyClick={handleBuyClick}
          />
        ))}
      </Grid>
    </Container>
  );
}
