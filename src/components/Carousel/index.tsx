'use client';

import { useState } from 'react';
import styles from './Carousel.module.css';
export interface Slide {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

interface CarouselProps {
  initialData: Slide[];
}

export default function Carousel({ initialData }: Readonly<CarouselProps>) {
  const items = initialData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (items.length === 0) {
    return null; 
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${items[currentIndex].backgroundImage})` }}
    >
      <button onClick={goToPrevious} className={styles.navigationButton}>
        &#10094;
      </button>

      <div className={styles.content}>
        <h1 className={styles.title}>{items[currentIndex].title}</h1>
        <p className={styles.subtitle}>{items[currentIndex].subtitle}</p>
        <button className={styles.buyButton}>
          Comprar Agora &#10095;
        </button>
      </div>

      <button onClick={goToNext} className={styles.navigationButton}>
        &#10095;
      </button>
    </div>
  );
}