'use client'; 

import { useRouter } from 'next/navigation'; 
import styles from './not-found.module.css'; 

export default function NotFound() {
  const router = useRouter(); 

  return (
    <div className={styles.container}>
      <span className={styles.errorText}>404</span>
      <h1 className={styles.title}>Oops! Página não encontrada.</h1>
      <p className={styles.message}>
        O conteúdo que você está procurando não existe ou foi movido para outro
        lugar.
      </p>
      <div className={styles.buttonWrapper}>
        <button onClick={() => router.back()} className={styles.button}>
          &larr; Voltar
        </button>
        <button onClick={() => router.push('/')} className={styles.button}>
          Ir para a Home
        </button>
      </div>
    </div>
  );
}