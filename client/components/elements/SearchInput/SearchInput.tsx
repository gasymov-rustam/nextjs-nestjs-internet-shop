import { memo, useState } from 'react';
import Select from 'react-select';

import { SelectOptionType } from './SearchInput.type';
import { mockArray } from './SearchInput.utils';

import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from './SearchInput.style';

export const SearchInput = memo(() => {
  // const mode = useStore($mode);
  const mode = 'light';
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null);

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption);
  };
  return (
    <Select
      placeholder="Я ищу..."
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
