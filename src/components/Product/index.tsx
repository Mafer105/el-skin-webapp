import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Product.module.css';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<{
    label: string;
    type: 'protection' | 'face' | string; 
  }>;
}

interface ProductCardProps {
  product: IProduct;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
}

const Product: React.FC<ProductCardProps> = ({ product, onBuyClick }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getTagClassName = (type: string) => {
    return styles[type] || '';
  };

  return (
    <Link href={`/products/${product.id}`} className={styles.container}>
      <Image
        src={product.image}
        alt={`Imagem do produto ${product.name}`}
        width={240}
        height={240}
        className={styles.productImage}
      />

      <p className={styles.name}>{product.name}</p>

      <p className={styles.description}>{product.description}</p>

      {product.tags && product.tags.length > 0 && (
        <div className={styles.buttonsContainer}>
          {product.tags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`${styles.tag} ${getTagClassName(tag.type)}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      <div className={styles.buttonsContainer}>
        <h2 className={styles.price}>{formatPrice(product.price)}</h2>
        <button
          type="button"
          className={styles.buyButton}
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            onBuyClick(product.id, e);
          }}
        >
          Comprar
        </button>
      </div>
    </Link>
  );
};

export default Product;