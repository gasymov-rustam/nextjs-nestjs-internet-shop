import clsx from 'clsx';
import { memo } from 'react';

import { useMediaQuery, useTheme } from '../../../hooks';
import { Accordion } from '../../elements';
import { FilterCheckboxItem } from '../FilterCheckboxItem';

import type { FilterManufacturerAccordionProps } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const FilterManufacturerAccordion = memo(
  (props: FilterManufacturerAccordionProps) => {
    const { manufacturersList, title, updateManufacturer, setManufacturer } =
      props;

    const { mode } = useTheme();
    const isMobile = useMediaQuery(820);
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const chooseAllManufacturers = () =>
      setManufacturer(
        manufacturersList.map((item) => ({ ...item, checked: true }))
      );

    return (
      <Accordion
        title={title}
        titleClass={clsx(cls.filters__manufacturer__btn, darkModeClass)}
        arrowOpenClass={cls.open}
        isMobileForFilters={isMobile}
        hideArrowClass={isMobile ? cls.hide_arrow : ''}
      >
        <div className={cls.filters__manufacturer__inner}>
          <button
            className={cls.filters__manufacturer__select_all}
            onClick={chooseAllManufacturers}
          >
            Select All
          </button>
          <ul className={cls.filters__manufacturer__list}>
            {manufacturersList.map((item) => (
              <FilterCheckboxItem
                title={item.title}
                id={item.id}
                key={item.id}
                checked={item.checked}
                event={updateManufacturer}
              />
            ))}
          </ul>

          <div style={{ height: 24 }} />
        </div>
      </Accordion>
    );
  }
);
