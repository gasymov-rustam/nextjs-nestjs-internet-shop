/* eslint-disable indent */
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import Select from 'react-select';

import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
} from '../../../context/boilerParts';
import { useTheme } from '../../../hooks';
import { createSelectOption } from '../../../utils';

import { optionStyles } from '../../elements/SearchInput/SearchInput.style';

import type {
  IOption,
  SelectOptionType,
} from '../../elements/SearchInput/SearchInput.type';

import { controlStyles, menuStyles, selectStyles } from './FilterSelect.style';

export const categoriesOptions = [
  'Cheapest first',
  'Expensive first',
  'By popularity',
].map(createSelectOption);

interface FilterSelectProps {
  setSpinner: (arg: boolean) => void;
}

export const FilterSelect = memo(({ setSpinner }: FilterSelectProps) => {
  const router = useRouter();
  const { mode } = useTheme();
  const boilerParts = useStore($boilerParts);
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null);

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Cheapest first');
          setBoilerPartsCheapFirst();
          break;
        case 'expensive':
          updateCategoryOption('Expensive first');
          setBoilerPartsExpensiveFirst();
          break;
        case 'popular':
          updateCategoryOption('By popularity');
          setBoilerPartsByPopularity();
          break;
        default:
          updateCategoryOption('Cheapest first');
          setBoilerPartsCheapFirst();
          break;
      }
    }
  }, [boilerParts.rows, router.query.first]);

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value });

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    );

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true);
    setCategoryOption(selectedOption);

    switch ((selectedOption as IOption).value) {
      case 'Cheapest first':
        setBoilerPartsCheapFirst();
        updateRoteParam('cheap');
        break;
      case 'Expensive first':
        setBoilerPartsExpensiveFirst();
        updateRoteParam('expensive');
        break;
      case 'By popularity':
        setBoilerPartsByPopularity();
        updateRoteParam('popular');
        break;
      default:
    }

    setTimeout(() => setSpinner(false), 1000);
  };

  return (
    <Select
      placeholder="I am looking for..."
      value={categoryOption || createSelectOption('Cheapest first')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  );
});
