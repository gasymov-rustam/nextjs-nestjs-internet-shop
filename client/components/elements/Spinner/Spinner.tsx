import clsx from 'clsx';
import { CSSProperties, memo } from 'react';

import cls from './Spinner.module.scss';

interface SpinnerProps {
  mode: string;
  style?: CSSProperties;
  className?: string;
}

export const Spinner = memo(({ mode, style, className }: SpinnerProps) => {
  const spinnerDarkModeClass = { [cls.dark_mode]: mode !== 'dark' };

  return (
    <span
      className={clsx(cls.spinner, spinnerDarkModeClass, className)}
      style={style}
    />
  );
});
