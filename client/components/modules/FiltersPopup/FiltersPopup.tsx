import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { FilterManufacturerAccordion } from '../FilterManufacturerAccordion';
import { FiltersPopupTop } from '../FiltersPopupTop';

import type { FiltersPopupProps } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const FiltersPopup = memo((props: FiltersPopupProps) => {
  const {
    resetFilterBtnDisabled,
    resetAllManufacturers,
    handleClosePopup,
    updateManufacturer,
    setManufacturer,
    applyFilters,
    openPopup,
    title,
    manufacturersList,
  } = props;
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <div
      className={clsx(cls.filters__popup, darkModeClass, {
        [cls.open]: openPopup,
      })}
    >
      <div className={cls.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Reset"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />

        <FilterManufacturerAccordion
          manufacturersList={manufacturersList}
          title={false}
          updateManufacturer={updateManufacturer}
          setManufacturer={setManufacturer}
        />
      </div>

      <div className={cls.filters__actions}>
        <button
          className={cls.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Show
        </button>

        <button
          className={cls.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Back
        </button>
      </div>
    </div>
  );
});
