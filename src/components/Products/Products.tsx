import { useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import { useCart } from '../../hooks/useCart';
import styled from 'styled-components';
import { useSearch } from '../../hooks/useSearch';
import { useGetProductsQuery } from '../../store/api/apiSlice';

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
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const { term } = useSearch();
  const { addItem } = useCart();

  useEffect(() => {
    if (term) {
      setFilteredProducts(
        products.filter(
          (product) =>
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
      {isLoading && <p>Carregando produtos...</p>}
      {error && <p>Erro ao carregar produtos: {JSON.stringify(error)}</p>}

      {!isLoading && !error && (
        <>
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
        </>
      )}
    </Container>
  );
}
