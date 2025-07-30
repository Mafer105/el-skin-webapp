import styles from './Sobre.module.css';
import img1 from '../../assets/sobre2.png';
import img2 from '../../assets/sobre1.png';
import img3 from '../../assets/sobre3.png';
import { IoChatbubbleOutline } from 'react-icons/io5';

export default function Sobre() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Sobre a AL SKIN</h1>
        <div className={styles.section}>
          <section className={styles.firstRow}>
            <h3 className={styles.subtitle}>QUEM SOMOS</h3>
            <p className={styles.text}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </p>

            <h3 className={styles.subtitle}>POR QUE EXISTIMOS?</h3>
            <p className={styles.text}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </p>

            <h3 className={styles.subtitle}>O QUE A GENTE FAZ?</h3>
            <p className={styles.text}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </p>

            <img
              src={img1}
              alt="imagem do produto"
              style={{ marginTop: '30px' }}
            />
          </section>

          <section className={styles.secondRow}>
            <img
              src={img2}
              alt="imagem do produto"
              style={{
                width: '570px',
                height: '850px',
                objectFit: 'fill',
                marginTop: '-50px',
              }}
            />
            <h2 className={styles.help}>VAMOS CONVERSAR?</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>

            <button className={styles.btn}>
              <IoChatbubbleOutline color="#fff" size={24} />
              Fale conosco
            </button>
          </section>
        </div>
      </div>
      <img
        src={img3}
        alt="imagem do produto"
        style={{ width: '100%', marginTop: '20px', height: '1000px' }}
      />
    </>
  );
}
