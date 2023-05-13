import clsx from 'clsx';
import { memo } from 'react';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  count: number;
  mode?: string;
  width: {
    width: number;
  };
}

export const Skeleton = memo(
  ({ count, width, mode = 'light' }: SkeletonProps) => {
    const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

    return (
      <div className={cls.skeleton}>
        {[...Array(count)].map((_, i) => (
          <div
            className={clsx(cls.skeleton__item, darkModeClass)}
            key={i}
            style={width}
          >
            <div className={cls.skeleton__item__light} />
          </div>
        ))}
      </div>
    );
  }
);
