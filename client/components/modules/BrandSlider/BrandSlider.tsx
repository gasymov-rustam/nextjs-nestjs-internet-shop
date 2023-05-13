import clsx from 'clsx';
import { memo, useEffect } from 'react';
import Slider from 'react-slick';

import { useMediaQuery, useTheme } from '../../../hooks';
import { settings } from './SliderSettings';
import { brandItems } from './mock';

import cls from './BrandSlider.module.scss';

export const BrandSlider = memo(() => {
  const { mode } = useTheme();
  const isMedia768 = useMediaQuery(768);
  const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

  useEffect(() => {
    const slider = document.querySelector(`.${cls.dashboard__brands__slider}`);

    const list = slider?.querySelector('.slick-list') as HTMLElement;

    list.style.height = isMedia768 ? '60px' : '80px';
  }, [isMedia768]);

  return (
    <Slider
      {...settings(darkModeClass)}
      className={cls.dashboard__brands__slider}
    >
      {brandItems.map((item) => (
        <div
          className={clsx(cls.dashboard__brands__slide, darkModeClass)}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
});
