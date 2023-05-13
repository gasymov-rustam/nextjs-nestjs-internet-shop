import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { $mode, setMode } from '../../context/mode';

export const useTheme = () => {
  const mode = useStore($mode);

  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'));
      setMode('light');
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'));
      setMode('dark');
    }
  };

  useEffect(() => {
    const value = localStorage.getItem('mode');

    if (value && typeof value === 'string') {
      const localTheme = JSON.parse(value);

      if (localTheme) {
        setMode(localTheme);
        localStorage.setItem('mode', JSON.stringify(localTheme));
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
      localStorage.setItem('mode', JSON.stringify('dark'));
    }
  }, []);

  return { mode, toggleTheme };
};
