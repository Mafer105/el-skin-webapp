import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel, { Slide } from './index';
import { carouselService } from '../../service/carouselService';

jest.mock('../../service/carouselService');

const mockSlides: Slide[] = [
  {
    id: '1',
    title: 'Título do Slide 1',
    subtitle: 'Subtítulo do Slide 1',
    description: 'Descrição 1',
    backgroundImage: 'image1.jpg',
  },
  {
    id: '2',
    title: 'Título do Slide 2',
    subtitle: 'Subtítulo do Slide 2',
    description: 'Descrição 2',
    backgroundImage: 'image2.jpg',
  },
  {
    id: '3',
    title: 'Título do Slide 3',
    subtitle: 'Subtítulo do Slide 3',
    description: 'Descrição 3',
    backgroundImage: 'image3.jpg',
  },
];

describe('Componente Carousel', () => {
  beforeEach(() => {
    (carouselService.getCarouselItems as jest.Mock).mockResolvedValue(
      mockSlides,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve exibir a mensagem de "Carregando..." inicialmente', () => {
    render(<Carousel />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('deve renderizar o primeiro slide após o carregamento dos dados', async () => {
    render(<Carousel />);

    expect(await screen.findByText('Título do Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo do Slide 1')).toBeInTheDocument();

    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  test('deve navegar para o próximo slide ao clicar no botão >', async () => {
    render(<Carousel />);

    await screen.findByText('Título do Slide 1');

    const nextButton = screen.getByText('❯');
    fireEvent.click(nextButton);
    expect(screen.getByText('Título do Slide 2')).toBeInTheDocument();
    expect(screen.queryByText('Título do Slide 1')).not.toBeInTheDocument();
  });

  test('deve navegar para o último slide ao clicar no botão < no primeiro slide', async () => {
    render(<Carousel />);

    await screen.findByText('Título do Slide 1');

    const prevButton = screen.getByText('❮');
    fireEvent.click(prevButton);

    expect(screen.getByText('Título do Slide 3')).toBeInTheDocument();
  });

  test('deve chamar carouselService.getCarouselItems uma vez', async () => {
    render(<Carousel />);
    await screen.findByText('Título do Slide 1');

    expect(carouselService.getCarouselItems).toHaveBeenCalledTimes(1);
  });
});
