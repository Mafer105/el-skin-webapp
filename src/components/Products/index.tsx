import Product from '../Product';
import styles from './Products.module.css';
export default function Products() {
  return (
    <section className={styles.container}>
      <h3>nossos queridinhos estão aqui</h3>
      <section className={styles.products}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </section>

    </section>
  );
}