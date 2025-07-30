import styles from './Input.module.css';
import { IoIosSearch } from 'react-icons/io';
import React from 'react';
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSearchClick?: () => void;
  'aria-label': string;
}

export default function Input({
  value,
  onChange,
  placeholder,
  onSearchClick,
  'aria-label': ariaLabel,
}: Readonly<InputProps>) {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        id="search-input"
        className={styles.input}
        placeholder={placeholder || 'O que você está procurando?'}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      {onSearchClick && (
        <button
          className={styles.SearchBtn}
          onClick={onSearchClick}
          aria-label="Pesquisar"
        >
          <IoIosSearch size={24} color="#1a1a1aff" />
        </button>
      )}
    </div>
  );
}
