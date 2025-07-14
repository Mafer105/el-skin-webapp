import Product, { IProduct } from '../Product';
import styles from './Products.module.css';
import Prod1 from '../../assets/product.png';

const defaultProducts: IProduct[] = [
  {
    id: '1',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '2',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '3',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '4',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '5',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '6',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '7',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '8',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: Prod1,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  }
];

export default function Products() {
  const products = defaultProducts;

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