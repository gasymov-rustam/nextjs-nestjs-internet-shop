import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '../../../context/boilerParts';
import { useMediaQuery } from '../../../hooks';
import type { CatalogFiltersProps } from '../../../types';
import {
  checkQueryParams,
  queryParamsOnFirstRender,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '../../../utils';
import { CatalogFiltersDesktop } from '../CatalogFiltersDesktop/CatalogFiltersDesktop';
import { CatalogFiltersMobile } from '../CatalogFiltersMobile';

export const CatalogFilters = memo((props: CatalogFiltersProps) => {
  const {
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
    closePopup,
    filtersMobileOpen,
  } = props;

  const router = useRouter();
  const isMobile = useMediaQuery(820);
  const [spinner, setSpinner] = useState(false);
  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);

  const updatePriceFromQuery = useCallback(
    (priceFrom: number, priceTo: number) => {
      setIsFilterInQuery(true);
      setPriceRange([+priceFrom, +priceTo]);
      setIsPriceRangeChanged(true);
    },
    [setIsFilterInQuery, setIsPriceRangeChanged, setPriceRange]
  );

  const applyFiltersFromQuery = useCallback(async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        partsQueryValue,
        priceFromQueryValue,
        boilerQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router);

      const boilerQuery = `&boiler=${queryParamsOnFirstRender(
        'boiler',
        router
      )}`;
      const partsQuery = `&parts=${queryParamsOnFirstRender('parts', router)}`;
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setBoilerManufacturersFromQuery(boilerQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`);
        return;
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
        }, `${currentPage}${priceQuery}`);
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setBoilerManufacturersFromQuery(boilerQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${boilerQuery}${partsQuery}`);
        return;
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setBoilerManufacturersFromQuery(boilerQueryValue);
        }, `${currentPage}${boilerQuery}`);
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${partsQuery}`);
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setPartsManufacturersFromQuery(partsQueryValue);
        }, `${currentPage}${priceQuery}${partsQuery}`);
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
          setBoilerManufacturersFromQuery(boilerQueryValue);
        }, `${currentPage}${priceQuery}${boilerQuery}`);
      }
    } catch (error) {
      const err = error as Error;

      if (err.message === 'URI malformed') {
        toast.warning('Not correct query params');
        return;
      }

      toast.error(err.message);
    }
  }, [currentPage, router, setIsFilterInQuery, updatePriceFromQuery]);

  const applyFilters = async () => {
    setIsFilterInQuery(true);
    try {
      setSpinner(true);

      const priceFrom = Math.ceil(priceRange[0]);
      const priceTo = Math.ceil(priceRange[1]);
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : '';

      const boilers = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title);

      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title);

      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers));
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts));
      const initialPage = currentPage > 0 ? 0 : currentPage;

      const boilerQuery = `&boiler=${encodedBoilerQuery}`;
      const partsQuery = `&parts=${encodedPartsQuery}`;

      if (boilers.length && parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`,
          router
        );
        return;
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        );
      }

      if (boilers.length && parts.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}`,
          router
        );
        return;
      }

      if (boilers.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}`,
          router
        );
      }

      if (parts.length) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`,
          router
        );
      }

      if (boilers.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${priceQuery}`,
          router
        );
      }

      if (parts.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}${priceQuery}`,
          router
        );
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    applyFiltersFromQuery();
  }, [applyFiltersFromQuery]);

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  );
});
