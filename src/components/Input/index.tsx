import { useState } from 'react';
import styles from './Input.module.css';
import { IoIosSearch } from 'react-icons/io';

export default function Input() {
  const [textoBusca, setTextoBusca] = useState('');

  function handleOnCange(e: React.ChangeEvent<HTMLInputElement>){
    setTextoBusca(e.target.value);
  }
  return (
    <div className={styles.inputContainer}>
      <input type='text' className={styles.input} placeholder="O que você está procurando?" color='#ccc' onChange={handleOnCange} />
      <IoIosSearch size={24} color='#7a7878' />
    </div>
  );
}