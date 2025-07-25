import {useEffect, useState } from 'react';
import Product, { IProduct } from '../Product';
import styles from './Products.module.css';
import { productService } from '../../service/productService';
import { useSearchContext } from '../../context/SearchContext';
import { useCartContext } from '../../context/CartContext';

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
      setFilteredProducts(products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setFilteredProducts([...products]);
    }
  }, [search, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      adicionarProduto(productToAdd);
      alert(`${productToAdd.name} foi adicionado ao carrinho!`); 
    }
  };

  return (
    <section className={styles.container}>
      <h3>nossos queridinhos estão aqui</h3>
      <section className={styles.products}>
        {filteredProducts.map((product) => (
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