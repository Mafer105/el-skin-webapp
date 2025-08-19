'use client'; 

import Image from 'next/image';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './page.module.css'; 

export default function Sobre() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Sobre a AL SKIN</h1>
        <div className={styles.sectionContainer}>
          <section>
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

            <Image
              className={styles.firstImage}
              src="/assets/sobre2.png"
              alt="imagem do produto"
              width={500} 
              height={750} 
            />
          </section>

          <section>
            <Image
              className={styles.secondImage}
              src="/assets/sobre1.png"
              alt="imagem do produto"
              width={570}
              height={850}
            />
            <h2 className={styles.helpTitle}>VAMOS CONVERSAR?</h2>
            <p> 
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>

            <button className={styles.contactButton}>
              <IoChatbubbleOutline color="#fff" size={24} />
              Fale conosco
            </button>
          </section>
        </div>
      </div>

      <Image
        className={styles.bottomBanner}
        src="/assets/sobre3.png"
        alt="imagem do produto"
        width={1920} 
        height={1000}
      />
    </>
  );
}