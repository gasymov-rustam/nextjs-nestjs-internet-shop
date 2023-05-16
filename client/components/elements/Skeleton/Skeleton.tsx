import clsx from 'clsx';

import { memo } from 'react';
import { useTheme } from '../../../hooks';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  count: number;
  width?: {
    width: number;
  };
}

export const Skeleton = memo(({ count, width }: SkeletonProps) => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

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
});
