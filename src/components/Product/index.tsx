import product from '../../assets/product.png'
import styles from './Product.module.css'
export default function Product () {
    return(
        <div className={styles.container}>
            <img src={product} className={styles.img}/>
            <p className={styles.name}><strong>Protetor solar AL SUN</strong></p>
            <p className={styles.description}>alta proteção e pele luminosa sem grude nem pele cinzenta</p>
            <div className={styles.buttons}>
                <button className={styles.btnVerde}>proteção</button>
                <button className={styles.btnRosa}>rosto</button>
            </div>

            <div className={styles.buttons}>
                <h2>79,90</h2>
                <button className={styles.btnRoxo}>Comprar</button>
            </div>

        </div>
    )
}