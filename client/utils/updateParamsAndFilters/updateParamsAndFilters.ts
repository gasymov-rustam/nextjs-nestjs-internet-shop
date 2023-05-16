import { NextRouter } from 'next/router';

import { getBoilerPartsFx } from '../../app';
import { RequestsPath } from '../../constants';
import { setFilteredBoilerParts } from '../../context/boilerParts';

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query;

  delete params.boiler;
  delete params.parts;
  delete params.priceFrom;
  delete params.priceTo;

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  );

  const data = await getBoilerPartsFx(
    `${RequestsPath.BOILER_PARTS}?limit=20&offset=${path}`
  );

  setFilteredBoilerParts(data);
}
