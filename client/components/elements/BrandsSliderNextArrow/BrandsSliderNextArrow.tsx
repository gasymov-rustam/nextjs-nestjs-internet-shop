import { memo } from 'react';
import { CustomArrowProps } from 'react-slick';
import clsx from 'clsx';

import { BrandSliderArrowSvg } from '../BrandSliderArrowSvg';

import cls from './BrandsSliderNextArrow.module.scss';

interface BrandsSliderNextArrowProps extends CustomArrowProps {
  modeClass: string;
}

export const BrandsSliderNextArrow = memo(
  ({ modeClass, onClick }: BrandsSliderNextArrowProps) => (
    <button
      className={clsx(cls.brand, cls.arrow_next, modeClass)}
      onClick={onClick}
    >
      <span>
        <BrandSliderArrowSvg />
      </span>
    </button>
  )
);
