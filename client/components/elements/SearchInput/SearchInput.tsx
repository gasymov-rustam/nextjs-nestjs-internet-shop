import clsx from 'clsx';
import { useRouter } from 'next/router';
import { MutableRefObject, memo, useRef, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { useDebounce, useTheme } from '../../../hooks';
import { IOption, SelectOptionType } from './SearchInput.type';

import { useStore } from 'effector-react';
import { getPartByNameFx, searchPartsFx } from '../../../app';
import {
  $searchInputZIndex,
  setSearchInputZIndex,
} from '../../../context/header';
import {
  createSelectOption,
  removeClassNamesForOverlayAndBody,
  toggleClassNamesForOverlayAndBody,
} from '../../../utils';
import { SearchSvg } from '../SearchSvg';
import { NoOptionsMessage, NoOptionsSpinner } from '../SelectOptionsMessage';
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from './SearchInput.style';

import type { IBoilerPart } from '../../../types';

import cls from '@/components/modules/HeaderBottom/HeaderBottom.module.scss';

export const SearchInput = memo(() => {
  const { mode } = useTheme();
  const router = useRouter();
  const delayCallback = useDebounce(500);
  const spinner = useStore(searchPartsFx.pending);
  const zIndex = useStore($searchInputZIndex);
  const darkModeClass = { [cls.darkMode]: mode === 'dark' };
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const borderRef = useRef() as MutableRefObject<HTMLSpanElement>;
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null);
  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({});
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState(
    {}
  );

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null);
      return;
    }

    const name = (selectedOption as IOption)?.value as string;

    if (name) {
      getPartAndRedirect(name);
    }

    setSearchOption(selectedOption);
    removeClassNamesForOverlayAndBody();
  };

  const onFocusSearch = () => {
    toggleClassNamesForOverlayAndBody('open-search');
    setSearchInputZIndex(100);
  };

  const handleSearchClick = async () => {
    if (!inputValue) {
      return;
    }

    getPartAndRedirect(inputValue);
  };

  const searchPart = async (search: string) => {
    try {
      setInputValue(search);
      const data = await searchPartsFx({
        url: '/boiler-parts/search',
        search,
      });

      const names = data
        .map((item: IBoilerPart) => item.name)
        .map(createSelectOption);

      setOptions(names);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const getPartAndRedirect = async (name: string) => {
    const part = await getPartByNameFx({
      url: '/boiler-parts/name',
      name,
    });

    if (!part.id) {
      toast.warning('This part is not available');
      return;
    }

    router.push(`/catalog/${part.id}`);

    setSearchOption(null);
  };

  const onSearchInputChange = (text: string) => {
    document.querySelector('.overlay')?.classList.add('open-search');
    document.querySelector('.body')?.classList.add('overflow-hidden');

    delayCallback(() => searchPart(text));
  };

  const onSearchMenuOpen = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    });
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    });

    btnRef.current.style.border = 'none';
    btnRef.current.style.borderBottomRightRadius = '0';
    borderRef.current.style.display = 'block';
  };

  const onSearchMenuClose = () => {
    setOnMenuOpenControlStyles({
      borderBottomLeftRadius: 4,
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    });
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    });

    btnRef.current.style.border = '1px solid #9e9e9e';
    btnRef.current.style.borderLeft = 'none';
    btnRef.current.style.borderBottomRightRadius = '4px';
    borderRef.current.style.display = 'none';
  };

  return (
    <>
      <div className={cls.header__search__inner}>
        <Select
          components={{
            NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
          }}
          placeholder="I am looking for..."
          value={searchOption}
          onChange={handleSearchOptionChange}
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles,
            }),
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
              zIndex,
              transition: 'none',
              ...onMenuOpenControlStyles,
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: '-1px',
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          openMenuOnClick={false}
          onFocus={onFocusSearch}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
          onInputChange={onSearchInputChange}
          options={options}
        />

        <span ref={borderRef} className={cls.header__search__border} />
      </div>

      <button
        className={clsx(cls.header__search__btn, darkModeClass)}
        ref={btnRef}
        style={{ zIndex }}
        onClick={handleSearchClick}
      >
        <span className={cls.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  );
});
