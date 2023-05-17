import { Event } from 'effector-next';

export interface ManufacturersBlockProps {
  title: string;
  event: Event<IFilterCheckboxItem>;
  manufacturersList: IFilterCheckboxItem[];
}

export interface ManufacturersBlockItemProps {
  item: IFilterCheckboxItem;
  event: Event<IFilterCheckboxItem>;
}

export interface IQueryParams {
  offset: string;
  firs: string;
  boiler: string;
  parts: string;
  priceFrom: string;
  priceTo: string;
  partId: number;
}

export interface IFilterCheckboxItem {
  title: string;
  checked: boolean;
  id?: string;
  event: Event<IFilterCheckboxItem>;
}

export interface FilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[];
  title: string | false;
  setManufacturer: Event<IFilterCheckboxItem[]>;
  updateManufacturer: Event<IFilterCheckboxItem>;
}

interface ICatalogBaseTypes {
  priceRange: number[];
  setPriceRange: (arg0: number[]) => void;
  setIsPriceRangeChanged: (arg0: boolean) => void;
}

interface ICatalogFiltersBaseTypes {
  resetFilterBtnDisabled: boolean;
  resetFilters: VoidFunction;
}

export interface CatalogFiltersProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean;
  currentPage: number;
  setIsFilterInQuery: (arg0: boolean) => void;
  closePopup: VoidFunction;
  filtersMobileOpen: boolean;
}

export type PriceRangeProps = ICatalogBaseTypes;

export interface CatalogFiltersDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean;
  applyFilters: VoidFunction;
}

export interface CatalogFiltersMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean;
  applyFilters: VoidFunction;
  closePopup: VoidFunction;
  filtersMobileOpen: boolean;
}

export interface FiltersPopupTopProps {
  resetBtnText: string;
  title: string;
  resetFilters: VoidFunction;
  resetFilterBtnDisabled: boolean;
  closePopup: VoidFunction;
}

export interface FiltersPopupProps extends FilterManufacturerAccordionProps {
  resetFilterBtnDisabled: boolean;
  resetAllManufacturers: VoidFunction;
  handleClosePopup: VoidFunction;
  applyFilters: VoidFunction;
  openPopup: boolean;
}
