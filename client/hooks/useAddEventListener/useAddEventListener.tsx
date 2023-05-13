import { useEffect } from 'react';
import { useLatest } from '../useLatest';

export const useAddEventListener = (
  type: keyof WindowEventMap,
  cb: (event: Event) => void
) => {
  const latestCb = useLatest(cb);

  useEffect(() => {
    const handler = (event: Event) => {
      latestCb.current(event);
    };

    window.addEventListener(type, handler);
    console.log('🚀 => 👍 ==>> useWindowEvent ==>> Line #16 ==>> ');
    return () => window.removeEventListener(type, handler);
  }, [type, latestCb]);
};
