import { memo } from 'react';
import Slider from 'react-slick';

import { useMediaQuery } from '../../../hooks';

import cls from '@/components/templates/PartPage/PartPage.module.scss';

interface PartSliderProps {
  images: string[];
}

export const PartSlider = memo(({ images }: PartSliderProps) => {
  const isMobile700 = useMediaQuery(700);
  const isMobile530 = useMediaQuery(530);

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={cls.part__slider}>
      {images.map((src, i) => (
        <div
          className={cls.part__slide}
          key={i}
          style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
        >
          <img src={src} alt={`image-${i + 1}`} />
        </div>
      ))}
    </Slider>
  );
});
