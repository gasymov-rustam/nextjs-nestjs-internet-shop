import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { ManufacturersBlockItem } from '../ManufacturersBlockItem';

import type { ManufacturersBlockProps } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const ManufacturersBlock = memo(
  ({ title, manufacturersList, event }: ManufacturersBlockProps) => {
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
    const checkedItems = manufacturersList.filter((item) => item.checked);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clsx(cls.manufacturers, darkModeClass)}
      >
        <h3 className={clsx(cls.manufacturers__title, darkModeClass)}>
          {title}
        </h3>

        <ul className={cls.manufacturers__list}>
          <AnimatePresence>
            {checkedItems.map((item) => (
              <ManufacturersBlockItem key={item.id} item={item} event={event} />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    );
  }
);
