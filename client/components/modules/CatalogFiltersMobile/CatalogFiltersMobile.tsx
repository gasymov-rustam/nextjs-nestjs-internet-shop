import clsx from 'clsx';
import { useStore } from 'effector-react';
import { memo, useState } from 'react';

import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '../../../context/boilerParts';
import { useMediaQuery, useTheme } from '../../../hooks';
import { CatalogFiltersMobileProps } from '../../../types';
import { Accordion } from '../../elements';
import { FiltersPopup } from '../FiltersPopup';
import { FiltersPopupTop } from '../FiltersPopupTop';
import { PriceRange } from '../PriceRange';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const CatalogFiltersMobile = memo((props: CatalogFiltersMobileProps) => {
  const {
    spinner,
    resetFilterBtnDisabled,
    filtersMobileOpen,
    priceRange,
    resetFilters,
    closePopup,
    applyFilters,
    setPriceRange,
    setIsPriceRangeChanged,
  } = props;

  const { mode } = useTheme();
  const isMobile = useMediaQuery(820);
  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const [openBoilers, setOpenBoilers] = useState(false);
  const [openParts, setOpenParts] = useState(false);
  const handleOpenBoilers = () => setOpenBoilers(true);
  const handleCloseBoilers = () => setOpenBoilers(false);
  const handleOpenParts = () => setOpenParts(true);
  const handleCloseParts = () => setOpenParts(false);
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  );
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  );

  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(
      boilerManufacturers.map((item) => ({ ...item, checked: false }))
    );

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(
      partsManufacturers.map((item) => ({ ...item, checked: false }))
    );

  const applyFiltersAndClosePopup = () => {
    applyFilters();
    closePopup();
  };

  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <div
      className={clsx(cls.catalog__bottom__filters, darkModeClass, {
        [cls.open]: filtersMobileOpen,
      })}
    >
      <div className={cls.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Reset All"
          title="Filters"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />

        <div className={cls.filters__boiler_manufacturers}>
          <button
            className={clsx(cls.filters__manufacturer__btn, darkModeClass)}
            onClick={handleOpenBoilers}
          >
            Boiler manufacturer
          </button>

          <FiltersPopup
            title="Boiler manufacturer"
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            updateManufacturer={updateBoilerManufacturer}
            setManufacturer={setBoilerManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={boilerManufacturers}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>

        <div className={cls.filters__boiler_manufacturers}>
          <button
            className={clsx(cls.filters__manufacturer__btn, darkModeClass)}
            onClick={handleOpenParts}
          >
            Parts Manufacturer
          </button>

          <FiltersPopup
            title="Parts Manufacturer"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartsManufacturer}
            setManufacturer={setPartsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturersList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>

        <div className={cls.filters__price}>
          <Accordion
            title="Price"
            titleClass={clsx(cls.filters__manufacturer__btn, darkModeClass)}
            hideArrowClass={cls.hide_arrow}
            isMobileForFilters={isMobile}
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
      </div>

      <div className={cls.filters__actions}>
        <button
          className={cls.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span className="spinner" style={{ top: 6, left: '47%' }} />
          ) : (
            'Show'
          )}
        </button>
      </div>
    </div>
  );
});
