import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { LocationSvg } from '../LocationSvg';

import cls from './CityButton.module.scss';

export const CityButton = memo(() => {
  const { mode } = useTheme();
  const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

  return (
    <button className={cls.city}>
      <span className={clsx(cls.span, darkModeClass)}>
        <LocationSvg />
      </span>
      <span className={clsx(cls.text, darkModeClass)}>Tel Aviv</span>
    </button>
  );
});
