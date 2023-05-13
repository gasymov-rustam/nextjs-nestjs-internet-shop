import { useEffect } from 'react';
import { useLatest } from '../useLatest';

interface UseAddEventListenerProps {
  type: keyof WindowEventMap;
  cb: (event: Event) => void;
  deps?: unknown[];
  element?: Element | null;
}

export const useAddEventListener = ({
  type,
  element,
  deps = [],
  cb,
}: UseAddEventListenerProps) => {
  const latestCb = useLatest(cb);

  useEffect(() => {
    const handler = (event: Event) => {
      latestCb.current(event);
    };

    (element ?? window)?.addEventListener(type, handler);

    return () => (element ?? window)?.removeEventListener(type, handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, latestCb, ...deps]);
};
