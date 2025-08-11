import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel, { Slide } from './index';
import { useGetCarouselItemsQuery } from '../../store/api/apiSlice';

jest.mock('../../store/api/apiSlice');

const mockedUseGetCarouselItemsQuery = useGetCarouselItemsQuery as jest.Mock;

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve exibir a mensagem de "Carregando..." inicialmente', () => {
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: [], 
      isLoading: true,
      error: null,
    });

    render(<Carousel />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('deve renderizar o primeiro slide após o carregamento dos dados', async () => {
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: mockSlides,
      isLoading: false,
      error: null,
    });

    render(<Carousel />);

    expect(await screen.findByText('Título do Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo do Slide 1')).toBeInTheDocument();

    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  test('deve navegar para o próximo slide ao clicar no botão >', async () => {
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: mockSlides,
      isLoading: false,
      error: null,
    });

    render(<Carousel />);

    await screen.findByText('Título do Slide 1');

    const nextButton = screen.getByText('❯');
    fireEvent.click(nextButton);
    expect(screen.getByText('Título do Slide 2')).toBeInTheDocument();
    expect(screen.queryByText('Título do Slide 1')).not.toBeInTheDocument();
  });

  test('deve navegar para o último slide ao clicar no botão < no primeiro slide', async () => {
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: mockSlides,
      isLoading: false,
      error: null,
    });

    render(<Carousel />);

    await screen.findByText('Título do Slide 1');

    const prevButton = screen.getByText('❮');
    fireEvent.click(prevButton);

    expect(screen.getByText('Título do Slide 3')).toBeInTheDocument();
  });

  test('deve chamar carouselService.getCarouselItems uma vez', async () => {
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: mockSlides,
      isLoading: false,
      error: null,
    });

    render(<Carousel />);
    await screen.findByText('Título do Slide 1');

    expect(useGetCarouselItemsQuery).toHaveBeenCalledTimes(1);
  });

  test('deve exibir uma mensagem de erro se a requisição falhar', () => {
    const error = { message: 'Falha na requisição' };
    mockedUseGetCarouselItemsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: error,
    });

    render(<Carousel />);
    expect(screen.getByText(/Ocorreu um erro/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(error.message, 'i'))).toBeInTheDocument();
  });
});
