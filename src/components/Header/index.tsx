import styles from './Header.module.css';
import Input from '../Input';
import { IoBagHandleOutline } from 'react-icons/io5';
import Menu from '../Menu';
import { useSearchContext } from '../../context/SearchContext';
import { useState } from 'react';
import CartModal from '../CartModal';
import { useCartContext } from '../../context/CartContext';

export default function Header() {
  const { search, setSearch } = useSearchContext();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { totalItems } = useCartContext();

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
  }

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>AL SKIN</h1>
        <Input
          value={search}
          onChange={handleOnChange}
          onSearchClick={onClickSearch}
          aria-label="Campo de  busca de produtos"
        />
        <div className={styles.header_actions}>
          <button
            className={styles.cart_button}
            onClick={handleOnClickCart}
            aria-label="Abrir carrinho"
          >
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && (
              <span className={styles.cart_badge}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
      <Menu />
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCart} />
    </div>
  );
}
