export const toggleClassNamesForOverlayAndBody = (
  overlayClassName = 'open'
) => {
  document.querySelector('.overlay')?.classList.toggle(overlayClassName);
  document.querySelector('.body')?.classList.toggle('overflow-hidden');
};
