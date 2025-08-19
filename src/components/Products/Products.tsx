'use client';

import { useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import { useCart } from '../../hooks/useCart';
import { useSearch } from '../../hooks/useSearch';
import styles from './Products.module.css';

interface ProductsProps {
  initialData: IProduct[];
}

export default function Products({ initialData }: Readonly<ProductsProps>) {
  const products = initialData;
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  

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

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      addItem(productToAdd);
      alert(`${productToAdd.name} foi adicionado ao carrinho!`);
    }
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>nossos queridinhos estão aqui</h3>
      <section className={styles.grid}>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onBuyClick={handleBuyClick}
          />
        ))}
      </section>
    </section>
  );
}