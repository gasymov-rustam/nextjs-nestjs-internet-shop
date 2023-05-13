export const settings = (isMedia: boolean) => ({
  dots: false,
  infinite: true,
  variableWidth: true,
  autoplay: true,
  speed: 500,
  arrows: false,
  slidesToScroll: isMedia ? 1 : 2,
});
