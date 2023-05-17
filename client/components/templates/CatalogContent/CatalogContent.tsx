import clsx from 'clsx';
import { useStore } from 'effector-react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

import { getBoilerPartsFx } from '../../../app';
import { RequestsPath } from '../../../constants';
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '../../../context/boilerParts';
import { usePopup, useTheme } from '../../../hooks';
import { checkQueryParams } from '../../../utils';
import { FilterSvg, Skeleton } from '../../elements';
import {
  CatalogFilters,
  CatalogItem,
  FilterSelect,
  ManufacturersBlock,
} from '../../modules';

import type { IBoilerParts } from '../../../types';

import cls from './CatalogContent.module.scss';

interface CatalogContentProps {
  query: {
    offset: string;
    firs: string;
    boiler: string;
    parts: string;
    priceFrom: string;
    priceTo: string;
  };
}

export const CatalogContent = memo(({ query }: CatalogContentProps) => {
  const router = useRouter();
  const { mode } = useTheme();
  const { toggleOpen, open, closePopup } = usePopup();

  const boilerManufacturers = useStore($boilerManufacturers);
  const partsManufacturers = useStore($partsManufacturers);
  const filteredBoilerParts = useStore($filteredBoilerParts);
  const boilerParts = useStore($boilerParts);
  const [spinner, setSpinner] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 9000]);
  const [isFilterInQuery, setIsFilterInQuery] = useState(false);
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false);

  const pagesCount = Math.ceil(boilerParts.count / 20);

  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0;

  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  );

  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  );

  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  );

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  );

  const loadBoilerParts = useCallback(async () => {
    try {
      setSpinner(true);
      const data = await getBoilerPartsFx(
        `${RequestsPath.BOILER_PARTS}?limit=20&offset=0`
      );

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        });

        resetPagination(data);
        return;
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          );

          setCurrentPage(0);
          setBoilerParts(isFilterInQuery ? filteredBoilerParts : data);
          return;
        }

        const offset = +query.offset - 1;
        const result = await getBoilerPartsFx(
          `${RequestsPath.BOILER_PARTS}?limit=20&offset=${offset}`
        );

        setCurrentPage(offset);
        setBoilerParts(isFilterInQuery ? filteredBoilerParts : result);
        return;
      }

      setCurrentPage(0);
      setBoilerParts(isFilterInQuery ? filteredBoilerParts : data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTimeout(() => setSpinner(false), 1000);
    }
  }, [filteredBoilerParts, isFilterInQuery, isValidOffset, query, router]);

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0);
    setBoilerParts(data);
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true);
      const data = await getBoilerPartsFx(
        `${RequestsPath.BOILER_PARTS}?limit=20&offset=0`
      );

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data);
        return;
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data);
        return;
      }

      const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } =
        checkQueryParams(router);

      const result = await getBoilerPartsFx(
        `${RequestsPath.BOILER_PARTS}?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery
            ? `&boiler=${router.query.boiler}`
            : ''
        }${
          isFilterInQuery && isValidPartsQuery
            ? `&parts=${router.query.parts}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      );

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      );

      setCurrentPage(selected);
      setBoilerParts(result);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setTimeout(() => setSpinner(false), 1000);
    }
  };

  const resetFilters = async () => {
    try {
      const data = await getBoilerPartsFx(
        `${RequestsPath.BOILER_PARTS}?limit=20&offset=0`
      );
      const params = router.query;

      delete params.boiler;
      delete params.parts;
      delete params.priceFrom;
      delete params.priceTo;
      params.first = 'cheap';

      router.push({ query: { ...params } }, undefined, { shallow: true });

      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      );

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      );

      setBoilerParts(data);
      setPriceRange([1000, 9000]);
      setIsPriceRangeChanged(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    loadBoilerParts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredBoilerParts, isFilterInQuery]);

  return (
    <section className={cls.catalog}>
      <div className={clsx('container', cls.catalog__container)}>
        <h2 className={clsx(cls.catalog__title, darkModeClass)}>
          Catalog of products
        </h2>
        <div className={clsx(cls.catalog__top, darkModeClass)}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Parts Manufacturer:"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Parts Manufacturer:"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>

          <div className={cls.catalog__top__inner}>
            <button
              className={clsx(cls.catalog__top__reset, darkModeClass)}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Reset filters
            </button>

            <button
              className={cls.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={cls.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>

              <span className={cls.catalog__top__mobile_btn__text}>Filter</span>
            </button>

            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>

        <div className={cls.catalog__bottom}>
          <div className={cls.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />

            {spinner ? (
              <Skeleton count={8} />
            ) : (
              <ul className={cls.catalog__list}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>List of products is empty...</span>
                )}
              </ul>
            )}
          </div>

          <ReactPaginate
            containerClassName={cls.catalog__bottom__list}
            pageClassName={cls.catalog__bottom__list__item}
            pageLinkClassName={cls.catalog__bottom__list__item__link}
            previousClassName={cls.catalog__bottom__list__prev}
            nextClassName={cls.catalog__bottom__list__next}
            breakClassName={cls.catalog__bottom__list__break}
            breakLinkClassName={clsx(
              cls.catalog__bottom__list__break__link,
              darkModeClass
            )}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
});
