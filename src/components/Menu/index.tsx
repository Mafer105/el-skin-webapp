import styles from './Menu.module.css';

export default function Menu() {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <p>Categorias</p>
        </li>
        <li>
          <p>Tipo de pele</p>
        </li>
        <li>
          <p>Necessidade</p>
        </li>
        <li>
          <p>Ingredientes</p>
        </li>
      </ul>
      <p className={styles.promocao}>
        <strong>Kits até 50% off</strong>
      </p>
    </nav>
  );
}