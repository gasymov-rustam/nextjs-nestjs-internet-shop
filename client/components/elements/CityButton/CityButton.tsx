import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { LocationSvg } from '../LocationSvg';

import cls from './CityButton.module.scss';

export const CityButton = memo(() => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <button className={cls.city}>
      <span className={clsx(cls.city__span, darkModeClass)}>
        <LocationSvg />
      </span>

      <span className={clsx(cls.city__text, darkModeClass)}>Tel Aviv</span>
    </button>
  );
});
