import { useEffect, useState } from 'react';
import styles from './Carousel.module.css';
import { carouselService } from '../../service/carouselService';
export interface Slide {
  id: string,
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const newItems = await carouselService.getCarouselItems();
      setSlides(newItems);
    }
    fetchItems();
  }, []);

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

  if (slides.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${slides[currentIndex].backgroundImage})` }} >

      <button onClick={goToPrevious} className={styles.btn}>
        &#10094;
      </button>

      <div className={styles.content}>
        <h1 className={styles.title}>{slides[currentIndex].title}</h1>
        <p className={styles.subtitle}>{slides[currentIndex].subtitle}</p>
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

