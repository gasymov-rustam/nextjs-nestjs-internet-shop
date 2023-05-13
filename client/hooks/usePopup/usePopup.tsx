import { useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    const overlay = document.querySelector('.overlay');

    overlay?.addEventListener('click', closePopup);

    return () => overlay?.removeEventListener('click', closePopup);
  }, [closePopup, open]);

  return { toggleOpen, open, closePopup };
};
