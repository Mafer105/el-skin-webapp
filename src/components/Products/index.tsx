import { useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import styles from './Products.module.css';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Comprar produto: ${productId}`);
  };

  return (
    <section className={styles.container}>
      <h3>nossos queridinhos estão aqui</h3>
      <section className={styles.products}>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onBuyClick={handleBuyClick}
          />
        ))}
      </section>

    </section>
  );
}