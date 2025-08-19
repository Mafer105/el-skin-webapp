'use client'; 

import Input from '../Input';
import { IoBagHandleOutline } from 'react-icons/io5';
import Menu from '../Menu';
import { useState } from 'react';
import CartModal from '../CartModal';
import { useSearch } from '../../hooks/useSearch';
import styles from './Header.module.css'; 

export default function Header() {
  const { term, setTerm } = useSearch();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${term}`);
  }

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <h1>AL SKIN</h1>
        <Input
          value={term}
          onChange={handleOnChange}
          onSearchClick={onClickSearch}
          aria-label="Campo de busca de produtos"
        />
        <div className={styles.actions}>
          <button
            onClick={handleOnClickCart}
            aria-label="Abrir carrinho"
            className={styles.cartButton}
          >
            <IoBagHandleOutline size={24} />
          </button>
        </div>
      </div>
      <Menu />
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCart} />
    </div>
  );
}