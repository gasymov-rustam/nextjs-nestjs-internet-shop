import { memo } from 'react';

import cls from '@/components/templates/PartPage/PartPage.module.scss';

interface PartImagesItemProps {
  src: string;
  alt: string;
  callback: (arg: string) => void;
}

export const PartImagesItem = memo(
  ({ src, callback, alt }: PartImagesItemProps) => {
    const changeMainImage = () => callback(src);

    return (
      <li className={cls.part__images__list__item} onClick={changeMainImage}>
        <img src={src} alt={alt} />
      </li>
    );
  }
);
