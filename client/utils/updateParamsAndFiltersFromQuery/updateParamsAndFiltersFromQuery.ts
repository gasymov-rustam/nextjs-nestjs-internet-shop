import { getBoilerPartsFx } from '../../app';
import { RequestsPath } from '../../constants';
import { setFilteredBoilerParts } from '../../context/boilerParts';

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback();

  const data = await getBoilerPartsFx(
    `${RequestsPath.BOILER_PARTS}?limit=20&offset=${path}`
  );

  setFilteredBoilerParts(data);
};
