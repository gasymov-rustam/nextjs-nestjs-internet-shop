import { memo } from 'react';
// import { useStore } from 'effector-react';

import { LocationSvg } from '../LocationSvg';

import cls from './CityButton.module.scss';

export const CityButton = memo(() => {
  // const mode = useStore($mode);
  // const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';
  const darkModeClass = false;

  return (
    <button className={cls.city}>
      <span className={`${cls.span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${cls.text} ${darkModeClass}`}>Moscow</span>
    </button>
  );
});
