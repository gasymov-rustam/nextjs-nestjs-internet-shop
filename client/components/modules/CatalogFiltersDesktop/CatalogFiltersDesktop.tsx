import { useStore } from 'effector-react';
import { memo } from 'react';
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '../../../context/boilerParts';
import { useTheme } from '../../../hooks';

import type { CatalogFiltersDesktopProps } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';
import clsx from 'clsx';
import { Accordion } from '../../elements';
import { FilterManufacturerAccordion } from '../FilterManufacturerAccordion';
import { PriceRange } from '../PriceRange';

export const CatalogFiltersDesktop = memo(
  (props: CatalogFiltersDesktopProps) => {
    const {
      priceRange,
      setPriceRange,
      setIsPriceRangeChanged,
      resetFilterBtnDisabled,
      spinner,
      resetFilters,
      applyFilters,
    } = props;
    const { mode } = useTheme();
    const boilerManufacturers = useStore($boilerManufacturers);
    const partsManufacturers = useStore($partsManufacturers);
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    return (
      <div className={clsx(cls.catalog__bottom__filters, darkModeClass)}>
        <h3
          className={clsx(cls.catalog__bottom__filters__title, darkModeClass)}
        >
          Filters
        </h3>
        <div className={cls.filters__boiler_manufacturers}>
          <FilterManufacturerAccordion
            manufacturersList={boilerManufacturers}
            title="Boiler manufacturer"
            updateManufacturer={updateBoilerManufacturer}
            setManufacturer={setBoilerManufacturers}
          />
        </div>
        <div className={cls.filters__price}>
          <Accordion
            title="Price"
            titleClass={clsx(cls.filters__manufacturer__btn, darkModeClass)}
            arrowOpenClass={cls.open}
          >
            <div className={cls.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>

        <div className={cls.filters__boiler_manufacturers}>
          <FilterManufacturerAccordion
            manufacturersList={partsManufacturers}
            title="Parts Manufacturer"
            updateManufacturer={updatePartsManufacturer}
            setManufacturer={setPartsManufacturers}
          />
        </div>
        <div className={cls.filters__actions}>
          <button
            className={cls.filters__actions__show}
            disabled={spinner || resetFilterBtnDisabled}
            onClick={applyFilters}
          >
            {spinner ? (
              <span className="spinner" style={{ top: 6, left: '47%' }} />
            ) : (
              'Show'
            )}
          </button>
          <button
            className={cls.filters__actions__reset}
            disabled={resetFilterBtnDisabled}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
);
