import Carousel from '../../../components/Carousel';
import Products from '../../../components/Products/Products';
import { getProducts, getCarouselItems } from '../../../service/api';

export default async function Produtos() {
  const [products, carouselItems] = await Promise.all([
    getProducts(),
    getCarouselItems(),
  ]);

  return (
    <>
      <Carousel initialData={carouselItems}/>
      <Products initialData={products} />
    </>
  );
}