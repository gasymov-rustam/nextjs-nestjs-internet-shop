import { useStore } from 'effector-react';
import { memo, useState } from 'react';

import { $boilerPart } from '../../../context/boilerPart';
import { useMediaQuery } from '../../../hooks';
import { PartImagesItem } from '../PartImagesItem';
import { PartSlider } from '../PartSlider/PartSlider';

import cls from '@/components/templates/PartPage/PartPage.module.scss';

export const PartImagesList = memo(() => {
  const [currentImgSrc, setCurrentImgSrc] = useState('');
  const boilerPart = useStore($boilerPart);
  const isMobile = useMediaQuery(850);

  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : [];

  return (
    <div className={cls.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={cls.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>

          <ul className={cls.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
});
