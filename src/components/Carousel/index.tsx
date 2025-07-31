import { useEffect, useState } from 'react';
import { carouselService } from '../../service/carouselService';
import styled from 'styled-components';
export interface Slide {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

const Container = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 0px;
  background-color: #ffffff80;
  align-self: center;
  cursor: pointer;
`;

const BuyButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: #7045f5;
  color: white;
  border: 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
`;

const Content = styled.div`
  align-self: center;
  flex-grow: 1;
  margin-left: 60px;
`;

const Title = styled.h1`
  width: 260px;
  color: #94426e;
`;

const Subtitle = styled.p`
  width: 260px;
  color: #724a75;
`;

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
    <Container
      style={{
        backgroundImage: `url(${slides[currentIndex].backgroundImage})`,
      }}
    >
      <Button onClick={goToPrevious}>&#10094;</Button>

      <Content>
        <Title>{slides[currentIndex].title}</Title>
        <Subtitle>{slides[currentIndex].subtitle}</Subtitle>
        <BuyButton>Comprar Agora &#10095;</BuyButton>
      </Content>

      <Button onClick={goToNext}>&#10095;</Button>
    </Container>
  );
}
