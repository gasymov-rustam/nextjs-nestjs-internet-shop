import clsx from 'clsx';
import { memo } from 'react';
import { useTheme } from '../../../hooks';

import type { FiltersPopupTopProps } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const FiltersPopupTop = memo((props: FiltersPopupTopProps) => {
  const {
    title,
    resetBtnText,
    resetFilters,
    resetFilterBtnDisabled,
    closePopup,
  } = props;

  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <div className={clsx(cls.catalog__bottom__filters__top, darkModeClass)}>
      <button
        onClick={closePopup}
        className={clsx(cls.catalog__bottom__filters__title, darkModeClass)}
      >
        {title}
      </button>

      <button
        className={cls.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  );
});
