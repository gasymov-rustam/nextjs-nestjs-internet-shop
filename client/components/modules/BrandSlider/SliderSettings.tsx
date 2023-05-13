import { BrandsSliderNextArrow, BrandsSliderPrevArrow } from '../../elements';

export const settings = (mode: string) => ({
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  variableWidth: true,
  autoplay: true,
  speed: 500,
  nextArrow: <BrandsSliderNextArrow modeClass={mode} />,
  prevArrow: <BrandsSliderPrevArrow modeClass={mode} />,
});
