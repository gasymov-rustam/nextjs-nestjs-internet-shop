export const removeClassNamesForOverlayAndBody = () => {
  document.querySelector('.overlay')?.classList.remove('open');
  document.querySelector('.overlay')?.classList.remove('open-search');
  document.querySelector('.body')?.classList.remove('overflow-hidden');
};
