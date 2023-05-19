import { GroupBase, NoticeProps, components } from 'react-select';
import { useTheme } from '../../../hooks';
import { IOption } from '../SearchInput/SearchInput.type';
import { Spinner } from '../Spinner';

export const NoOptionsMessage = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span>No results found</span>
  </components.NoOptionsMessage>
);

export const NoOptionsSpinner = (
  props: NoticeProps<IOption, boolean, GroupBase<IOption>>
) => {
  const { mode } = useTheme();

  return (
    <components.NoOptionsMessage {...props}>
      <Spinner
        mode={mode}
        style={{ top: '5px', left: '48%', width: 25, height: 25 }}
      />
    </components.NoOptionsMessage>
  );
};
