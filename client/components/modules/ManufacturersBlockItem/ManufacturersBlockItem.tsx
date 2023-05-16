import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { DeleteSvg } from '../../elements';

import type {
  IFilterCheckboxItem,
  ManufacturersBlockItemProps,
} from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const ManufacturersBlockItem = memo(
  ({ item, event }: ManufacturersBlockItemProps) => {
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const removeFilter = () =>
      event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem);

    return (
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clsx(cls.manufacturers__list__item, darkModeClass)}
      >
        <span className={cls.manufacturers__list__item__text}>
          {item.title}
        </span>
        <button
          className={cls.manufacturers__list__item__btn}
          onClick={removeFilter}
        >
          <span>
            <DeleteSvg />
          </span>
        </button>
      </motion.li>
    );
  }
);
