import clsx from 'clsx';

import { memo } from 'react';
import { useTheme } from '../../../hooks';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  count: number;
  width?: {
    width: number;
  };
  className?: string;
  skeletonItemClassName?: string;
}

export const Skeleton = memo(
  ({ count, width, className, skeletonItemClassName }: SkeletonProps) => {
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    return (
      <div className={clsx(cls.skeleton, className)}>
        {[...Array(count)].map((_, i) => (
          <div
            className={clsx(
              cls.skeleton__item,
              darkModeClass,
              skeletonItemClassName
            )}
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
