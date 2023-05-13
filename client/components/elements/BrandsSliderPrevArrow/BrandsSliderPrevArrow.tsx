import clsx from 'clsx';
import { memo } from 'react';
import { CustomArrowProps } from 'react-slick';

import { BrandSliderArrowSvg } from '../BrandSliderArrowSvg';

import cls from './BrandsSliderPrevArrow.module.scss';

interface BrandsSliderPrevArrowProps extends CustomArrowProps {
  modeClass: string;
}

export const BrandsSliderPrevArrow = memo(
  ({ modeClass, onClick }: BrandsSliderPrevArrowProps) => {
    return (
      <button
        className={clsx(cls.brand, cls.brand__arrow_prev, modeClass)}
        onClick={onClick}
      >
        <span>
          <BrandSliderArrowSvg />
        </span>
      </button>
    );
  }
);
