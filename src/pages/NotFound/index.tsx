import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <span className={styles.errorText}>404</span>
      <h1 className={styles.title}>Oops! Página não encontrada.</h1>
      <p className={styles.message}>
        O conteúdo que você está procurando não existe ou foi movido para outro
        lugar.
      </p>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={() => navigate(-1)}>
          &larr; Voltar
        </button>
        <button className={styles.button} onClick={() => navigate('/')}>
          Ir para a Home
        </button>
      </div>
    </div>
  );
}
