import styles from './Input.module.css'
import { IoIosSearch } from "react-icons/io";

export default function Input(){
    return (
        <div className={styles.inputContainer}>
            <input className={styles.input} placeholder="O que você está procurando?" color='#ccc'/>
            <IoIosSearch size={24} color='#7a7878'/>
        </div>
    )
}