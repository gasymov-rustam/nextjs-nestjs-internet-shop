import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';

import cls from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  open: boolean;
  toggleOpen: () => void;
}

export const BurgerMenu = memo(({ open, toggleOpen }: BurgerMenuProps) => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <button
      onClick={toggleOpen}
      className={clsx(cls.burger_menu, darkModeClass, {
        [cls.open]: open,
      })}
    >
      <span />
      <span />
      <span />
    </button>
  );
});
