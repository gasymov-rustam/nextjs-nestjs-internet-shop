import { useCallback, useEffect, useState } from 'react';

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window === 'undefined' ? { innerWidth: 0 } : window;

  return windowWidth;
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const handleResize = useCallback(() => setWindowWidth(getWindowWidth()), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, true);

    return () => window.removeEventListener('resize', handleResize, true);
  }, [handleResize]);

  return { windowWidth, handleResize };
};

export const useMediaQuery = (maxWidth: number) => {
  const { windowWidth, handleResize } = useWindowWidth();
  const [isMedia, setIsMedia] = useState(false);

  useEffect(() => {
    if (windowWidth <= maxWidth) {
      setIsMedia(true);
    } else {
      setIsMedia(false);
    }
  }, [handleResize, maxWidth, windowWidth]);

  return isMedia;
};
