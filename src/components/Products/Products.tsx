import { useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import { productService } from '../../service/productService';
import { useSearchContext } from '../../context/SearchContext';
import { useCartContext } from '../../context/CartContext';
import styled from 'styled-components';

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
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const { search } = useSearchContext();
  const { adicionarProduto } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productService.getProducts();
      setProducts(response);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts([...products]);
    }
  }, [search, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      adicionarProduto(productToAdd);
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
