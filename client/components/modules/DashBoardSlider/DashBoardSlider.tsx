import clsx from 'clsx';
import Link from 'next/link';
import { memo, useEffect } from 'react';
import Slider from 'react-slick';

import { Paths } from '../../../constants';
import { useMediaQuery, useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';
import { Skeleton } from '../../elements';
import { settings } from './DashBoardSliderSettings';

import type { IBoilerPart } from '../../../types';

import cls from './DashBoardSlider.module.scss';

interface DashBoardSliderProps {
  items: IBoilerPart[];
  spinner: boolean;
  goToPartPage?: boolean;
}

export const DashBoardSlider = memo((props: DashBoardSliderProps) => {
  const { items, spinner, goToPartPage } = props;
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const isMedia768 = useMediaQuery(768);
  const isMedia1366 = useMediaQuery(1366);
  const isMedia800 = useMediaQuery(800);
  const isMedia560 = useMediaQuery(560);

  useEffect(() => {
    const slider = document.querySelectorAll(`.${cls.dashboard__slider}`);

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement;

      list.style.height = isMedia560 ? '276px' : '390px';
      list.style.padding = '0 5px';
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0';
    });
  }, [isMedia560, isMedia800]);

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  };

  if (spinner) {
    return <Skeleton count={4} width={width} />;
  }

  return (
    <Slider {...settings(isMedia768)} className={cls.dashboard__slider}>
      {items.length ? (
        items.map((item) => (
          <div
            className={clsx(cls.dashboard__slide, darkModeClass)}
            key={item.id}
            style={width}
          >
            <img src={JSON.parse(item.images)[0]} alt={item.name} />

            <div className={cls.dashboard__slide__inner}>
              <Link
                href={
                  goToPartPage ? `${Paths.CATALOG}/${item.id}` : Paths.CATALOG
                }
                passHref
                legacyBehavior
              >
                <a href="">
                  <h3 className={cls.dashboard__slide__title}>{item.name}</h3>
                </a>
              </Link>

              <span className={cls.dashboard__slide__code}>
                Item number: {item.vendor_code}
              </span>

              <span className={cls.dashboard__slide__price}>
                {formatPrice(item.price)} P
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>Product list is empty....</span>
      )}
    </Slider>
  );
});
