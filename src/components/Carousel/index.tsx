import React, { useState } from 'react';
import styles from './Carousel.module.css';
import image1 from '../../assets/carousel/image1.png';
import image2 from '../../assets/carousel/image2.png';
import image3 from '../../assets/carousel/image3.png';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    image: image2,
    title: 'Confira nossa linha Corporal',
    description: 'com benefícios além da hidratação',
    buttonText: 'Comprar Agora',
  },
  {
    image: image1,
    title: 'Toda a linha anti-age',
    description: 'Com 15% off',
    buttonText: 'Comprar agora',
  },
  {
    image: image3,
    title: 'Kits incríveis',
    description: 'Até 50% off',
    buttonText: 'Comprar agora',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${slides[currentIndex].image})` }} >

      <button onClick={goToPrevious} className={styles.btn}>
        &#10094;
      </button>

      <div className={styles.content}>
        <h1 className={styles.title}>{slides[currentIndex].title}</h1>
        <p className={styles.subtitle}>{slides[currentIndex].description}</p>
        <button className={styles.btnComprar}>
          Comprar Agora &#10095;
        </button>
      </div>

      <button onClick={goToNext} className={styles.btn}>
        &#10095;
      </button>

    </div>

  );


}

