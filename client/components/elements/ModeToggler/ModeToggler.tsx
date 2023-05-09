import { memo, useEffect } from 'react';

import cls from './ModeToggler.module.scss';

export const ModeToggler = memo(() => {
  // const { toggleTheme } = useTheme()
  // const mode = useStore($mode)
  const mode = 'light';

  const handleToggleMode = () => {
    // toggleTheme()
    document.body.classList.toggle('dark_mode');
  };

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body');
  }, [mode]);

  return (
    <div className={cls.theme}>
      <input
        className={cls.input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  );
});
