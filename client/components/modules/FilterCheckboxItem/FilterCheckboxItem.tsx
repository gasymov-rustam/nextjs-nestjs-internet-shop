import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';

import type { IFilterCheckboxItem } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const FilterCheckboxItem = memo((props: IFilterCheckboxItem) => {
  const { title, checked, id, event } = props;
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const handleFilterChange = () =>
    event({ checked: !checked, id } as IFilterCheckboxItem);

  return (
    <li className={clsx(cls.filters__manufacturer__list__item, darkModeClass)}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleFilterChange}
        />
        <span>{title}</span>
      </label>
    </li>
  );
});
