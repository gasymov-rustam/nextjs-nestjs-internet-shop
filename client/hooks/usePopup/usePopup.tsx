import { useCallback, useState } from 'react';
import {
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody,
} from '../../utils';
import { useAddEventListener } from '../useAddEventListener';

export const usePopup = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    window.scrollTo(0, 0);
    toggleClassNamesForOverlayAndBody();

    setOpen((prev) => !prev);
  }, []);

  const closePopup = useCallback(() => {
    removeClassNamesForOverlayAndBody();

    setOpen(false);
    // setSearchInputZIndex(1);
  }, []);

  useAddEventListener({
    type: 'click',
    deps: [closePopup, open],
    element: document.querySelector('.overlay'),
    cb: closePopup,
  });

  return { toggleOpen, open, closePopup };
};
