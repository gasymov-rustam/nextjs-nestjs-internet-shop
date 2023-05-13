import { memo, useState } from 'react';
import Select from 'react-select';

import { useTheme } from '../../../hooks';
import { SelectOptionType } from './SearchInput.type';
import { mockArray } from './SearchInput.utils';

import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from './SearchInput.style';

export const SearchInput = memo(() => {
  const { mode } = useTheme();
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null);

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption);
  };
  return (
    <Select
      placeholder="I am looking for..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={mockArray}
    />
  );
});
