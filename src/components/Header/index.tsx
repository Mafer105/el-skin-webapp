import styles from './Header.module.css';
import Input from '../Input';
import { IoBagHandleOutline } from 'react-icons/io5';
import Menu from '../Menu';
import { useSearchContext } from '../../context/SearchContext';
import { useCartContext } from '../../context/CartContext';
import { useState } from 'react';
import CartModal from '../CartModal';

export default function Header() {
  const { search, setSearch } = useSearchContext();
  const { items } = useCartContext();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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
        <Input />
        <div className={styles.header_actions}>
          <button className={styles.cart_button} onClick={handleOnClickCart}>
            <IoBagHandleOutline size={24} />
          </button>
        </div>
        
      </div>
      <Menu />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        items={items}
      />
    </div>


  );
}