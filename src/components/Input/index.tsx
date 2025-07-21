import styles from './Input.module.css';
import { IoIosSearch } from 'react-icons/io';
import { useSearchContext } from '../../context/SearchContext';
import React from 'react';

export default function Input() {
  const { search, setSearch } = useSearchContext();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
  }

  return (
    <div className={styles.inputContainer}>
      <input type='text' className={styles.input} placeholder="O que você está procurando?" color='#ccc' onChange={handleOnChange} />
      <button className={styles.SearchBtn} onClick={onClickSearch}>
        <IoIosSearch size={24} color='#1a1a1aff' />
      </button>
      
    </div>
  );
}