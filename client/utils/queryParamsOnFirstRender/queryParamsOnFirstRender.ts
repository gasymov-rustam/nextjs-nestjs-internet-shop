import { NextRouter } from 'next/router';

export const queryParamsOnFirstRender = (
  queryName: string,
  router: NextRouter
) =>
  router.query[queryName] ||
  router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`));
