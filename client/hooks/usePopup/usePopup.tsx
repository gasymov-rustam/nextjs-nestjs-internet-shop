import { useCallback, useState } from 'react';
import { useAddEventListener } from '../useAddEventListener';

export const usePopup = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    window.scrollTo(0, 0);
    document.querySelector('.overlay')?.classList.toggle('open');
    document.querySelector('.body')?.classList.toggle('overflow-hidden');

    setOpen((prev) => !prev);
  }, []);

  const closePopup = useCallback(() => {
    document.querySelector('.overlay')?.classList.remove('open');
    document.querySelector('.body')?.classList.remove('overflow-hidden');

    setOpen(false);
  }, []);

  useAddEventListener({
    type: 'click',
    deps: [closePopup, open],
    element: document.querySelector('.overlay'),
    cb: closePopup,
  });

  return { toggleOpen, open, closePopup };
};
