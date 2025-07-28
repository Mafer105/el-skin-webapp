import styles from './Product.module.css';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<{
    label: string;
    type: string
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
  onBuyClick
}) => {
  const formatPrice = (price: number): string => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <a className={styles.container} onClick={(e) => {
      e.preventDefault();
      onProductClick(product.id);
    }} href='#'>
      <img src={product.image} className={styles.img} alt='imagem do produto' />
      <p className={styles.name}><strong>{product.name}</strong></p>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.buttons}>
        {product.tags.map((tag) => (
          <span
            key={`${product.id}-${tag.label}-${tag.type}`}
            className={`${styles['product-tag']} ${styles['product-tag--' + tag.type]}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className={styles.buttons}>
        <h2 style={{ fontSize: '20px' }}>{formatPrice(product.price)}</h2>
        <button className={styles.btnRoxo} onClick={(e) => {e.stopPropagation(); onBuyClick(product.id, e)}} type="button">
          Comprar
        </button>
      </div>

    </a>
  );
};

export default Product;