import styles from './Header.module.css';
import Input from '../Input';
import { IoBagHandleOutline } from 'react-icons/io5';
import Menu from '../Menu';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>AL SKIN</h1>
        <Input />
        <IoBagHandleOutline size={24} />
      </div>
      <Menu />
    </div>


  );
}