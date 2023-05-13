import { memo, useEffect } from 'react';

import { useTheme } from '../../../hooks';

import cls from './ModeToggler.module.scss';

export const ModeToggler = memo(() => {
  const { mode, toggleTheme } = useTheme();

  const handleToggleMode = () => {
    toggleTheme();
    document.body.classList.toggle('dark_mode');
  };

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body');
  }, [mode]);

  return (
    <div className={cls.theme}>
      <input
        className={cls.theme__input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  );
});
